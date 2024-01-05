import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {getUserInfo as getUInfo} from "@/api/user/info";
import type {UserInfo} from "@/types";
import {computed} from "vue";


/**
 * @function useGlobalStore
 * @description This function defines a store for globalization.
 * @returns {Object} The store object.
 */
export const useGlobalStore = defineStore('global',() => {
    const userId = useStorage('userId', '')
    const token = useStorage('token', '')
    const userInfo = useStorage<UserInfo>('userInfo', {} as UserInfo)
    const isLogin = computed(() => userId.value && token.value)
    const getUserInfo = async ():Promise<UserInfo | undefined> => {
        if(userId.value && token.value) {
            const {data} = await getUInfo(Number(userId.value))
            userInfo.value = data
            return data
        }
    }
    return {
        userInfo,
        isLogin,
        getUserInfo,
        userId,
        token,
    }
})
