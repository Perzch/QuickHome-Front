import service from "@/utils/service";
import type {Order, OrderRequestData, PageResult, QueryParams, Result} from "@/types";

const url = `/order`

export function addOrder(data:OrderRequestData):Result<Order> {
    localStorage.setItem('execute', '新增订单')
    return service({
        method: 'post',
        url,
        data
    })
}

export function payOrder(data){
    localStorage.setItem('execute', '支付订单')
    return service({
        method: 'post',
        url: `${url}/pay`,
        data
    })
}

export function checkOut(orderId) {
    localStorage.setItem('execute', '退房')
    return service({
        method: 'post',
        url: `${url}/checkOut`,
        params: { orderId }
    })
}

export function endOrder(data) {
    localStorage.setItem('execute', '结束订单')
    return service({
        method: 'post',
        url: `${url}/endOrder`,
        data
    })
}

export function listOrder(params: {userId:number} & QueryParams):PageResult<Order> {
    return service({
        method: 'get',
        url: `${url}/list`,
        params
    })
}

export function getOrder(id:number) {
    return service({
        method: 'get',
        url: `${url}/${id}`
    })
}

export function listOrderByHome(params) {
    return service({
        method: 'get',
        url: `${url}/home/list`,
        params
    })
}

export function updateOrder(data) {
    localStorage.setItem('execute', '修改订单信息')
    return service({
        method: 'put',
        url: `${url}`,
        data
    })
}

export function deleteOrder(id) {
    localStorage.setItem('execute', '删除订单')
    return service({
        method: 'delete',
        url: `${url}/${id}`
    })
}

export function endOrderRefund(orderId:number) {
    localStorage.setItem('execute', '结束订单退款')
    return service({
        method: 'post',
        url: `${url}/endOrderRefund`,
        params: { orderId }
    })
}

export function scheduleCancellation(orderId) {
    localStorage.setItem('execute', '预定取消')
    return service({
        method: 'post',
        url: `${url}/scheduleCancellation`,
        params: { orderId }
    })
}

export function getDynamicPassword(orderId:number):Result<string> {
    return service({
        method: 'get',
        url: `${url}/password/${orderId}`
    })
}
