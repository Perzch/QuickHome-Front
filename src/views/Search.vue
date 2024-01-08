<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import {listHome} from "@/api/home/home";
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {HomeSearchInfo, HomeSearchResult} from "@/types";
import DeviceTag from "@components/DeviceTag.vue";
import {Location} from "@element-plus/icons-vue";
const route = useRoute()
const router = useRouter()
const list = ref<HomeSearchResult[]>()
const total = ref(0)
const loading = ref(false)
const queryParams = ref<HomeSearchInfo>({
  ...route.query
} as any)

const getList = async () => {
  loading.value = true
  router.push({
    path: '/search',
    query: queryParams.value
  })
  const {data} = await listHome(queryParams.value)
  list.value = data
  loading.value = false
}
getList()

const toDetail = (item:HomeSearchResult) => {
  router.push({
    path: '/home/detail',
    query: {
      id: item.homeId
    }
  })
}
</script>

<template>
      <div class="app-container" v-loading="loading">
        <search-bar :all="true" v-model="queryParams" @search="getList"/>
        <div class="home-list" v-if="list?.length">
          <div class="home-item" v-for="item in list" :key="item.homeId">
            <div class="home-item__image">
              <img :src="item.home.homeImageList[0]" alt=""/>
            </div>
            <div class="home-item__info">
              <div class="home-item__name">
                <span class="home-item__info__title">房屋名:</span>
                <span class="home-item__info__text">{{item.home.homeName}}</span>
              </div>
              <div class="home-item__type">
                <span class="home-item__info__title">房屋类型:</span>
                <span class="home-item__info__text">{{item.home.homeType}}</span>
              </div>
              <div class="home-item__address">
                <span class="home-item__info__title">房屋地址:</span>
                <span class="home-item__info__text"><el-icon><Location/></el-icon>{{item.home.homeAddress}}</span>
              </div>
              <div class="home-item__device-list" v-if="item.homeDeviceList.length">
                <span class="home-item__info__title">设备: </span>
                <DeviceTag :device="device" v-for="device in item.homeDeviceList" :key="device.deviceID"></DeviceTag>
              </div>
            </div>
            <div class="home-item__price">
              <div class="home-item__price__day-rent">￥{{item.home.homeDayRent}}元/晚</div>
              <div class="home-item__price__deposit"><span class="text-gray-500 text-sm">押金：</span>￥{{item.homeInformation.homeDeposit}}</div>
              <div class="home-item__price__execute">
                <el-button @click="toDetail(item)">查看详情</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="home-list--empty" v-else>
          <div>暂无数据</div>
        </div>
      </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply pt-20 px-20 flex flex-col items-center justify-center  bg-gradient-to-b from-white to-lime-50 min-h-screen;
  .home-list {
    @apply mt-20 border rounded-md p-2 shadow-md flex flex-col gap-2;
    .home-item {
      @apply grid grid-cols-4 gap-4 p-4 rounded-md transition-all duration-300;
      &:hover {
        @apply shadow-md bg-primary text-white;
        .home-item__info {
          .home-item__info__title.home-item__info__title {
            @apply text-gray-100;
          }
          .home-item__address {
            .home-item__info__text {
              @apply text-white;
            }
          }
        }
        .home-item__price {
          .home-item__price__day-rent {
            @apply text-white;
          }
          .home-item__price__deposit {
            @apply text-gray-100;
          }
        }
      }
      .home-item__image {
        @apply col-span-1;
        img {
          @apply w-full aspect-square object-cover rounded-md;
        }
      }
      .home-item__info {
        @apply col-span-2 flex flex-col gap-2;
        .home-item__info__title {
          @apply text-sm text-gray-500;
        }
        .home-item__address {
          @apply flex items-center gap-2;
          .home-item__info__text {
            @apply flex items-center gap-1 text-gray-600 transition-all duration-300;
          }
        }
        .home-item__name {
          @apply flex items-center gap-2 text-2xl;
        }
      }
      .home-item__price {
        @apply col-span-1 flex flex-col items-center gap-2;
        .home-item__price__day-rent {
          @apply text-2xl font-semibold;
        }
        .home-item__price__deposit {
          @apply text-gray-500;
        }
      }
    }
  }
  .home-list--empty {
    @apply mt-20 text-2xl text-gray-500;
  }
}
</style>
