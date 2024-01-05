import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {HomeSearchInfo} from "@/types";
import dayjs from "dayjs";
import {now} from "@vueuse/core";
import {useRouter} from "vue-router";

export const useSearchStore = defineStore('search', () => {
    const {push} = useRouter()
    const searchInfo = ref<HomeSearchInfo>({
        beginDate: dayjs(now()).format('YYYY-MM-DD'),
        endDate: dayjs(now()).add(1,'day').format('YYYY-MM-DD'),
        minRent: 50,
        personCount: 1,
        roomCount: 1,
        maxPeople: computed(() => {
                return Math.ceil(searchInfo.value.personCount / searchInfo.value.roomCount)
        }),
        page: 1,
        size: 10
    })
    /**
     * @function search
     * @description This function performs a search operation.
     */
    const toSearch = () => {
        if(searchInfo.value.beginDate && searchInfo.value.endDate) {
            push({
                path: '/search',
                query: searchInfo.value
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
