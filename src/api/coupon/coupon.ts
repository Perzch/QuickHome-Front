import service from "@/utils/service";
import type {Coupon, CouponResult, Page, PageResult, QueryParams, ResponseData, UserCoupon} from "@/types";

const url = `/coupon`


export function listCoupon(params: {userId:number} & QueryParams): PageResult<CouponResult> {
    return service({
        method: 'get',
        url: url + '/list',
        params
    })
}

export function addCoupon(data){
    localStorage.setItem('execute', '新增优惠券')
    return service({
        method: 'post',
        url,
        data
    })
}

export function updateCoupon(data){
    localStorage.setItem('execute', '修改优惠券')
    return service({
        method: 'put',
        url,
        data
    })
}

export function getCoupon(id) {
    return service({
        method: 'get',
        url: `${url}/${id}`
    })
}

export function releaseCoupon(data){
    localStorage.setItem('execute', '发放优惠券')
    return service({
        method: 'post',
        url: url + '/release',
        data
    })
}

export function useCoupon(UACID:number) {
    localStorage.setItem('execute', '使用优惠券')
    return service({
        method: 'put',
        url: url + '/use',
        params: {UACID}
    })
}

export function deleteCoupon(id) {
    localStorage.setItem('execute', '删除优惠券')
    return service({
        method: 'delete',
        url: `${url}/${id}`
    })
}

export function getLastUseTime(couponId) {
    return service({
        method: 'get',
        url: url + '/getLastUseTime',
        params: { couponId }
    })
}
