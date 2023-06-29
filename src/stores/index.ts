import {defineStore} from "pinia";
import {ref} from "vue";
import dayjs from "dayjs";
import {useRouter} from "vue-router";
type SearchInfo = {
    checkinDate: string,
    checkoutDate: string,
    roomCount: number,
    personCount: number,
}
export const useGlobalizationStore = defineStore('globalization',() => {
    const {push} = useRouter()
    const searchInfo = ref(<SearchInfo>{
        roomCount:1,
        personCount:1
    })
    const disabledCheckoutDate = (time:string) => {
        //当填了入住日期时，禁用入住日期之前的日期
        if(searchInfo.value?.checkinDate) return dayjs(time).isBefore(dayjs(searchInfo.value?.checkinDate))
        else return dayjs(time).isBefore(dayjs(),"D")
    }
    const disabledCheckinDate = (time:string) => {
        if(searchInfo.value?.checkoutDate) return dayjs(time).isAfter(dayjs(searchInfo.value?.checkoutDate))
        else return dayjs(time).isBefore(dayjs(),"D")
    }
    const validateCheckinDate = () => {
        if(searchInfo.value?.checkinDate && searchInfo.value?.checkoutDate) {
            if(dayjs(searchInfo.value?.checkoutDate).isBefore(dayjs(searchInfo.value?.checkinDate))) {
                // @ts-ignore
                ElMessage.warning("入住日期必须大于等于当前日期");
                searchInfo.value.checkinDate = ''
            }
        }
    }

    const search = async () => {
        await push({
            path: '/search',
            query: {
                checkinDate: searchInfo.value.checkinDate,
                checkoutDate: searchInfo.value.checkoutDate,
                roomCount: searchInfo.value.roomCount,
                personCount: searchInfo.value.personCount
            }
        })
    }
    const validateCheckoutDate = () => {
        if(searchInfo.value?.checkinDate && searchInfo.value?.checkoutDate) {
            if(dayjs(searchInfo.value?.checkoutDate).isBefore(dayjs(searchInfo.value?.checkinDate))) {
                // @ts-ignore
                ElMessage.warning('退房日期必须大于等于当前日期');
                searchInfo.value.checkoutDate = ''
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