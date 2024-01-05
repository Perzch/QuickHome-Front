import service from "@/utils/service";

const url = `/payment`

export function setPayment(data){
    localStorage.setItem('execute', '设置支付密码')
    return service({
        method: 'post',
        url,
        data
    })
}

export function verifyPayment(data){
    return service({
        method: 'post',
        url: url + '/verify',
        data
    })
}

export function statusPayment(userId){
    return service({
        method: 'get',
        url: url + '/status',
        params: {userId}
    })
}
