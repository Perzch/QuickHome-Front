import service from '@/utils/service'
import type {UserInformation} from "@/types";

const url = `/user/info`

export function addUserInfo(data: UserInformation) {
    return service({
        method: 'post',
        url,
        data
    })
}
export function getUserInfo(userId:number) {
    return service({
        method: 'get',
        url,
        params: {
            userId
        }
    })
}

export function updateUserInfo(data: UserInformation) {
    return service({
        method: 'put',
        url,
        data
    })
}
