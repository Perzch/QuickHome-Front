import {defineStore} from "pinia";
import {ref} from "vue";
import dayjs from "dayjs";
import {useRouter} from "vue-router";
type SearchInfo = {
    homeType?: string,
    minPrice: number,
    maxPrice: number,
    device?: string[],
    address: string,
    beginDate: string,
    endDate: string,
    roomCount: 1,
    personCount: 1,
}
export const useGlobalizationStore = defineStore('globalization',() => {
    const {push} = useRouter()
    const searchInfo = ref(<SearchInfo>{})
    const disabledCheckoutDate = (time:string) => {
        //当填了入住日期时，禁用入住日期之前的日期
        if(searchInfo.value?.beginDate) return dayjs(time).isBefore(dayjs(searchInfo.value?.beginDate))
        else return dayjs(time).isBefore(dayjs(),"D")
    }
    const disabledCheckinDate = (time:string) => {
        if(searchInfo.value?.endDate) return dayjs(time).isAfter(dayjs(searchInfo.value?.endDate))
        else return dayjs(time).isBefore(dayjs(),"D")
    }
    const validateCheckinDate = () => {
        if(searchInfo.value?.beginDate && searchInfo.value?.endDate) {
            if(dayjs(searchInfo.value?.endDate).isBefore(dayjs(searchInfo.value?.beginDate))) {
                // @ts-ignore
                ElMessage.warning("入住日期必须大于等于当前日期");
                searchInfo.value.beginDate = ''
            }
        }
    }

    const search = async () => {
        if(searchInfo.value.beginDate && searchInfo.value.endDate) {
            await push({
                path: '/search',
                query: searchInfo.value
            })
        } else {
            // @ts-ignore
            ElMessage.warning('请选择入住日期和退房日期');
        }
    }
    const validateCheckoutDate = () => {
        if(searchInfo.value?.beginDate && searchInfo.value?.endDate) {
            if(dayjs(searchInfo.value?.endDate).isBefore(dayjs(searchInfo.value?.beginDate))) {
                // @ts-ignore
                ElMessage.warning('退房日期必须大于等于当前日期');
                searchInfo.value.endDate = ''
            }
        }
    }
    return {
        searchInfo,
        search,
        validateCheckinDate,
        validateCheckoutDate,
        disabledCheckoutDate,
        disabledCheckinDate
    }
})