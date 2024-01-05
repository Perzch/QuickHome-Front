<script lang='ts' setup>
import HeaderNav from '@/components/HeaderNav.vue'
import { markRaw, reactive, ref } from 'vue';
import { listAttractionByCollection } from '@/api/attraction/attraction'
import { listHomeOrderByCollection } from "@/api/home/home";
import HotRoom from "@/components/HotRoom.vue";
import { type MaybeComputedElementRef, useElementSize } from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
import AttractionSwiper from "@/components/AttractionSwiper.vue";
const hotRoomTypeList = ref([])
const attraction = ref({})
const hotAttractionBox = ref()
const { width } = useElementSize(hotAttractionBox as MaybeComputedElementRef)
Promise.all([listHomeOrderByCollection(), listAttractionByCollection()]).then(([{ data: hotRoomsData }, attractionRes]) => {
  //TODO:补全
  console.log(hotRoomsData, attractionRes)
  hotRoomTypeList.value = hotRoomsData
  attraction.value = attractionRes
})
</script>
<template>
  <div class="wrap">
    <HeaderNav />
    <div class="hero-section">
      <h1 class="hero-title"><span>下一站</span>去哪里？</h1>
      <search-bar />
      <p class="hero-sup">为您提供完美的无人名宿体验是我们的初衷!</p>
      <div class="hero-button-group">
        <el-button type="primary" size="large"
          class="hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">预订房间</el-button>
        <router-link to="/aboutus" class="hero-about">关于我们 <span>→</span></router-link>
      </div>
    </div>
<!--    <hot-room :hotRoomTypeList="hotRoomTypeList" />-->
<!--    <div class="hot-attraction" ref="hotAttractionBox">-->
<!--      <attraction-swiper :attraction="attraction" />-->
<!--    </div>-->
  </div>
</template>
<style lang='scss' scoped>
.wrap {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  height: 100dvh;
  overflow-y: scroll;

  &> :deep(*) {
    scroll-snap-align: start;
  }
}

.hero-section {
  @apply h-screen px-2 sm:px-6 lg:px-8 bg-fixed flex items-center justify-center flex-col gap-2;
  background-image: url("https://picsum.photos/1920/1280?q=1&blur=4");

  .hero-title {
    @apply text-4xl font-bold tracking-tight sm:text-6xl;

    span {
      @apply text-6xl sm:text-8xl bg-gradient-to-tr from-success to-lime-300 bg-clip-text text-transparent;
    }
  }

  .hero-sup {
    @apply mt-6 text-lg leading-8;
  }

  .hero-button-group {
    @apply mt-10 flex items-center justify-center gap-x-6;
  }

  .hero-about {
    @apply text-sm font-semibold leading-6;
    @apply hover:text-white hover:underline underline-offset-4;
  }
}

.hot-attraction {
  @apply h-screen bg-fixed flex items-center justify-end overflow-hidden;
  background-image: url("https://picsum.photos/1920/1280?q=2&blur=4");
}</style>
