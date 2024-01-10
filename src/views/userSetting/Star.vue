<script setup lang="ts">
import {ref, watch} from "vue";
import {useGlobalStore} from "@/stores";
import {delCollection as delHomeCollection, listCollection as listHomeCollection} from "@/api/home/collection";
import {delCollection as delAttractionCollection, listCollection as listAttractionCollection} from "@/api/attraction/collection";
import type {Attraction, AttractionCollection, HomeCollection} from "@/types";
import {Location} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const { userInfo } = useGlobalStore()
const tab = ref(0)
watch(() => tab.value, () => {
  queryParams.value = {
    userId: userInfo.userId,
    page: 1,
    size: 10
  }
})
const queryParams = ref({
  userId: userInfo.userId,
  page: 1,
  size: 10
})
const homeList = ref<(HomeCollection)[]>([] as HomeCollection[])
const attractionList = ref<(AttractionCollection)[]>([] as AttractionCollection[])
const total = ref(0)
const loading = ref(false)

const getList = async () => {
  loading.value = true
  if(tab.value) {
    const {data} = await listAttractionCollection(queryParams.value)
    attractionList.value = data.records
    total.value = data.total
  } else {
    const {data} = await listHomeCollection(queryParams.value)
    homeList.value = data.records
    total.value = data.total
  }
  loading.value = false
}
watch(() => queryParams.value, getList, {immediate: true})

const remove = (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const fn = tab.value ? delAttractionCollection : delHomeCollection
    const key = tab.value ? 'attractionId' : 'homeId'
    loading.value = true
    await fn({
      userId: userInfo.userId,
      [key]:id
    })
    await getList()
    loading.value = false
    ElMessage.success('删除成功')
  })
}

const router = useRouter()
const to = (item: Attraction | HomeCollection) => {
  const key = tab.value ? 'attractionId' : 'homeId'
  router.push({
    path: tab.value ? '/attraction/detail' : '/home/detail',
    query: {
      id: item[key as keyof typeof item]
    }
  })
}

const timeComputeNumber = (start:string, end: string) => {
  const sliderFormatter = (val: string) => {
    const split = val.split(':');
    const hour = split[0];
    const minute = split[1];
    return Number(hour) + Number(minute) / 60;
  }
  return [sliderFormatter(start),sliderFormatter((end))]
}
const sliderFormatTooltip = (val: number) => {
  const hour = Math.floor(val);
  const minute = Math.floor((val - hour) * 60);
  return `${hour}:${minute || '00'}`;
}
const marks = {
  0: '0:00',
  6: '6:00',
  12: '12:00',
  18: '18:00',
  24: '24:00'
}

</script>

<template>
  <div class="wrap" v-loading.fullscreen="loading">
    <div class="title">
      <h1>收藏列表</h1>
      <h3>管理你收藏的房型与景点。</h3>
    </div>
    <el-tabs v-model="tab" class="demo-tabs">
      <el-tab-pane label="房屋" :name="0">
        <div class="collection-list" v-if="homeList.length">
          <transition-group>
            <el-card v-for="item in homeList" :key="item.hFavoriteRecordsId" shadow="hover" class="collection-list__item" @click="to(item)">
              <div class="collection-list__item__img">
                <img :src="'/' + item.home.homeImageList[0]" alt="">
              </div>
              <div class="collection-list__item__content">
                <h3 class="collection-list__item__content__name">{{item.home.homeName}}</h3>
                <p class="collection-list__item__content__type">{{item.home.homeType}}</p>
                <p class="collection-list__item__content__address"><el-icon><Location/></el-icon>{{item.home.homeAddress}}</p>
                <p class="collection-list__item__content__dayrent">￥{{item.home.homeDayRent}}元/晚</p>
                <div class="flex justify-end">
                  <el-button icon="delete" type="danger" circle @click.stop="remove(item.homeId)"></el-button>
                </div>
              </div>
            </el-card>
          </transition-group>
        </div>
        <div class="collection-list--empty" v-else>
          暂无数据
        </div>
      </el-tab-pane>
<!--      <el-tab-pane label="景点" :name="1">-->
<!--        <div class="collection-list">-->
<!--          <el-card v-for="item in attractionList" :key="item.aFavoriteRecordsId" shadow="hover" class="collection-list__item" @click="to(item)">-->
<!--            <div class="collection-list__item__img">-->
<!--              <img :src="'/' + item.attraction.attractionImages?.split(',')[0]" alt="">-->
<!--            </div>-->
<!--            <div class="collection-list__item__content">-->
<!--              <h3 class="collection-list__item__content__name">{{item.attraction.attractionName}}</h3>-->
<!--              <p class="collection-list__item__content__info" v-html="item.attraction.attractionInformation"></p>-->
<!--              <p class="collection-list__item__content__time__label">开放时间:</p>-->
<!--              <p class="collection-list__item__content__time">-->
<!--                <el-slider :model-value="timeComputeNumber(item.attraction.openingTime.toString(),item.attraction.closingTime.toString())" range :marks="marks" :step=".5" :max="24" :min="0" :format-tooltip="sliderFormatTooltip"/>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="flex justify-end">-->
<!--              <el-button icon="delete" type="danger" circle @click="remove(item.attractionId)"></el-button>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
    </el-tabs>
    <div class="flex justify-end my-4">
      <el-pagination
          v-model="queryParams.page"
          :page-size="queryParams.size"
          :total="total"
          layout="prev, pager, next"
          background
          @current-change="getList"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply w-full;
}
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
}
.collection-list {
  @apply grid grid-cols-2 gap-4;
  .collection-list__item {
    @apply flex flex-col gap-2 rounded-md cursor-pointer p-0;
    .collection-list__item__img {
      @apply w-full overflow-hidden;
      img {
        @apply w-full aspect-video hover:scale-110;
      }
    }
    .collection-list__item__content {
      @apply flex flex-col gap-2 p-4;
      .collection-list__item__content__name {
        @apply text-title text-xl font-semibold;
      }
      .collection-list__item__content__type {
        @apply text-gray-500 text-sm;
      }
      .collection-list__item__content__address{
        @apply text-gray-600;
      }
      .collection-list__item__content__dayrent {
        @apply text-danger text-lg font-semibold self-end;
      }
      .collection-list__item__content__time__label {
        @apply text-slate-400 text-sm;
      }
    }
  }
}
.collection-list--empty {
  @apply text-2xl text-center text-gray-500;
}
</style>
