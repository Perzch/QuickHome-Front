import service from "@/utils/service";
import type {HomeCollection, Page, PageResult, QueryParams, ResponseData} from "@/types";
const url = `/home/collection`

export function listCollection(params: { userId: number} & QueryParams):PageResult<HomeCollection> {
    return service({
        url: `${url}/list`,
        method: 'get',
        params
    })
}

export function addCollection(data) {
    localStorage.setItem('execute', '收藏房屋')
    return service({
        url,
        method: 'post',
        data
    })
}

export function delCollection(data) {
    localStorage.setItem('execute', '取消收藏房屋')
    return service({
        url,
        method: 'delete',
        data
    })
}

export function checkCollection(params: { userId: number, homeId: number }) {
    return service({
        url: `${url}/check`,
        method: 'get',
        params
    })
}
