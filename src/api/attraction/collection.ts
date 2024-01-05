import service from "@/utils/service";
import type {AttractionCollection, Page, PageResult, QueryParams, ResponseData} from "@/types";

const url = `/attraction/collection`

export function listCollection(params: {userId: number} & QueryParams): PageResult<AttractionCollection> {
    return service({
        method: 'get',
        url: `${url}/list`,
        params
    })
}

export function addCollection(data) {
    localStorage.setItem('execute', '收藏景点')
    return service({
        method: 'post',
        url,
        data
    })
}

export function delCollection(data) {
    localStorage.setItem('execute', '取消收藏景点')
    return service({
        method: 'delete',
        url,
        data
    })
}

export function checkCollection(params) {
    return service({
        method: 'get',
        url: `${url}/check`,
        params
    })
}
