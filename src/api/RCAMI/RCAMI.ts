import service from "@/utils/service";
import type {PageResult, QueryParams, RCAMI, RCAMIResult} from "@/types";

const url = `/RCAMI`

export function addRCAMI(data:Partial<RCAMI>) {
    localStorage.setItem('execute', '新增维修')
    return service({
        method: 'post',
        url,
        data
    })
}

export function finishRCAMI(data:Partial<RCAMI>) {
    localStorage.setItem('execute', '维修完成')
    return service({
        method: 'put',
        url: `${url}/finish`,
        data
    })
}

export function listRCAMI(params: {homeId:number,orderId: number} & QueryParams):PageResult<RCAMIResult> {
    return service({
        method: 'get',
        url: `${url}/list`,
        params
    })
}
