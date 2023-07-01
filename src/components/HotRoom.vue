<script setup lang="ts">

import BaseTitle from "@/components/base/Title.vue";
import type {HotRoomType} from "@/types";
defineProps<{
    hotRoomTypeList: HotRoomType[]
}>()
</script>

<template>
    <div class="hot-room" v-for="(item,index) in hotRoomTypeList" :key="item.home?.homeId_zch_hwz_gjc" :style="index%2?`direction: rtl`:''">
        <base-title class="after:bg-success">{{item.home.homeName_zch_hwz_gjc}}</base-title>
        <div class="hot-room-main">
            <div class="main-left">
                <div class="main-text" style="direction: ltr">
                    <p class="sup">评分: {{item.home?.homeState_zch_hwz_gjc}}</p>
                    <p>{{item.homeInformation?.homeStructure_zch_hwz_gjc}}</p>
                    <p class="sup"><el-icon><Location /></el-icon>{{item.home?.homeAddress_zch_hwz_gjc}}</p>
                    <div class="show-detail">
                        <span>查看详情</span>
                        <span class="detail-icon">
                              <el-icon><Right /></el-icon>
                        </span>
                    </div>
                </div>
                <div v-motion-fade-visible :style="{ backgroundImage: `url(${item.homeImageList.at(0).imagePath_zch_hwz_gjc})` }" class="hot-room-main-image w-full h-3/5 " v-if="item.homeImageList?.at(0)"></div>
            </div>
            <div class="main-right">
                <div v-motion-fade-visible :style="{ backgroundImage: `url(${item.homeImageList.at(1).imagePath_zch_hwz_gjc})` }" class="hot-room-main-image flex-3" v-if="item.homeImageList?.at(1)"></div>
                <div class="flex-1 gap-2 grid grid-cols-3">
                    <div v-motion-fade-visible :style="{ backgroundImage: `url(${item.homeImageList.at(2).imagePath_zch_hwz_gjc})` }" class="hot-room-main-image" v-if="item.homeImageList?.at(2)"></div>
                    <div v-motion-fade-visible :style="{ backgroundImage: `url(${item.homeImageList.at(3).imagePath_zch_hwz_gjc})` }" class="hot-room-main-image" v-if="item.homeImageList?.at(3)"></div>
                    <div v-motion-fade-visible :style="{ backgroundImage: `url(${item.homeImageList.at(4).imagePath_zch_hwz_gjc})` }" class="hot-room-main-image" v-if="item.homeImageList?.at(4)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hot-room{
    @apply px-2 sm:px-6 lg:px-8 py-20 h-screen;
    .hot-room-main{
        @apply flex gap-4 h-full;
        @apply flex-col sm:flex-row;
        .hot-room-main-image {
            @apply rounded-md bg-center transition-all duration-500;
            &:hover {
                @apply shadow-xl;
            }
        }
        .main-left {
            @apply flex flex-col items-start gap-4 flex-1;
            .main-text {
                @apply flex flex-col gap-2;
                .show-detail {
                    @apply self-end flex items-center gap-2 cursor-pointer;
                    &:hover .detail-icon i {
                        animation: -right-leave-left-enter 0.5s ease;
                    }
                    .detail-icon {
                        @apply flex items-center p-1 bg-success rounded-md text-white;
                    }
                }
                .sup {
                    @apply text-xs text-gray-400;
                }
            }
        }
        .main-right {
            @apply flex flex-col gap-4;
            flex: 1.5;
        }

    }
}
</style>