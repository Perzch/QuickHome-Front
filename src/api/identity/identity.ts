import service from "@/utils/service";
import type {Identity, PageResult} from "@/types";

const url = `/identity`

export function listIdentity(params):PageResult<Identity> {
    return service({
        method: 'get',
        url: url + '/list',
        params
    })
}

export function addIdentity(data){
    localStorage.setItem('execute', '新增实名信息')
    return service({
        method: 'post',
        url,
        data
    })
}

export function updateIdentity(data){
    localStorage.setItem('execute', '修改实名信息')
    return service({
        method: 'put',
        url,
        data
    })
}

export function deleteIdentity(data){
    localStorage.setItem('execute', '删除实名信息')
    return service({
        method: 'delete',
        url,
        data
    })
}

export function getIdentityByOrder(id) {
    return service({
        method: 'get',
        url: `${url}/order/${id}`
    })
}
