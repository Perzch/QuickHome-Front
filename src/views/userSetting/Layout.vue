<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {Star, Wallet, Postcard, Present, User, List, SwitchButton} from "@element-plus/icons-vue";
import {useGlobalStore} from "@/stores";
const router = useRouter()
const route = useRoute()
const {userInfo,logout} = useGlobalStore()
if(!userInfo.userId) {
  ElMessage.error('请先登录')
  router.push('/auth/1')
}
const to = (path: string) => {
  router.push(`/user/settings/${path}`)
}
const handleClick = async () => {
  await ElMessageBox.confirm('是否退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  logout()
}
</script>

<template>
    <div class="app-container">
      <div class="nav">
        <div class="nav-item" :class="{'active':route.path === '/user/settings/info'}" @click="to('info')">
          <el-icon> <User/> </el-icon>
          个人信息
        </div>
        <div class="nav-item" :class="{'active':route.path === '/user/settings/star'}" @click="to('star')">
          <el-icon> <Star/> </el-icon>
          我的收藏
        </div>
        <div class="nav-item" :class="{'active':route.path === '/user/settings/coupons'}" @click="to('coupons')">
          <el-icon> <Present/> </el-icon>
          优惠券
        </div>
        <div class="nav-item" :class="{'active':route.path === '/user/settings/travellers'}" @click="to('travellers')">
          <el-icon> <Postcard/> </el-icon>
          旅客信息
        </div>
        <div class="nav-item" :class="{'active':route.path === '/user/settings/wallet'}" @click="to('wallet')">
          <el-icon> <Wallet/> </el-icon>
          钱包
        </div>
        <div class="nav-item" :class="{'active':route.path === '/user/settings/orders'}" @click="to('orders')" >
          <el-icon> <List/> </el-icon>
          订单
        </div>
        <div class="nav-item" @click="handleClick">
          <el-icon> <SwitchButton/> </el-icon>
          退出登录
        </div>
      </div>
      <router-view/>
    </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply flex gap-10 pt-32 pl-40 pr-20 min-h-full;
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
