import service from "@/utils/service";
import type {Balance} from "@/types";

const url = `/balance`

export function getBalance(id:number) {
    return service({
        method: 'get',
        url: `${url}/${id}`
    })
}

export function addBalance(data:Partial<Balance>) {
    localStorage.setItem('execute', '新增用户钱包')
    return service({
        method: 'post',
        url,
        data
    })
}

export function updateBalance(data: {userId: number, userBalance: number}) {
    localStorage.setItem('execute', '余额变动')
    return service({
        method: 'put',
        url,
        data
    })
}
