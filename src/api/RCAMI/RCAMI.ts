import service from "@/utils/service";

const url = `/RCAMI`

export function addRCAMI(data) {
    localStorage.setItem('execute', '新增维修')
    return service({
        method: 'post',
        url,
        data
    })
}

export function finishRCAMI(data) {
    localStorage.setItem('execute', '维修完成')
    return service({
        method: 'put',
        url: `${url}/finish`,
        data
    })
}

export function listRCAMI(params) {
    return service({
        method: 'get',
        url: `${url}/list`,
        params
    })
}
