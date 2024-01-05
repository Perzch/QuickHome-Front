import service from "@/utils/service";

const url = `/review/home`

export function listReview(params) {
    return service({
        method: 'get',
        url,
        params
    })
}

export function getReview(id) {
    return service({
        method: 'get',
        url: `${url}/${id}`
    })
}

export function addReview(data) {
    localStorage.setItem('execute', '评论房屋')
    return service({
        method: 'post',
        url,
        data
    })
}

export function likeReview(housingReviewId) {
    localStorage.setItem('execute', '点赞房屋评论')
    return service({
        method: 'put',
        url: url + '/like',
        params: { housingReviewId }
    })
}

export function deleteReview(housingReviewId) {
    localStorage.setItem('execute', '删除房屋评论')
    return service({
        method: 'delete',
        url: `${url}/${housingReviewId}`
    })
}
