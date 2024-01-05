<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import SearchBar from "@/components/SearchBar.vue";
import {listHome, listHomeOrderByCollection} from "@/api/home/home";
import {computed, ref, watch} from "vue";
import {type LocationQueryRaw, useRoute, useRouter} from "vue-router";
import type {HomeSearchInfo} from "@/types";
import dayjs from "dayjs";
const route = useRoute()
const router = useRouter()
const list = ref()
const queryParams = computed<HomeSearchInfo>(() => {
  return {
      page: 1,
      size: 10,
      beginDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      minRent: 0,
      maxRent: 10000,
      homeType: '',
      device: '',
      address: '',
      maxPeople: 1,
    ...route.query
  }
})

const getList = async () => {
  const {data} = await listHome(queryParams.value)
  list.value = data
}
watch(() => queryParams.value, () => {
  router.push({
    path: '/search',
    query: queryParams.value as LocationQueryRaw
  })
  getList()
}, {
  immediate: true
})
</script>

<template>
    <div class="wrap">
      <HeaderNav />
      <div class="app-container">
        <search-bar />
        <div class="home-list">
          <div class="home-item" v-for="item in list" :key="item.homeId">
            <div class="home-item__image">
              <el-image :src="item.home.homeImageList[0]"></el-image>
            </div>
            <div class="home-item__info">
              <div class="home-item__name">{{item.home.homeName}}</div>
              <div class="home-item__state">{{item.home.homeState}}</div>
              <div class="home-item__type">{{item.home.homeType}}</div>
              <div class="home-item__address">{{item.home.homeAddress}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply pt-32 px-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center;
  .home-list {
    @apply mt-20;
    .home-item {
      @apply grid grid-cols-2 gap-4;
    }
  }
}
</style>
