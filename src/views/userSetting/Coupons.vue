<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {computed, ref, watch} from "vue";
import {listCoupon} from "@/api/coupon/coupon";
const { userInfo } = useGlobalStore()
const loading = ref(false)
const list= ref([])
const total = ref(0)
const queryParams = computed(() => ({
  userId: userInfo.userId,
  page: 1,
  size: 10
}))

const getList =async () => {
  loading.value = true
  const {data} = await listCoupon(queryParams.value)
  list.value = data.records
  total.value = data.total
  loading.value = false
}
watch(() => queryParams.value, getList, {immediate: true})
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
      <div class="coupon-list">
        <div class="coupon-item" v-for="{coupon} in list" :key="coupon.couponId">
          <div class="coupon-item__intensity">
            <template v-if="coupon.discountMethod === '折扣'"><span class="text-2xl">{{coupon.discountIntensity * 10}}</span>折</template>
            <template v-else>￥<span class="text-2xl">{{coupon.discountIntensity}}</span></template>
          </div>
          <div class="coupon-item__info">
            <div class="coupon-item__name">
              {{coupon.couponName}}
            </div>
            <div class="coupon-item__information">
              {{coupon.discountInformation}}
            </div>
            <div class="coupon-item__condition">
              订单需满 <span class="text-danger">￥{{coupon.useThreshold}}</span>
            </div>
            <div class="coupon-item__time">
              {{coupon.earliestUseTime}}-{{coupon.latestUseTime}}
            </div>
          </div>
          <div class="coupon-item__button">立即使用</div>
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
  </div>
</template>

<style scoped lang="scss">
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold text-primary;
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
</style>
