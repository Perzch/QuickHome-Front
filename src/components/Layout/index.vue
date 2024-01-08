<script setup lang="ts">
import HeaderNav from "@/components/Layout/HeaderNav.vue";
</script>

<template>
  <div class="wrap">
    <HeaderNav/>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  //scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  height: 100dvh;
  //overflow-y: scroll;

  //&> :deep(*) {
  //  scroll-snap-align: start;
  //}
}
</style>
