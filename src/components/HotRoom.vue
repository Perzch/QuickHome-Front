<script setup lang="ts">
import type { HotRoomType } from "@/types";
defineProps<{
  hotRoomTypeList: Array<HotRoomType>
}>()
</script>

<template>
  <div class="hot-room" v-for="(item, index) in hotRoomTypeList" :key="item.home?.homeId"
    :style="index % 2 ? `direction: rtl` : ''">
    <base-title class="after:bg-success">{{ item.home.homeName }}</base-title>
    <div class="hot-room-main">
      <div class="main-left">
        <div class="main-text" style="direction: ltr">
          <p class="sup">状态: {{ item.home?.homeState }}</p>
          <p>{{ item.homeInformation?.homeStructure }}</p>
          <p class="sup">
            <el-icon>
              <Location />
            </el-icon>{{ item.home?.homeAddress }}
          </p>
          <div class="show-detail">
            <span>查看详情</span>
            <span class="detail-icon">
              <el-icon>
                <Right />
              </el-icon>
            </span>
          </div>
        </div>
        <div v-if="item.homeImageList[0]" v-motion-fade-visible-once
          :style="{ backgroundImage: `url(${item.homeImageList[0].imagePath})` }" class="hot-room-main-image w-full">
        </div>
      </div>
      <div class="main-right">
        <div v-motion-fade-visible-once :style="{ backgroundImage: `url(${item.homeImageList[1].imagePath})` }"
          class="hot-room-main-image flex-3" v-if="item.homeImageList[1]"></div>
        <div class="flex-1 gap-2 grid grid-cols-3">
          <div v-motion-fade-visible-once :style="{ backgroundImage: `url(${item.homeImageList[2].imagePath})` }"
            class="hot-room-main-image" v-if="item.homeImageList[2]"></div>
          <div v-motion-fade-visible-once :style="{ backgroundImage: `url(${item.homeImageList[3].imagePath})` }"
            class="hot-room-main-image" v-if="item.homeImageList[3]"></div>
          <div v-motion-fade-visible-once :style="{ backgroundImage: `url(${item.homeImageList[4].imagePath})` }"
            class="hot-room-main-image" v-if="item.homeImageList[4]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot-room {
  @apply px-2 sm:px-6 lg:px-8 py-20 h-screen;

  .hot-room-main {
    @apply flex gap-4 h-full;
    @apply flex-col sm:flex-row;

    .hot-room-main-image {
      @apply rounded-md bg-center bg-fixed transition-all duration-500 aspect-video;

      &:hover {
        @apply shadow-xl;
      }
    }

    .main-left {
      @apply flex flex-col items-start gap-4 flex-1;

      .main-text {
        @apply flex flex-col gap-2;

        .show-detail {
          @apply self-end flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md;

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

        .sup {
          @apply w-fit text-xs text-gray-400 hover:text-gray-800;
        }
      }
    }

    .main-right {
      @apply flex flex-col gap-4;
      flex: 1.5;
    }

  }
}</style>
