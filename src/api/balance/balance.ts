import service from "@/utils/service";

const url = `/balance`

export function getBalance(id) {
    return service({
        method: 'get',
        url: `${url}/${id}`
    })
}

export function addBalance(data) {
    localStorage.setItem('execute', '新增用户钱包')
    return service({
        method: 'post',
        url,
        data
    })
}

export function updateBalance(data) {
    localStorage.setItem('execute', '余额变动')
    return service({
        method: 'put',
        url,
        data
    })
}
