<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import BaseTitle from "@/components/base/Title.vue";
import UserCenterCard from "@/components/UserCenterCard.vue";
import {Postcard, Present, Star, User, Wallet} from "@element-plus/icons-vue";
</script>

<template>
  <div class="wrap">
    <HeaderNav />
    <div class="app-container">
      <base-title class="after:bg-success">个人设置</base-title>
      <p>管理QuickHome体验</p>
      <div class="card-items">
        <UserCenterCard path="info" title="用户信息" link="管理信息" :icon="User" placeholder="管理你本人的信息。"/>
        <UserCenterCard path="star" title="我的收藏" link="管理收藏" :icon="Star" placeholder="管理你收藏的房型与景点。"/>
        <UserCenterCard path="coupons" title="优惠券" link="查看券包" :icon="Present" placeholder="查看你现在可以使用的优惠券。"/>
        <UserCenterCard path="travellers" title="旅客信息" link="管理信息" :icon="Postcard" placeholder="行使隐私权，管理数据使用方式。"/>
        <UserCenterCard path="wallet" title="钱包" link="打开钱包" :icon="Wallet" placeholder="提现或充值你的余额。"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply pt-32 px-2 sm:px-6 lg:px-8;
  .card-items {
    @apply grid-cols-2 gap-4 grid;
  }
}
</style>
