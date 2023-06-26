<script lang='ts' setup>
import HeaderNav from '@/components/HeaderNav.vue'
import {onMounted, ref} from 'vue';
import type {HotRoomType} from '@/types'
import {getHotRoomType} from "@/request";
import BaseTitle from "@/components/base/Title.vue";
const hotRoomType = ref(<HotRoomType[]>[
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
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720"
            },
            {
                "imageId_zch_hwz_gjc": 8953383378523654000,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720",
                "homeId_zch_hwz_gjc": 4872638556580364000,
                "inDateTime_zch_hwz_gjc": "1972-10-16 20:18:47"
            },
            {
                "homeId_zch_hwz_gjc": 1711574960832028700,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720",
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
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720"
            },
            {
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720",
                "inDateTime_zch_hwz_gjc": "2003-04-22 09:39:10",
                "homeId_zch_hwz_gjc": 2279999269984694300,
                "imageId_zch_hwz_gjc": 381838442468610050
            },
            {
                "imageId_zch_hwz_gjc": 4350196181007585300,
                "imagePath_zch_hwz_gjc": "https://picsum.photos/1080/720",
                "homeId_zch_hwz_gjc": -1506010287494074400,
                "inDateTime_zch_hwz_gjc": "1992-01-23 13:49:42"
            }
        ],
        "collectionCount": 5727382511125006
    }
])
// getHotRoomType().then(res => {
//     //TODO: 需要增加code判断
//     hotRoomType.value = res.data
// })
</script>
<template>
    <div class="wrap">
        <HeaderNav></HeaderNav>
        <div class="hot-room" v-motion-slide-visible-bottom v-for="(item,index) in hotRoomType" :key="item.home?.homeId_zch_hwz_gjc" :style="index%2?`direction: rtl`:''">
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
                    <div  v-prlx.background="{ speed: 0.07 }" :style="{ backgroundImage: `url(${item.homeImageList.at(0).imagePath_zch_hwz_gjc})` }" class="w-full h-3/5 rounded-md bg-center" v-if="item.homeImageList?.at(0)"></div>
                </div>
                <div class="main-right">
                    <div v-prlx :style="{ backgroundImage: `url(${item.homeImageList.at(1).imagePath_zch_hwz_gjc})` }" class="flex-3 rounded-md bg-center" v-if="item.homeImageList?.at(1)"></div>
                    <div  v-prlx.background="{
  direction: 'x',
  speed: 0.07,
  fromBottom: true
}" :style="{ backgroundImage: `url(${item.homeImageList.at(2).imagePath_zch_hwz_gjc})` }" class="flex-1 w-2/5 rounded-md bg-center" v-if="item.homeImageList?.at(2)"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.hot-room{
  @apply p-20 h-screen bg-info;
  .hot-room-main{
    @apply flex gap-4 h-full;
    @apply flex-col sm:flex-row;
    img {
      @apply rounded-lg shadow-md;
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