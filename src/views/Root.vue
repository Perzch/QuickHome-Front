<script lang='ts' setup>
import { ref} from 'vue';
import { listAttractionByCollection } from '@/api/attraction/attraction'
import { listHomeOrderByCollection } from "@/api/home/home";
import SearchBar from "@/components/SearchBar.vue";
import {useRouter} from "vue-router";
import type { HomeSearchInfo, HomeSearchResult, HotAttraction} from "@/types";
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

const toHomeDetail = (item:HomeSearchResult) => {
  router.push({
    path: '/home/detail',
    query: {
      id: item.homeId
    }
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
          <img :src="item.home.homeImageList[0]" alt="">
        </div>
        <div class="home-list__item__info">
          <div class="home-list__item__info__title">房屋详情</div>
          <div class="home-list__item__info__name">{{item.home.homeName}}</div>
          <div class="home-list__item__info__price">￥{{item.home.homeDayRent}}/晚</div>
          <div class="home-list__item__info__address">
            <el-icon><Location/></el-icon>
            <span>{{item.home.homeAddress}}</span>
          </div>
          <div class="home-list__item__info__execute" @click="toHomeDetail(item)">
            <span>查看详情</span>
            <span class="detail-icon">
            <el-icon>
              <Right />
            </el-icon>
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="attraction-info" v-if="attractionList.length">
      <div class="attraction-list__title">热门景点</div>
      <div class="attraction-list">
        <div class="attraction-list__item" v-for="item in attractionList">
          <div class="attraction-list__item__img" >
              <img :src="'/' + item.attraction.attractionImageList?.[0]" alt="">
          </div>
          <div class="attraction-list__item__info">
            <div class="attraction-list__item__info__name">{{item.attraction.attractionName}}</div>
            <div class="attraction-list__item__info__detail" v-html="item.attraction.attractionInformation">
            </div>
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
  //background-image: url("https://picsum.photos/1920/1280?q=1&blur=4");
  background-image: url("../assets/1.jpg");

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

.home-list {
  .home-list__item:nth-child(odd) {
    background-image: none;
    direction: rtl;
  }
  .home-list__item {
    @apply grid grid-cols-3 p-20 gap-10 h-screen items-start bg-fixed;
    background-image: url("../assets/bg-setting.jpg");
    .home-list__item__img {
      @apply w-full h-full col-span-2 hover:shadow-md rounded-2xl overflow-hidden;
      img {
        @apply w-full h-full object-cover rounded-2xl hover:scale-105;
      }
    }
    .home-list__item__info {
      direction: ltr;
      @apply p-4 rounded-md shadow-md bg-white flex flex-col;
      &__title {
        @apply text-sm text-gray-500;
      }
      &__name {
        @apply text-3xl font-semibold;
      }
      &__price {
        @apply text-2xl font-semibold;
      }
      &__address {
        @apply flex items-center gap-2 text-gray-500;
      }
      &__execute {
        @apply self-end flex w-fit items-center gap-2 cursor-pointer px-2 py-1 rounded-md mt-2;

        &:hover {
          @apply border-gray-300 shadow-inner;

          .detail-icon i {
            animation: -right-leave-left-enter 0.5s ease;
          }
        }

        .detail-icon {
          @apply flex items-center p-1 bg-success rounded-md text-white;
        }
      }
    }
  }
}

.attraction-info {
  @apply py-10 bg-gradient-to-b from-white to-gray-100 bg-opacity-30 bg-fixed bg-center;
  background-image: url("../assets/19693100.jpg");
  .attraction-list__title {
    @apply pl-20 my-4 text-3xl font-semibold underline decoration-8 decoration-success underline-offset-[-2px] text-white;
  }
  .attraction-list {
    @apply grid grid-cols-3 gap-10 px-20;
    .attraction-list__item {
      @apply flex flex-col gap-4 rounded-md shadow-md bg-white p-4;
      .attraction-list__item__img {
        @apply w-full h-60 rounded-md overflow-hidden;
        img {
          @apply w-full h-full object-cover;
        }
      }
      .attraction-list__item__info {
        @apply flex flex-col gap-2;
        &__name {
          @apply text-2xl font-semibold;
        }
        &__detail {
          @apply text-gray-500;
        }
      }
    }
  }
}
</style>
