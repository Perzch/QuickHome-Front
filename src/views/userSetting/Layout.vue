<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import HeaderNav from "@/components/HeaderNav.vue";
import {Star,Wallet,Postcard, Present, User} from "@element-plus/icons-vue";
const router = useRouter()
const route = useRoute()
const to = (path: string) => {
  router.push(`/userSettings/${path}`)
}
</script>

<template>
  <div class="wrap">
    <HeaderNav />
    <div class="app-container">
      <div class="nav">
        <div class="nav-item" :class="{'active':route.path === '/userSettings/info'}" @click="to('info')">
          <el-icon> <User/> </el-icon>
          个人信息
        </div>
        <div class="nav-item" :class="{'active':route.path === '/userSettings/star'}" @click="to('star')">
          <el-icon> <Star/> </el-icon>
          我的收藏
        </div>
        <div class="nav-item" :class="{'active':route.path === '/userSettings/coupons'}" @click="to('coupons')">
          <el-icon> <Present/> </el-icon>
          优惠券
        </div>
        <div class="nav-item" :class="{'active':route.path === '/userSettings/travellers'}" @click="to('travellers')">
          <el-icon> <Postcard/> </el-icon>
          旅客信息
        </div>
        <div class="nav-item" :class="{'active':route.path === '/userSettings/wallet'}" @click="to('wallet')">
          <el-icon> <Wallet/> </el-icon>
          钱包
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply flex gap-10 pt-32 pl-40 pr-20;
  .nav {
    @apply border rounded-md h-fit grid grid-cols-1 divide-y overflow-hidden min-w-max sticky top-32;
    .nav-item {
      @apply flex items-center gap-2 p-4 cursor-pointer;
      &.active {
        @apply bg-primary text-white;
        :deep(.el-icon) {
          @apply bg-white text-primary;
        }
      }
      :deep(.el-icon) {
        @apply rounded-full p-2 box-content bg-gray-50 text-xl;
      }
      &:hover {
        @apply bg-primary text-white;
        :deep(.el-icon) {
          @apply bg-white text-primary;
        }
      }
    }
  }
}
</style>
