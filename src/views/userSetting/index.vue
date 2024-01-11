<script setup lang="ts">
import UserCenterCard from "@/components/UserCenterCard.vue";
import {List, Postcard, Present, Star, SwitchButton, User, Wallet} from "@element-plus/icons-vue";
import {useGlobalStore} from "@/stores";
import {useRouter} from "vue-router";

const {userInfo,logout} = useGlobalStore()
const router = useRouter()
if(!userInfo.userId) {
  ElMessage.error('请先登录')
  router.push('/auth/1')
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
      <div class="title">个人设置</div>
      <p>管理QuickHome体验</p>
      <div class="card-items">
        <UserCenterCard path="info" title="用户信息" link="管理信息" :icon="User" placeholder="管理你本人的信息。"/>
        <UserCenterCard path="star" title="我的收藏" link="管理收藏" :icon="Star" placeholder="管理你收藏的房型与景点。"/>
        <UserCenterCard path="coupons" title="优惠券" link="查看券包" :icon="Present" placeholder="查看你现在可以使用的优惠券。"/>
        <UserCenterCard path="travellers" title="旅客信息" link="管理信息" :icon="Postcard" placeholder="行使隐私权，管理数据使用方式。"/>
        <UserCenterCard path="wallet" title="钱包" link="打开钱包" :icon="Wallet" placeholder="提现或充值你的余额。"/>
        <UserCenterCard path="orders" title="订单" link="查看订单" :icon="List" placeholder="查看你在QuickHome消费的订单。"/>
        <UserCenterCard path="auth/1" title="退出登录" link="退出登录" :icon="SwitchButton" placeholder="在QuickHome退出你的账号。" :click="handleClick"/>
      </div>
    </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply pt-32 px-2 sm:px-6 lg:px-8 pb-10;
  .title {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
  .card-items {
    @apply grid grid-cols-2 gap-4;
  }
}
</style>
