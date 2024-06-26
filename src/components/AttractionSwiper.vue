<script setup lang="ts">
import {Navigation} from "swiper";
import {ref} from "vue";
import {type HotAttraction} from "@/types";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
const swiperButtonPrev = ref(null)
const swiperButtonNext = ref(null)
const currentSlidePage = ref(1)
defineProps<{
    attraction: HotAttraction,
    width: number
}>()
const onSlideChange = (swiper: any) => {
    currentSlidePage.value = swiper.activeIndex + 1
}
</script>

<template>
    <swiper  v-motion-fade-visible
             @slideChange="onSlideChange"
             :width="width"
             space-between="30"
             class="swiper"
             slideClass="swiper-slide"
             :modules="[Navigation]"
             :navigation="{
                    nextEl: swiperButtonNext,
                    prevEl: swiperButtonPrev
                }"
    >
        <template v-slot:container-start>
            <div class="container-start">
                <div class="attraction-title">{{attraction?.attractions?.attractionsName}}</div>
                <div class="page-tip">
                            <span class="swiper-button-prev detail-icon left-detail-icon" ref="swiperButtonPrev">
                                  <el-icon><Back /></el-icon>
                            </span>
                    {{currentSlidePage}} / {{attraction?.attractionImageList?.length}}
                    <span class="swiper-button-next detail-icon right-detail-icon" ref="swiperButtonNext">
                                  <el-icon><Right /></el-icon>
                            </span>
                </div>
            </div>
        </template>
        <swiper-slide v-for="item in attraction.attractionImageList" :key="item.attractionId">
            <div class="img-div" :style="{backgroundImage: `url(${item.imagePath})`}"></div>
        </swiper-slide>
    </swiper>
</template>

<style scoped lang="scss">
.swiper {
  @apply h-5/6 mt-10;
  .swiper-slide {
    @apply flex items-end;
    &.swiper-slide-next {
      .img-div {
        @apply w-2/3 grayscale;
      }
    }
    .img-div {
      @apply ml-10 w-full aspect-video rounded-md bg-center bg-fixed duration-300 grayscale-0;
    }
  }
  .container-start {
    @apply flex justify-between items-center;
    .attraction-title {
      @apply text-3xl pl-10 text-white font-semibold mb-2;
    }
    .page-tip {
      @apply flex mr-10 gap-2 text-white font-semibold;
      .detail-icon {
        @apply flex items-center p-1 bg-success rounded-md cursor-pointer overflow-hidden;
        &.left-detail-icon:hover i {
          animation: -left-leave-right-enter 0.5s ease;
        }
        &.right-detail-icon:hover i {
          animation: -right-leave-left-enter 0.5s ease;
        }
      }
    }
  }
}
</style>
