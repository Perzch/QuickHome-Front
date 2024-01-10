<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import {checkHome, getHome} from "@/api/home/home";
import type {HomeSearchResult, HousingReview, QueryParams} from "@/types";
import DeviceTag from "@/components/DeviceTag.vue";
import {addReview, deleteReview, likeReview, listReview} from "@/api/review/home";
import {useGlobalStore} from "@/stores";
import {useStorage} from "@vueuse/core";
import dayjs from "dayjs";
import {addCollection, checkCollection, delCollection} from "@/api/home/collection";

const route = useRoute()
const router = useRouter()
const searchInfo = JSON.parse(localStorage.getItem('searchInfo') || '{}')
const check = ref(false)
const { userInfo } = useGlobalStore()
const back = () => {
  ElMessage.error('未查询到该房屋')
  router.push('/')
}
if(!route.query.id) {
  back()
}
const id = ref(route.query.id)
const loading = ref(false)
const form = ref<HomeSearchResult>({} as HomeSearchResult)
// TODO 调用接口判断当前房屋能不能预定


const getData = async () => {
  loading.value = true
  try {
    const checkRes = await checkHome({
      homeId: id.value as any,
      beginDate: dayjs(searchInfo.beginDate || undefined).format('YYYY-MM-DD'),
      endDate: dayjs(searchInfo.endDate).format("YYYY-MM-DD") || dayjs().add(1,'day').format('YYYY-MM-DD'),
    })
    check.value = true
  } catch (e) {
    check.value = false
  }
  const {data} = await getHome(id.value as any)
  form.value = data
}
await getData()


const to = () => {
  router.push({
    path: '/order',
    query: {
      homeId: form.value.homeId
    }
  })
}


// 评论部分
const list = ref<HousingReview[]>([])
const total = ref(0)
const queryParams = ref<QueryParams>({
  page: 1,
  size: 10
})
const curIndex = computed(() => {
  if(queryParams.value.page && queryParams.value.size) {
    return (queryParams.value.page - 1) * queryParams.value.size + 1
  }
  return 1
})
const getList = async () => {
  loading.value = true
  const {data} = await listReview({
    homeId: id.value as any,
    ...queryParams.value
  })
  list.value = data.records
  list.value.forEach((item: HousingReview,index:number) => {
    item.like = false
    item.index = curIndex.value + index
    item.secondHousingInfo = list.value.find(r => r.housingReviewId === item.secondHousingReviewId && item.housingReviewId !== item.secondHousingReviewId)
  })
  total.value = data.total
  loading.value = false
}
watch(() => queryParams, () => {
  getList()
}, {immediate: true})

const like = async (item: HousingReview) => {
  await likeReview(item.housingReviewId)
  item.homeLikeCount += 1
  item.like = true
}

const open = ref(false)
const title = ref('')
const reviewForm = ref<HousingReview>({} as HousingReview)
const rules = {
  comments: [
    { required: true, message: '请输入评论内容', trigger: 'blur' },
  ]
}

const dialogOpen = (item: HousingReview | null,str: string) => {
  Object.assign(reviewForm.value, {
    secondHousingReviewId: item?.housingReviewId,
    housingReviewRating: 0,
    homeId: id.value as any,
    userId: userInfo.userId,
    comments: ''
  })
  title.value = str
  open.value = true
}
const dialogClose = () => {
  open.value = false
}
const reply = async () => {
  await addReview(reviewForm.value)
  await getList()
  dialogClose()
  ElMessage.success('评论成功')
}

const removeReview = async (item: HousingReview) => {
  await ElMessageBox.confirm('此操作将永久删除该评论以及回复', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteReview(item.housingReviewId)
  await getList()
  ElMessage.success('删除成功')
}

const collection = ref(false)
const firstCheckCollection = async () => {
  if(!userInfo.userId) {
    return
  }
  const {data} = await checkCollection({
    userId: userInfo.userId,
    homeId: id.value as any
  })
  collection.value = data
}
firstCheckCollection()
const collectionHome = async () => {
  if(!userInfo.userId) {
    return ElMessage.warning('请先登录')
  }
  if(collection.value) {
    await delCollection({
      userId: userInfo.userId,
      homeId: id.value as any
    })
    collection.value = false
    return ElMessage.success('取消收藏成功')
  }
  await addCollection({
    userId: userInfo.userId,
    homeId: id.value as any
  })
  collection.value = true
  ElMessage.success('收藏成功')
}
</script>

<template>
  <div class="app-container" v-loading.fullscreen="loading">
    <div class="hero">
      <div class="hero__info">
        <div class="hero__info__tag">
          <p class="hero__info__tag__type">{{form.home?.homeType}}</p>
          <p class="hero__info__tag__type">{{form.homeInformation?.homeArea}}m²</p>
          <p class="hero__info__tag__type">{{form.homeInformation?.houseStructure}}</p>
          <p class="hero__info__tag__type">{{form.homeInformation?.maxPerson}}人间</p>
        </div>
        <p class="hero__info__name">{{form.home?.homeName}}</p>
        <p class="hero__info__address"><el-icon><Location/></el-icon>{{form.home?.homeAddress}}</p>
        <p class="hero__info__day-rent">{{form.home?.homeDayRent}}元/天</p>
        <p class="hero__info__deposit">押金:￥{{form.homeInformation?.homeDeposit}}</p>
        <p class="hero__info__device__list" v-if="form.homeDeviceList?.length">
          <p class="hero__info__device__list__title">设备:</p>
          <DeviceTag v-for="item in form.homeDeviceList" :device="item" />
        </p>
        <div class="hero__info__execute">
          <el-button :type="collection ? 'primary' : ''" icon="StarFilled" circle @click="collectionHome"></el-button>
          <el-button type="primary" size="large" @click="to" v-if="check">立即预定</el-button>
        </div>
      </div>
      <div class="hero__img__list" :class="`hero__img__list--${form.home?.homeImageList.length}`">
        <div class="hero__img__list__item" v-for="item in form.home?.homeImageList">
          <img :src="'/' + item" alt="">
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="comment__list">
      <div class="comment__list__header">
        <p class="comment__list__header__title">评论</p>
        <div class="comment__list__header__execute">
          <el-button type="primary" @click="dialogOpen(null,'发表评论')">发表</el-button>
        </div>
      </div>
      <el-collapse-transition>
        <div class="comment__list__item" v-if="list.length" v-for="(item) in list" :key="item.housingReviewId">
          <div class="comment__list__item__title">
            <div class="comment__list__item__number">{{item.index}}楼</div>
            <div class="comment__list__item__rate">
              <el-rate v-model="item.housingReviewRating" disabled/>
            </div>
          </div>
          <div class="comment__list__item__content">
              <div class="comment__list__item__content__text">{{item.comments}}</div>
            <div class="comment__list__item__content__reply" v-if="item.secondHousingInfo">
              <span class="comment__list__item__content__reply__placeholder">回复{{item.secondHousingInfo?.index}}楼:</span>
              <div class="comment__list__item__content__reply__box">
                <div class="comment__list__item__content__reply__box__text">{{item.secondHousingInfo?.comments}}</div>
              </div>
            </div>
            <div class="comment__list__item__content__like">
              <el-button type="danger" @click="removeReview(item)" v-if="item.userId === userInfo.userId">删除</el-button>
              <el-button type="primary" @click="dialogOpen(item,'回复评论')">回复</el-button>
              <el-button :type="item.like ?'primary' : ''" @click="like(item)" v-debounce>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconflike"></use>
                </svg>
                {{item.homeLikeCount}}
              </el-button>
            </div>
          </div>
        </div>
        <div class="comment__list__item--empty" v-else>暂无评论</div>
      </el-collapse-transition>
      <div class="pagination">
        <el-pagination
            v-model:current-page="queryParams.page"
            v-model:page-size="queryParams.size"
            :page-sizes="[10, 20, 50, 100, 200]"
            background
            layout="total, pager"
            :total="total"
        />
      </div>
    </div>
    <el-dialog v-model="open" :title="title" @close="dialogClose">
      <el-form :model="reviewForm" :rules="rules" label-width="6.225rem">
        <el-form-item label="评分" prop="housingReviewRating">
          <el-rate v-model="reviewForm.housingReviewRating" />
        </el-form-item>
        <el-form-item label="内容" prop="comments">
          <el-input type="textarea" :rows="2" v-model="reviewForm.comments" placeholder="请输入评论内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reply">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  @apply min-h-[100dvh] w-full bg-gradient-to-b from-white to-lime-50;
  .hero {
    @apply grid grid-cols-2 px-20 pt-20 gap-4 min-h-[100dvh];
    .hero__info {
      @apply pl-12 col-span-1 flex flex-col gap-4 h-full;
      &__tag {
        @apply flex gap-4 my-10 items-center;
        &__type {
          @apply border rounded-lg w-fit py-1 px-4 duration-300 transition-all;
          &:hover {
            @apply bg-gray-300;
          }
        }
      }
      &__name {
        @apply text-4xl font-bold underline underline-offset-[-2px] decoration-success decoration-8;
      }
      &__address {
        @apply text-gray-500 text-xl flex items-center;
      }
      &__day-rent {
        @apply font-semibold text-primary text-2xl;
      }
      &__deposit {
        @apply text-gray-500 text-xl;
      }
      &__device__list {
        &__title {
          @apply text-gray-500 text-xl mb-2;
        }
      }
      &__execute {
        @apply self-end justify-self-end pr-10;
      }
    }
    .hero__img__list {
      @apply grid grid-cols-4 grid-rows-4 col-span-1 gap-4 max-h-[85dvh];
      &__item {
        @apply rounded-md overflow-hidden hover:shadow-lg duration-300 transition-all;
      }
      &__item {
        img {
          @apply w-full h-full object-cover hover:scale-105;
        }
        &:nth-child(1) {
          @apply col-span-3 row-span-2 row-start-3;
        }
        &:nth-child(2) {
          @apply col-span-3 row-span-2 row-start-1 col-start-2;
        }
        &:nth-child(3) {
          @apply col-span-1 row-span-1 row-start-3 col-start-4;
        }
        &:nth-child(4) {
          @apply col-span-1 row-span-1 row-start-4 col-start-4;
        }
        &:nth-child(5) {
          @apply col-span-1 row-span-1 row-start-2 col-start-1;
        }
      }
    }
    .hero__img__list--1 {
      @apply flex items-center justify-center;
    }
    //.hero__img__list--2 {
    //  @apply flex items-center justify-center;
    //  &__item {
    //    @apply flex-1;
    //  }
    //}
    //.hero__img__list--3 {
    //  &__item {
    //    &:nth-child(1) {
    //      @apply col-span-3 row-span-2 row-start-3;
    //    }
    //    &:nth-child(2) {
    //      @apply col-span-2 row-span-2 row-start-1 col-start-3;
    //    }
    //    &:nth-child(3) {
    //      @apply col-span-1 row-span-1 row-start-2;
    //    }
    //  }
    //}
    //.hero__img__list--4 {
    //  &__item {
    //    &:nth-child(1) {
    //      @apply col-span-3 row-span-2 row-start-3;
    //    }
    //    &:nth-child(2) {
    //      @apply col-span-2 row-span-2 row-start-1 col-start-3;
    //    }
    //    &:nth-child(3) {
    //      @apply col-span-1 row-span-1 row-start-2;
    //    }
    //    &:nth-child(4) {
    //      @apply col-span-1 row-span-1 row-start-2;
    //    }
    //  }
    //}
  }
  .comment__list {
    @apply mx-20 px-4 divide-y rounded-md;
    &:hover {
      @apply bg-white shadow-md;
    }
    &__header {
      @apply flex justify-between py-4;
      &__title {
        @apply text-2xl font-bold py-4 underline underline-offset-[-2px] decoration-success decoration-8;
      }
      &__execute {
        @apply self-end justify-self-end;
      }
    }
    &__item {
      @apply py-2;
      &__title {
        @apply flex items-center justify-between;
        &__number {
          @apply text-gray-300 text-2xl font-bold;
        }
        &__rate {
          @apply flex items-center;
        }
      }
      &__content {
        &__text {
          @apply text-gray-500;
        }
        &__reply {
          @apply border p-1 rounded-md;
          &__placeholder {
            @apply text-gray-300;
          }
          &__box {
            @apply pl-2;
            &__text {
              @apply text-gray-500;
            }
          }
        }
        &__like {
          @apply flex justify-end p-2;
          svg {
            @apply text-lg mb-1 mr-1;
          }
          &.active {
            @apply text-success;
          }
        }
      }
    }
    &__item--empty {
      @apply flex justify-center items-center h-40;
    }
  }
  .pagination {
    @apply flex justify-end pb-10 pt-4;
  }
}

</style>
