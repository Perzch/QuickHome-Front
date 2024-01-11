<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {computed, ref, watch} from "vue";
import {listCoupon} from "@/api/coupon/coupon";
import type {Coupon, CouponResult, UserCoupon} from "@/types";
import {useRoute, useRouter} from "vue-router";
const { userInfo } = useGlobalStore()
const loading = ref(false)
const router = useRouter()
const list= ref<CouponResult[]>([] as CouponResult[])
const total = ref(0)
const queryParams = computed(() => ({
  userId: userInfo.userId,
  page: 1,
  size: 10
}))

if(!userInfo.userId) {
  ElMessage.error('请先登录')
  router.push('/auth/1')
}
const getList =async () => {
  loading.value = true
  const {data} = await listCoupon(queryParams.value)
  list.value = data.records
  total.value = data.total
  loading.value = false
}
watch(() => queryParams.value, getList, {immediate: true})

const route = useRoute()
const router = useRouter()
const select = ref(Boolean(route.query.select))
const price = ref(Number(route.query.price))

const selectCoupon = (item:CouponResult) => {
  if(select.value) {
    window.opener.postMessage({
      couponResult: JSON.parse(JSON.stringify(item))
    }, '*')
    window.close()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="wrap" v-loading.fullscreen="loading">
    <div class="coupon__header">
      <div class="title">
        <h1>优惠券</h1>
        <h3>查看你现在可以使用的优惠券。</h3>
      </div>
    </div>
    <div class="coupon__content">
      <div class="coupon-list" v-if="list.length">
        <div class="coupon-item" v-for="item in list" :key="item.coupon.couponId">
          <div class="coupon-item__intensity">
            <template v-if="item.coupon.discountMethod === '折扣'"><span class="text-2xl">{{item.coupon.discountIntensity * 10}}</span>折</template>
            <template v-else>￥<span class="text-2xl">{{item.coupon.discountIntensity}}</span></template>
          </div>
          <div class="coupon-item__info">
            <div class="coupon-item__name">
              {{item.coupon.couponName}}
            </div>
            <div class="coupon-item__information">
              {{item.coupon.discountInformation}}
            </div>
            <div class="coupon-item__condition">
              订单需满 <span class="text-danger">￥{{item.coupon.useThreshold}}</span>
            </div>
            <div class="coupon-item__time">
              {{item.coupon.earliestUseTime}}-{{item.coupon.latestUseTime}}
            </div>
          </div>
          <div class="coupon-item__button" @click="selectCoupon(item)" v-if="!select || price && price > item.coupon.useThreshold">{{select ? '选择' : '立即使用'}}</div>
        </div>
      </div>
      <div class="coupon-list--empty" v-else>暂无数据</div>
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
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply w-full;
}
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
}
.coupon-list {
  @apply flex flex-col gap-4;
  .coupon-item {
    @apply grid grid-cols-4 divide-x border rounded-md overflow-hidden shadow-md;
    &:hover {
      @apply shadow-inner scale-105;
    }
    .coupon-item__intensity {
      @apply flex items-center justify-center col-span-1 bg-danger text-white;
    }
    .coupon-item__info {
      @apply col-span-2 p-2;
      .coupon-item__name {
        @apply text-lg font-semibold;
      }
      .coupon-item__time {
        @apply text-slate-400;
      }
      .coupon-item__condition {
        @apply text-sm;
      }
      .coupon-item__time {
        @apply text-sm;
      }
    }
    .coupon-item__button {
      @apply flex items-center justify-center col-span-1 cursor-pointer text-danger;
    }
  }
}
.coupon-list--empty {
  @apply text-2xl text-center text-gray-500;
}
</style>
