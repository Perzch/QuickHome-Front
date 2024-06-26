import service from '@/utils/service'
import type {User, UserInfo} from "@/types";
const url = `/user`

export function registerByPhone(data) {
    return service({
        method: 'post',
        url,
        data
    })
}

export function login(data) {
    return service({
        method: 'post',
        url: url + '/login',
        data
    })
}

export function loginByPhone(params) {
    return service({
        method: 'post',
        url: url + '/login/phone',
        params
    })
}

export function setPassword(data) {
    localStorage.setItem('execute', '用户密码更改')
    return service({
        method: 'post',
        url: url + '/setPassword',
        data
    })
}

export function check(userAccount) {
    return service({
        method: 'get',
        url: url + '/check',
        params: {
            userAccount
        }
    })
}

export function checkByMailOrPhone(data) {
    return service({
        method: 'get',
        url: url + '/forget',
        data
    })
}

export function updateUser(data: User) {
    localStorage.setItem('execute', '修改用户信息')
    return service({
        method: 'put',
        url,
        data
    })
}

export function listUser(params) {
    return service({
        method: 'get',
        url: url + '/list',
        params
    })
}

export function deleteUser(id) {
    localStorage.setItem('execute', '删除用户')
    return service({
        method: 'delete',
        url: url + '/' + id,
    })
}

export function refreshToken(token) {
    return service({
        method: 'post',
        url: url + '/refreshToken',
        params: {
            token
        }
    })
}
