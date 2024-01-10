<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useGlobalStore} from "@/stores";
import {getHome, updateHome} from "@/api/home/home";
import OrderInfoCard from "@components/OrderInfoCard.vue";
import type {
  CouponResult,
  HomeSearchResult,
  Identity,
  Order,
  OrderRequestData,
  RCAMI, RCAMIResult,
} from "@/types";
import DeviceTag from "@components/DeviceTag.vue";
import {Location} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import {now, useStorage} from "@vueuse/core";
import TravellerCard from "@components/TravellerCard.vue";
import {
  addOrder, checkOut, deleteOrder,
  endOrderRefund,
  getDynamicPassword,
  getOrder,
  payOrder,
  scheduleCancellation,
  updateOrder
} from "@/api/order/order";
import {useCoupon} from "@/api/coupon/coupon";
import {getIdentityByOrder} from "@/api/identity/identity";
import {decrypt} from "@/utils/encryption";
import {addRCAMI, listRCAMI} from "@/api/RCAMI/RCAMI";
import {statusPayment} from "@/api/payment/payment";

const route = useRoute()
const homeId = ref(route.query.homeId)
const router = useRouter()
if(!homeId.value) {
  ElMessage.error('请先选择房屋!')
  router.push('/')
}
const {userInfo} = useGlobalStore()
const loading = ref(false)
const searchInfo = useStorage('searchInfo', {
  beginDate: dayjs(now()).format('YYYY-MM-DD'),
  endDate: dayjs(now()).add(1,'day').format('YYYY-MM-DD'),
  minRent: 50,
  personCount: 1,
  roomCount: 1,
  maxPeople: 1,
  page: 1,
  size: 10
})
const homeInfo = ref<HomeSearchResult>({} as HomeSearchResult)
const couponInfo = ref<CouponResult>({} as CouponResult)
const travellerList = ref<(Identity & {add?: boolean,edit?: boolean})[]>([])
const originalPrice = ref(0)
const discountedPrice = ref(0)
const getData = async () => {
    loading.value = true
    const {data} = await getHome(homeId.value as any)
    homeInfo.value = data
    travellerList.value = new Array(data.homeInformation.maxPerson).fill({ add: true,edit: true })
    loading.value = false
}
await getData()
watch(() => [searchInfo.value,couponInfo.value], (val) => {
  const beginDate = dayjs(searchInfo.value.beginDate)
  const endDate = dayjs(searchInfo.value.endDate)
  const days = endDate.diff(beginDate, 'day')
  originalPrice.value = (homeInfo.value.home?.homeDayRent || 0) * days
  if(couponInfo.value.coupon) {
    if(couponInfo.value.coupon.useThreshold > originalPrice.value) {
      couponInfo.value = {} as CouponResult
      discountedPrice.value = originalPrice.value + (homeInfo.value.homeInformation?.homeDeposit || 0)
      return ElMessage.warning('优惠券不满足使用条件')
    }
    if(couponInfo.value.coupon.discountMethod === '满减') {
      discountedPrice.value = (originalPrice.value - couponInfo.value.coupon.discountIntensity) + (homeInfo.value.homeInformation?.homeDeposit || 0)
    } else {
      discountedPrice.value = (originalPrice.value * couponInfo.value.coupon.discountIntensity) + (homeInfo.value.homeInformation?.homeDeposit || 0)
    }
  } else {
    discountedPrice.value = originalPrice.value + (homeInfo.value.homeInformation?.homeDeposit || 0)
  }
}, {
  immediate: true
})
const timeRange = computed({
  get() {
    return [searchInfo.value.beginDate, searchInfo.value.endDate]
  },
  set(val) {
    searchInfo.value.beginDate = val[0]
    searchInfo.value.endDate = val[1]
  }
})

const disabledDate = (time:string): boolean => {
  const day = dayjs(time)
  // 当天前一天的日期禁用
  return day.isBefore(dayjs().subtract(1,'day'),'day')
}


const selectCoupon = () => {
  window.open(`/user/settings/coupons?select=${1}&price=${originalPrice.value}`)
}
const travellerIndex = ref(0)
const selectTraveller = (index:number) => {
  window.open(`/user/settings/travellers?select=${1}`)
  travellerIndex.value = index
}

const confirm = async () => {
  // 确认订单
  const {data} = await addOrder({
    checkInDate: dayjs(searchInfo.value.beginDate).format("YYYY-MM-DD"),
    checkOutDate: dayjs(searchInfo.value.endDate).format("YYYY-MM-DD"),
    homeId: homeId.value as any,
    userId: userInfo.userId,
    userTenantList: travellerList.value.map(item => ({
      cardIdNumber: item.IDCardNumber,
      name: item.IDCardName,
      phone: item.IDCardPhoneNumber
    })),
  } as OrderRequestData)
  await updateOrder({
    orderId: data.orderId,
    orderPayment: discountedPrice.value
  })
  scheduleCancellation(data.orderId)
  return Promise.resolve(data)
}

const pay = async (data:Order) => {
  console.log(data)
  //   支付订单
  try {
    await payOrder({
      orderId: data.orderId,
      UACID: couponInfo.value?.usersAndCoupons?.UACID
    })
  }catch (e:any) {
    if(e.msg === '余额不足') {
      loading.value = false
      throw ElMessage.error(e.msg)
    } else {
      ElMessage.error('支付失败')
      await updateOrder({
        orderId: data.orderId,
        orderState: '已取消',
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      return await router.push('/')
    }
  }
  if(couponInfo.value?.usersAndCoupons) {
    await useCoupon(couponInfo.value.usersAndCoupons.UACID)
  }
  loading.value = false
  ElMessage.success('支付成功')
  await router.push(`/order?orderId=${data.orderId}&homeId=${homeId.value}`)
  router.go(0)
}


const listenMessage = async (e:WindowEventMap['message']) => {
  if(e.data?.couponResult) {
    if(e.data.couponResult.coupon.useThreshold > originalPrice.value) {
      return window.alert('优惠券不满足使用条件')
    }
  //   选择优惠券
    couponInfo.value = e.data.couponResult
  } else if(e.data.identity) {
  //   选择旅客信息
    travellerList.value[travellerIndex.value] = {
      ...e.data.identity,
    }
  } else if(e.data.pass) {
    loading.value = true
    if(confirmAndPay.value) {
      const data = await confirm()
      await pay(data)
    } else {
      await pay(orderInfo.value)
    }
    loading.value = false
  }
}
onMounted(() => {
  window.addEventListener('message',listenMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', listenMessage)
})

const saveTraveller = (index: number, traveller:Identity) => {
  Object.assign(travellerList.value[index], traveller)
}

const valid = async (str:string) => {
  if(!travellerList.value.some(item => !item.edit)) {
    return Promise.reject(ElMessage.error('请至少填写并确认一个旅客信息'))
  }
  // 如果旅客中有未满16周岁的,则需要填写监护人信息
  if(travellerList.value.some(item => {
    return (!item.edit) && dayjs().diff(dayjs(item.IDCardNumber.substring(6, 14)), 'year') < 16;
  })) {
    if(!travellerList.value.some(item => {
      return (!item.edit) && dayjs().diff(dayjs(item.IDCardNumber.substring(6, 14)), 'year') > 16
    })) {
      return Promise.reject(ElMessage.error('请至少填写并确认一个监护人信息'))
    }
  }
  await ElMessageBox.confirm(str,'提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  return Promise.resolve()
}


const confirmAndPay = ref(false)
const confirmAndPayOrder = async () => {
  await valid('是否确认订单并支付')
  window.open('/pay')
  confirmAndPay.value = true
}

const confirmOrder = async () => {
  await valid('是否确认订单')
  const data = await confirm()
  await router.push(`/order?orderId=${data.orderId}&homeId=${homeId.value}`)
  router.go(0)
}

const handlePayOrder = async () => {
  await valid('是否支付订单')
  window.open('/pay')
  confirmAndPay.value = false
}


// 订单详情部分
const orderId = ref(route.query.orderId)
const orderInfo = ref<Order>({} as Order)
const getOrderInfo = async () => {
  loading.value = true
  const {data} = await getOrder(orderId.value as any)
  orderInfo.value = data
  searchInfo.value.beginDate = data.checkInTime
  searchInfo.value.endDate = data.checkOutTime
  const identityRes = await getIdentityByOrder(data.orderId)
  travellerList.value = identityRes.data
  loading.value = false
}
if(orderId.value) {
  await getOrderInfo()
}

const getPassword = async () => {
  if(dayjs(orderInfo.value.checkInTime).isBefore(dayjs().subtract(1,'day').add(14,'hour'))) {
    return ElMessage.error('未到获取密码时间')
  }
  if(homeInfo.value?.home.homeState === '可入住') {
    await updateHome({
      home: {
        homeId: homeId.value as any,
        homeState: '已入住'
      }
    })
  }
  const {data} = await getDynamicPassword(orderInfo.value.orderId)
  orderInfo.value.dynamicDoorPassword = data
}

const cancelOrder = async () => {
  await ElMessageBox.confirm('是否取消订单','提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await endOrderRefund(orderInfo.value.orderId)
  await getOrderInfo()
}

const delOrder = async () => {
  await ElMessageBox.confirm('是否删除该订单', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteOrder(orderInfo.value.orderId)
  ElMessage.success('删除成功')
  router.push('/user/settings/orders')
}

const checkoutHome = async () => {
  if(dayjs(orderInfo.value.checkOutTime).isSame(dayjs(), 'day')) {
    await ElMessageBox.confirm('是否确认退房', '提示', {
      confirmButtonText:'确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const {data} = await checkOut(orderInfo.value.orderId)
    ElMessage.success('退房成功')
  } else {
    ElMessage.error('未到退房时间,请取消订单')
  }
}

const toHomeDetail = () => {
  window.open(`/home/detail?id=${homeId.value}`)
}

// 维修信息部分
const rcamiInfo = ref<RCAMI>({
  publisherId: userInfo.userId,
  homeId: homeId.value as any,
  orderId: orderInfo.value.orderId
} as RCAMI)
const rcamiList = ref<RCAMIResult[]>([])
const rcamiRules = {
  des: [
    {required: true, message: '请输入详细描述'}
  ],
  RCAMIInformation: [
    {required: true, message: '请输入维修信息'}
  ]
}
const rcamiTotal = ref(0)
const rcamiOpen = ref(false)
const rcamiFormRef = ref()
const getRepairInfo = async () => {
  if(orderInfo.value.orderId) {
    loading.value = true
    const {data} = await listRCAMI({
      orderId: orderInfo.value.orderId,
      homeId: homeId.value as any,
      page: 1,
      size: 10
    })
    rcamiList.value = data.records
    rcamiTotal.value = data.total
    loading.value = false
  }
}
getRepairInfo()

const rcamiDialogOpen = () => {
  rcamiOpen.value = true
}
const rcamiDialogClose = () => {
  rcamiFormRef.value.resetFields()
  rcamiOpen.value = false
}

const releaseRcami = async () => {
  await rcamiFormRef.value.validate()
  await addRCAMI(rcamiInfo.value)
  ElMessage.success('报修成功')
  await getRepairInfo()
}

onMounted(() => {
  statusPayment(userInfo.userId).catch(async ()=> {
    await router.push('/user/settings/wallet')
  })
})
</script>

<template>
  <div class="app-container" v-loading.fullscreen="loading">
    <div class="require-info">
      <div class="require-info__order-info" v-if="orderInfo?.orderId">
        <div>
          <p class="require-info__order-info__title">订单编号</p>
          <p class="require-info__order-info__text">
            {{orderInfo.orderId}}
          </p>
        </div>
        <div>
          <p class="require-info__order-info__title">订单状态</p>
          <p class="require-info__order-info__text">
            {{orderInfo.orderState}}
          </p>
        </div>
      </div>
      <div class="require-info__traveller-info">
        <div class="require-info__time-range">
          <p class="require-info__title">入住时间-退房时间</p>
          <div class="require-info__time-range__text" v-if="orderId">
            <p>
              <span class="require-info__time-range__text__title">开始:</span>
              <span>{{dayjs(timeRange[0]).format('YYYY年MM月DD日')}}</span>
            </p>
            <p>
              <span class="require-info__time-range__text__title">结束:</span>
              <span>{{dayjs(timeRange[1]).format('YYYY年MM月DD日')}}</span>
            </p>
          </div>
          <el-date-picker
            v-model="timeRange"
            :clearable="false"
            type="daterange"
            range-separator="-"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期" v-else/>
        </div>
        <div class="require-info__traveller-info">
          <p class="require-info__title">入住人信息</p>
          <div class="require-info__traveller-info__list">
            <div class="require-info__traveller-info__list__item" v-for="(item,index) in travellerList" :key="index">
              <div class="require-info__traveller-info__list__item__execute" v-if="!orderInfo?.orderId">
                <el-button type="primary" @click="selectTraveller(index)">选择填入</el-button>
              </div>
              <OrderInfoCard :item="item" @save="saveTraveller(index, $event)"></OrderInfoCard>
<!--              <TravellerCard class="flex-1" :item="item" v-model:edit="item.edit" :add="item?.add" @save="saveTraveller(index, $event)"></TravellerCard>-->
            </div>
          </div>
        </div>
        <div class="require-info__notice">
          <div class="require-info__title">费用须知</div>
          <ol class="require-info__notice__content">
            <li>支付后并在填写的入住时间的14:00后才能获取房门密码。</li>
            <li>退房后押金将在管理人员确认设备完好后退回。</li>
            <li>订单创建30分钟内，且未获取房屋密码时免费退款。</li>
            <li>订单创建30分钟后，取消订单将扣除全部房费。</li>
            <li>确认订单后5分钟内未支付，订单自动取消。</li>
            <li>未满16周岁需填写陪同人信息，若房屋为单人房间则不可预定。</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="home-detail card">
        <p class="card__title">房屋详情</p>
        <div class="home-detail__name" @click="toHomeDetail">{{homeInfo.home?.homeName}}</div>
        <div class="home-detail__address"><el-icon><Location/></el-icon>{{homeInfo.home?.homeAddress}}</div>
        <div class="home-detail__day-rent">￥{{homeInfo.home?.homeDayRent}}元/天</div>
        <div class="home-detail__deposit">押金:￥{{homeInfo.homeInformation?.homeDeposit}}</div>
        <div class="home-detail__device-list" v-if="homeInfo.homeDeviceList?.length">
          <DeviceTag v-for="item in homeInfo.homeDeviceList" :device="item" />
        </div>
      </div>
      <div class="price-summary card">
        <p class="card__title">价格汇总</p>
        <p class="price-summary__original">
          <span>原价</span>
          <span>{{originalPrice}}元</span>
        </p>
        <p class="price-summary__coupon" v-if="couponInfo && !orderId">
          <span>优惠</span>
          <div class="flex items-center gap-2">
            <span>
                <el-button @click="selectCoupon">选择优惠券</el-button>
              </span>
            <div v-if="couponInfo.coupon">
              <transition name="fade" mode="out-in">
                <span v-if="couponInfo.coupon.discountMethod === '满减'">{{couponInfo.coupon.discountIntensity}}元</span>
                <span v-else>{{couponInfo.coupon.discountIntensity * 10}}折</span>
              </transition>
            </div>
          </div>
        </p>
        <div class="price-summary__total">
          <span>总价</span>
          <div>
            <span class="price-summary__total__old">{{originalPrice}}元</span>
            <span class="price-summary__total__new">{{discountedPrice}}元</span>
            <el-popover
                placement="top-start"
                width="fit-content"
                trigger="hover"
                content="总价 = 优惠后价格 + 押金"
            >
              <template #reference>
                <el-icon><InfoFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="order-execute" v-if="!orderInfo.orderId || orderInfo?.orderState !== '已退房'">
        <el-button @click="checkoutHome" type="success" v-if="(homeInfo?.home.homeState === '已入住' && orderInfo.orderState === '已支付') || Number(decrypt(orderInfo.dynamicDoorPassword))">退房</el-button>
        <el-button type="danger" @click="delOrder" v-if="['已取消','已结束','已退款'].includes(orderInfo.orderState)">删除订单</el-button>
        <el-button @click="cancelOrder" v-if="['已入住','已支付'].includes(orderInfo.orderState)">取消订单</el-button>
        <el-button type="primary" @click="confirmAndPayOrder" v-if="!orderInfo.orderId">确认并支付</el-button>
        <el-button type="primary" @click="confirmOrder" v-if="!orderInfo.orderId">确认订单</el-button>
        <el-button type="primary" @click="handlePayOrder" v-if="orderInfo.orderId && orderInfo.orderState === '未支付'">支付订单</el-button>
      </div>
      <div class="dynamic-password" v-if="orderInfo.orderState === '已支付'">
        <p class="card__title">动态密码</p>
        <div class="dynamic-password__text">
          <span class="text-gray-500 text-sm">密码:</span>{{decrypt(orderInfo.dynamicDoorPassword)}}
        </div>
        <div class="dynamic-password__execute">
          <el-button @click="getPassword">获取密码</el-button>
        </div>
      </div>
      <div class="rcami-info" v-if="orderInfo.orderId">
        <p class="card__title">维修信息</p>
        <transition-group name="fade">
          <div class="rcami-info__item" v-for="item in rcamiList" :key="item.rcami.workItemId" v-if="rcamiList.length">
            <div class="rcami-info__item__info">
              <el-popover
                  placement="top-start"
                  :width="200"
                  title="详细信息"
                  trigger="hover"
                  :content="item.rcami.des"
              >
                <template #reference>
                  {{item.rcami.RCAMIInformation}}
                </template>
              </el-popover>
            </div>
            <div class="rcami-info__item__create-time">
              <div class="rcami-info__item__create-time__title">报修时间:</div>
              <div class="rcami-info__item__create-time__text">{{item.rcami.informationCreatTime}}</div>
            </div>
            <div class="rcami-info__item__state">
              <el-tag :type="item.rcami.completion ? 'success' : 'danger'">
                {{item.rcami.completion || '未完成'}}
              </el-tag>
            </div>
          </div>
          <div class="rcami-info--empty" v-else>暂无数据</div>
        </transition-group>
        <div class="rcami-info__execute">
          <el-button @click="rcamiDialogOpen" v-if="orderInfo.orderState ==='已支付' && Number(decrypt(orderInfo.dynamicDoorPassword))">报修</el-button>
        </div>
      </div>
    </div>
    <el-dialog v-model="rcamiOpen" title="报修" width="50%" :before-close="rcamiDialogClose">
      <el-form :model="rcamiInfo" ref="rcamiFormRef" :rules="rcamiRules" label-position="top">
        <el-form-item label="维修信息" prop="RCAMIInformation">
          <el-input v-model="rcamiInfo.RCAMIInformation" placeholder="请输入维修信息"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" prop="des">
          <el-input type="textarea" :rows="2" v-model="rcamiInfo.des" placeholder="请输入详细描述"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rcamiDialogClose">取消</el-button>
        <el-button type="primary" @click="releaseRcami">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply px-20 min-h-[100dvh] grid grid-cols-3 gap-4 pt-20 relative;
  .detail {
    @apply col-span-1 sticky right-0 top-20 h-fit pb-4;
    .card {
      @apply p-2 mb-2 rounded-md border w-full shadow-sm;
      &__title {
        @apply font-semibold mb-2;
      }
    }
    .home-detail {
      &__name {
        @apply text-xl font-semibold mb-2 cursor-pointer hover:underline hover:text-primary;
      }
      &__address {
        @apply flex items-center mb-2 text-gray-500 text-sm;
        & > .el-icon {
          @apply mr-2;
        }
      }
      &__day-rent {
        @apply text-xl font-semibold mb-2 text-danger;
      }
      &__deposit {
        @apply mb-2;
      }
      &__device-list {
        @apply grid grid-cols-2 gap-2;
        & > * {
          @apply mr-2 mb-2;
        }
      }
    }
    .price-summary {
      @apply bg-primary text-white;
      &__original {
        @apply flex justify-between mb-2;
      }
      &__coupon {
        @apply flex justify-between mb-2;
      }
      &__total {
        @apply flex justify-between;
        & > div {
          @apply flex items-center;
        }
        &__old {
          @apply text-danger text-sm line-through mr-2;
        }
        &__new {
          @apply text-2xl font-bold text-white;
        }
      }
    }
    .order-execute {
      @apply flex justify-end p-2 mb-2 rounded-md border shadow-sm text-white;
    }
    .dynamic-password {
      @apply p-2 rounded-md border shadow-sm bg-primary text-white mb-2;
      &__text {
        @apply flex items-center text-white text-xl;
      }
      &__execute {
        @apply flex justify-end;
      }
    }
    .rcami-info {
      @apply p-2 rounded-md border shadow-sm;
      .rcami-info__item {
        @apply flex justify-between items-center mb-2 gap-2;
        &__info {
          @apply flex-2;
        }
        &__create-time {
          @apply flex-3;
          &__title {
            @apply text-gray-500 text-sm mr-2;
          }
          &__text {
            @apply text-gray-500 text-sm;
          }
        }
        &__state {
          @apply flex items-center flex-1;
        }
      }
      &__execute {
        @apply flex justify-end;
      }
      &--empty {
        @apply text-center text-gray-500;
      }
    }
  }
  .require-info {
    @apply col-span-2 rounded-md border p-2 bg-gray-50 shadow-sm;
    &__title {
      @apply font-bold mb-2;
    }
    &__time-range {
      &__text {
        @apply flex items-center gap-2;
        p {
          @apply flex items-center gap-2;
          .require-info__time-range__text__title {
            @apply text-[.8rem] p-1 bg-primary rounded-sm text-white;
          }
        }
      }
    }
    &__order-info {
      @apply flex items-center gap-10 w-fit bg-white p-2 rounded-md border shadow-sm;
      &__title {
        @apply font-semibold;
      }
    }
    &__traveller-info {
      @apply my-2;
      &__list {
        @apply flex flex-col gap-2;
        &__item {
          @apply flex flex-col gap-2;
        }
      }
    }
    &__notice {
      &__content {
        @apply list-disc px-10;
      }
    }
  }
}
</style>
