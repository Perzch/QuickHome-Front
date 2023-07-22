<script lang='ts' setup>
import HeaderNav from '@/components/HeaderNav.vue'
import {markRaw, reactive, ref} from 'vue';
import type {HotAttraction, HotRoomType} from '@/types'
import {getHotAttraction, getHotRoomType} from "@/request";
import HotRoom from "@/components/HotRoom.vue";
import {useElementSize, useTitle} from "@vueuse/core";
import SearchBar from "@/components/SearchBar.vue";
import AttractionSwiper from "@/components/AttractionSwiper.vue";
const hotRoomTypeList = ref(<HotRoomType[]>[
    {
        "homeId_zch_hwz_gjc": 510000198906072500,
        "home": {
            "homeId_zch_hwz_gjc": 620000200205056400,
            "homeName_zch_hwz_gjc": "奥迪塞姆列特",
            "homeType_zch_hwz_gjc": "表",
            "homeDayRent_zch_hwz_gjc": 99,
            "homeState_zch_hwz_gjc": 92,
            "homeAddress_zch_hwz_gjc": "ad sit Ut do adipisicing"
        },
        "homeInformation": {
            "homeInfId_zch_hwz_gjc": 38,
            "homeArea_zch_hwz_gjc": 91,
            "homeDeposit_zch_hwz_gjc": 82,
            "maxPerson_zch_hwz_gjc": -1709467041,
            "homeInDate_zch_hwz_gjc": "aliquip magna cillum ipsum",
            "homeStructure_zch_hwz_gjc": "许多房间都有阳台，召唤您呼吸岛上纯净的地中海空气。所有客房均配有空调以及带淋浴的典雅套间浴室。",
            "homeId_zch_hwz_gjc": 8927396520192600000
        },
        "homeDeviceList": [
            {
                "deviceID_zch_hwz_gjc": 620000197801092600,
                "homeId_zch_hwz_gjc": 520000200504113540,
                "deviceName_zch_hwz_gjc": "问",
                "deviceType_zch_hwz_gjc": "少",
                "deviceProperties_zch_hwz_gjc": "难",
                "brand_zch_hwz_gjc": "了",
                "price_zch_hwz_gjc": 24
            }
        ],
        "homeImageList": [
            {
                "inDateTime_zch_hwz_gjc": "1979-07-02 14:38:38",
                "imageId_zch_hwz_gjc": 2190277603503736800,
                "homeId_zch_hwz_gjc": 5013260273867817000,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=1"
            },
            {
                "imageId_zch_hwz_gjc": 8953383378523654000,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=2",
                "homeId_zch_hwz_gjc": 4872638556580364000,
                "inDateTime_zch_hwz_gjc": "1972-10-16 20:18:47"
            },
            {
                "homeId_zch_hwz_gjc": 1711574960832028700,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=3",
                "imageId_zch_hwz_gjc": 4889570064905232000,
                "inDateTime_zch_hwz_gjc": "2010-03-17 02:18:53"
            }
        ],
        "collectionCount": 5700807620226970
    },
    {
        "homeId_zch_hwz_gjc": 450000200406086140,
        "home": {
            "homeId_zch_hwz_gjc": 220000201702118720,
            "homeName_zch_hwz_gjc": "株洲大汉希尔顿",
            "homeType_zch_hwz_gjc": "比",
            "homeDayRent_zch_hwz_gjc": 99,
            "homeState_zch_hwz_gjc": 88,
            "homeAddress_zch_hwz_gjc": "ullamco dolor voluptate deserunt"
        },
        "homeInformation": {
            "homeInfId_zch_hwz_gjc": 55,
            "homeStructure_zch_hwz_gjc": "鸟瞰湘江美景，紧邻城市中心，株洲大汉希尔顿酒店拥有时尚舒适的客房和先进完善的设备；多样的餐厅与酒吧为您提供丰富的餐饮选择；酒店拥有全方位选择的娱乐休闲设施与会议活动场地，是商务出行或休闲之旅的理想之所。",
            "homeArea_zch_hwz_gjc": 69,
            "homeDeposit_zch_hwz_gjc": 40,
            "maxPerson_zch_hwz_gjc": 421364388,
            "homeInDate_zch_hwz_gjc": "ex cillum culpa Ut elit",
            "homeId_zch_hwz_gjc": 4050225363962562600
        },
        "homeDeviceList": [
            {
                "deviceID_zch_hwz_gjc": 320000201811265700,
                "homeId_zch_hwz_gjc": 32000020110826090,
                "deviceName_zch_hwz_gjc": "则",
                "deviceType_zch_hwz_gjc": "取",
                "deviceProperties_zch_hwz_gjc": "时",
                "brand_zch_hwz_gjc": "新",
                "price_zch_hwz_gjc": 60
            }
        ],
        "homeImageList": [
            {
                "inDateTime_zch_hwz_gjc": "2019-01-29 07:26:55",
                "imageId_zch_hwz_gjc": 1417817844842836000,
                "homeId_zch_hwz_gjc": -152406190203809800,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=4"
            },
            {
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=5",
                "inDateTime_zch_hwz_gjc": "2003-04-22 09:39:10",
                "homeId_zch_hwz_gjc": 2279999269984694300,
                "imageId_zch_hwz_gjc": 381838442468610050
            },
            {
                "imageId_zch_hwz_gjc": 4350196181007585300,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720?q=6",
                "homeId_zch_hwz_gjc": -1506010287494074400,
                "inDateTime_zch_hwz_gjc": "1992-01-23 13:49:42"
            }
        ],
        "collectionCount": 5727382511125006
    }
])
const attraction = ref(<HotAttraction>{
    "attractionsId_zch_hwz_gjc": 3,
    "attractionImageList": [
        {
            "imageId_zch_hwz_gjc": 1,
            "attractionId_zch_hwz_gjc": 3,
            "imagePath_zch_hwz_gjc": "https://picsum.photos/1280/1080?q=7",
            "inDateTime_zch_hwz_gjc": "2023-06-24T12:07:25.000+00:00",
            "standby1_zch_hwz_gjc": null,
            "standby2_zch_hwz_gjc": null,
            "standby3_zch_hwz_gjc": null,
            "deleted_zch_hwz_gjc": 0
        },
        {
            "imageId_zch_hwz_gjc": 1,
            "attractionId_zch_hwz_gjc": 3,
            "imagePath_zch_hwz_gjc": "https://picsum.photos/1280/1080?q=8",
            "inDateTime_zch_hwz_gjc": "2023-06-24T12:07:25.000+00:00",
            "standby1_zch_hwz_gjc": null,
            "standby2_zch_hwz_gjc": null,
            "standby3_zch_hwz_gjc": null,
            "deleted_zch_hwz_gjc": 0
        },
        {
            "imageId_zch_hwz_gjc": 1,
            "attractionId_zch_hwz_gjc": 3,
            "imagePath_zch_hwz_gjc": "https://picsum.photos/1280/1080?q=9",
            "inDateTime_zch_hwz_gjc": "2023-06-24T12:07:25.000+00:00",
            "standby1_zch_hwz_gjc": null,
            "standby2_zch_hwz_gjc": null,
            "standby3_zch_hwz_gjc": null,
            "deleted_zch_hwz_gjc": 0
        }
    ],
    "attractions": {
        "attractionsId_zch_hwz_gjc": 3,
        "attractionsName_zch_hwz_gjc": "橘子洲头",
        "attractionInformation_zch_hwz_gjc": "333",
        "openingTime_zch_hwz_gjc": "2023-06-08T10:40:16.000+00:00",
        "closingTime_zch_hwz_gjc": "2023-06-16T10:40:22.000+00:00",
        "attractionInDate_zch_hwz_gjc": "2023-06-01T10:40:25.000+00:00",
        "standby1_zch_hwz_gjc": null,
        "standby2_zch_hwz_gjc": null,
        "standby3_zch_hwz_gjc": null,
        "deleted_zch_hwz_gjc": 0
    },
    "collectionCount": 2
})
const hotAttractionBox = ref(<Element>null)
const { width } = useElementSize(hotAttractionBox)
useTitle("首页 / QuickHome")
Promise.all([getHotRoomType(),getHotAttraction()]).then(values => {
    //TODO:补全
    console.log(values)
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
                <el-button type="primary" size="large" class="hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">预订房间</el-button>
                <router-link to="/aboutus" class="hero-about">关于我们 <span aria-hidden="true">→</span></router-link>
            </div>
        </div>
        <hot-room :hotRoomTypeList="hotRoomTypeList" />
        <div class="hot-attraction" ref="hotAttractionBox">
            <attraction-swiper :attraction="attraction" :width="Number(width / 1.2 - 100)"/>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.wrap {
    scroll-snap-type: y mandatory ;
    height: 100dvh;
    overflow-y: scroll;
    & > :deep(*) {
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
}
</style>