<script lang='ts' setup>
import {markRaw, ref} from 'vue';
import { listAttractionByCollection } from '@/api/attraction/attraction'
import { listHomeOrderByCollection } from "@/api/home/home";
import SearchBar from "@/components/SearchBar.vue";
import {useRouter} from "vue-router";
import type {Attraction, HomeSearchInfo, HomeSearchResult, HotAttraction} from "@/types";
import dayjs from "dayjs";
import {Location} from "@element-plus/icons-vue";
const homeList = ref<HomeSearchResult[]>([])
const attractionList = ref<HotAttraction[]>([])
const loading = ref(false)
const router = useRouter()


const getList = async () => {
  loading.value = true
  const [homeRes,attractionRes] = await Promise.all([listHomeOrderByCollection(), listAttractionByCollection()])
  homeList.value = homeRes.data
  attractionList.value = attractionRes.data
  loading.value = false
}
await getList()

const searchInfo = ref<HomeSearchInfo>({
  beginDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(1,'day').format('YYYY-MM-DD'),
  minRent: 50,
  personCount: 1,
  roomCount: 1,
  maxPeople: 1,
  page: 1,
  size: 100,
})
const toSearch = () => {
  router.push({
    path: '/search',
    query: searchInfo.value
  })
}
</script>
<template>
  <div class="wrap" v-loading.fullscreen="loading">
    <div class="hero-section">
      <h1 class="hero-title"><span>下一站</span>去哪里？</h1>
      <search-bar v-model="searchInfo" @search="toSearch"/>
      <p class="hero-sup">为您提供完美的无人名宿体验是我们的初衷!</p>
    </div>
    <div class="home-list">
      <div class="home-list__item" v-for="item in homeList" :key="item.homeId">
        <div class="home-list__item__img">
          <img :src="item.home.homeImages?.split(',')[0]" alt="">
        </div>
        <div class="home-list__item__info">
          <div class="home-list__item__info__title">{{item.home.homeName}}</div>
          <div class="home-list__item__info__price">￥{{item.home.homeDayRent}}/晚</div>
          <div class="home-list__item__info__address">
            <el-icon><Location/></el-icon>
            <span>{{item.home.homeAddress}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.wrap {
  //scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  height: 100dvh;
  //overflow-y: scroll;

  //&> :deep(*) {
  //  scroll-snap-align: start;
  //}
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
