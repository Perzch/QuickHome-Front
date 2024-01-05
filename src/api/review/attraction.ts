import service from "@/utils/service";

const url = `/review/attraction`

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
    localStorage.setItem('execute', '评论景点')
    return service({
        method: 'post',
        url,
        data
    })
}

export function likeReview(attractionReviewId) {
    localStorage.setItem('execute', '点赞景点评论')
    return service({
        method: 'put',
        url: url + '/like',
        params: { attractionReviewId }
    })
}

export function deleteReview(attractionReviewId) {
    localStorage.setItem('execute', '删除景点评论')
    return service({
        method: 'delete',
        url: `${url}/${attractionReviewId}`
    })
}
