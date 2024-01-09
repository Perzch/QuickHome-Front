<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {listOrder, payOrder} from "@/api/order/order";
import type {Order} from "@/types";
import dayjs from "dayjs";
import {useRouter} from "vue-router";

const { userInfo } = useGlobalStore()
const list = ref<Order[]>([])
const total = ref(0)
const loading = ref(false)
const queryParams = ref({
  userId: userInfo.userId,
  page: 1,
  size: 10
})

const getList = async () => {
  loading.value = true
  const {data} = await listOrder(queryParams.value)
  list.value = data.records
  total.value = data.total
  loading.value = false
}
watch(queryParams, getList, {immediate: true})

const cur = ref<Order>({})

const pay = async (item:Order) => {
  window.open('/pay')
  cur.value = item
}

const router = useRouter()
const toDetail = async (item:Order) => {
  router.push({
    path: '/order',
    query: {
      orderId: item.orderId,
      homeId: item.homeId
    }
  })
}
const listenMessage = async (e: MessageEvent) => {
  if(e.data?.pass) {
    await payOrder({
      orderId: cur.value.orderId
    })
    await getList()
    return ElMessage.success('支付成功')
  }
}
onMounted(() => {
  window.addEventListener('message', listenMessage)
})
onUnmounted(() => {
  window.removeEventListener('message', listenMessage)
})
</script>

<template>
  <div class="wrap" v-loading.fullscreen="loading">
    <div class="title">
      <h1>订单列表</h1>
      <h3>查看你在QuickHome消费的订单。</h3>
    </div>
    <transition name="fade" mode="out-in">
      <div class="order-list" v-if="list.length">
        <div class="order-list__item" v-for="item in list" :key="item.orderId">
          <div class="order-list__item__header">
            <div class="order-list__item__header__left">
              <p><span class="order-list__item__title">订单号：</span>{{item.orderId}}</p>
              <p><span class="order-list__item__title">下单时间：</span>{{item.creationTime}}</p>
            </div>
            <div class="order-list__item__header__right">
              <p><span class="order-list__item__title">订单状态：</span>{{item.orderState}}</p>
            </div>
          </div>
          <div class="order-list__item__body">
            <div class="order-list__item__body__home-info">
              <div class="order-list__item__body__home-info__img">
                <img :src="'/' + item.home?.homeImages?.split(',')[0]" alt="暂无照片">
              </div>
              <div class="order-list__item__body__home-info__content">
                <div class="order-list__item__body__home-info__content__name">{{item.home?.homeName}}</div>
                <div class="order-list__item__body__home-info__content__type">{{item.home?.homeType}}</div>
  <!--              <div class="order-list__item__body__home-info__content__address"><el-icon><Location/></el-icon>{{item.home?.homeAddress}}</div>-->
              </div>
            </div>
            <div class="order-list__item__body__checkin-date">
              <p class="order-list__item__title">入住时间:</p>
              <div>
                <div class="flex items-center gap-2 my-1">
                  <p class="order-list__item__body__checkin-date__label">开始:</p>
                  <p>{{dayjs(item.checkInTime).format('YYYY年MM月DD日')}}</p>
                </div>
                <div class="flex items-center gap-2 my-1">
                  <p class="order-list__item__body__checkin-date__label">结束:</p>
                  <p>{{dayjs(item.checkOutTime).format('YYYY年MM月DD日')}}</p>
                </div>
              </div>
            </div>
            <div class="order-list__item__body__payment">
              <p class="order-list__item__title">总金额:</p>
              <p>￥{{item.orderPayment}}</p>
            </div>
            <div class="order-list__item__body__deposit">
              <p class="order-list__item__title">押金:</p>
              <p>￥{{item.orderDeposit}}</p>
            </div>
            <div class="order-list__item__execute">
              <el-button type="success" v-if="item.orderState === '未支付'" @click="pay(item)">支付</el-button>
              <el-button type="primary" @click="toDetail(item)">详情</el-button>
            </div>
          </div>
        </div>
        <div class="flex justify-end my-4">
          <el-pagination
              @current-change="getList"
              :current-page="queryParams.page"
              :page-size="queryParams.size"
              background
              :total="total"
              layout="prev, pager, next"
          />
        </div>
      </div>
      <div class="order-empty" v-else>暂无数据</div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
}
.order-list {
  @apply flex flex-col gap-4;
  &__item {
    @apply grid-rows-4 grid border border-gray-300 rounded-md divide-y divide-gray-400 shadow-sm;
    &__title {
      @apply text-sm text-gray-500;
    }
    &__header {
      @apply row-span-1 flex justify-between items-center p-2;
      &__left {
        @apply flex gap-4;
      }
      &__right {
        @apply flex gap-4;
      }
    }
    &__body {
      @apply row-span-3 grid grid-cols-7 gap-4 p-2;
      &__home-info {
        @apply col-span-2 flex gap-4;
        &__img {
          @apply w-32 h-24 flex-2;
          img {
            @apply w-full h-full object-cover;
          }
        }
        &__content {
          @apply flex flex-col flex-1;
          &__name {
            @apply text-lg font-semibold;
          }
          &__type {
            @apply text-sm;
          }
          &__address {
            @apply text-sm;
            el-icon {
              @apply mr-1;
            }
          }
        }
      }
      &__checkin-date {
        @apply col-span-2;
        &__label {
          @apply text-[.8rem] bg-primary p-1 text-white rounded-sm;
        }
      }
      &__payment {
        @apply col-span-1;
      }
      &__deposit {
        @apply col-span-1;
      }
    }
  }
}
.order-empty {
  @apply flex justify-center items-center h-[55%] w-[60dvw] text-2xl text-gray-500;
}
</style>
