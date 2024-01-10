import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {getUserInfo as getUInfo} from "@/api/user/info";
import type {UserInfo} from "@/types";
import {computed, watch} from "vue";
import {useRouter} from "vue-router";
import {offline} from "@/api/manager/manager";


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
    const router = useRouter()
    const getUserInfo = async ():Promise<UserInfo | undefined> => {
        if(userId.value && token.value) {
            const {data} = await getUInfo(Number(userId.value))
            userInfo.value = data
            return Promise.resolve(data)
        }
    }
    const logout = async () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('token', '')
        localStorage.removeItem('searchInfo')
        localStorage.removeItem('userInfo')
        await router.push('/auth/1')
        router.go(0)
    }
    return {
        logout,
        userInfo,
        isLogin,
        getUserInfo,
        userId,
        token,
    }
})
