import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import type {HomeSearchInfo} from "@/types";
import dayjs from "dayjs";
import {now, useStorage} from "@vueuse/core";
import {useRouter} from "vue-router";
import {listHome} from "@/api/home/home";

export const useSearchStore = defineStore('search', () => {
    const {push} = useRouter()
    const searchInfo = useStorage<HomeSearchInfo>('searchInfo', {
        beginDate: dayjs(now()).format('YYYY-MM-DD'),
        endDate: dayjs(now()).add(1,'day').format('YYYY-MM-DD'),
        minRent: 50,
        personCount: 1,
        roomCount: 1,
        maxPeople: 1,
        page: 1,
        size: 10
    })
    /**
     * @function search
     * @description This function performs a search operation.
     */
    const toSearch = () => {
        if(searchInfo.value.beginDate && searchInfo.value.endDate) {
            if(searchInfo.value.roomCount && searchInfo.value.personCount) {
                searchInfo.value.maxPeople = Math.ceil(searchInfo.value.personCount / searchInfo.value.roomCount)
            }
            push({
                path: '/search',
                query: searchInfo.value as any
            })
        } else {
            ElMessage.warning('请选择入住日期和退房日期');
        }
    }
    return {
        searchInfo,
        toSearch,
    }
})
