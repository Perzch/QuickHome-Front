import service from "@/utils/service";
import api from "@/request/api";
import type {HotAttraction, HotRoomType, ResponseData, User} from "@/types";

/**
 * 热门房型
 */
export const getHotRoomType = async () => await service.get<ResponseData<HotRoomType[]>>(api.HotRoomType)
/**
 * 获取热门景点
 */
export const getHotAttraction = async () => await service.get<ResponseData<HotAttraction[]>>(api.HotAttraction))
/**
 * 获取验证码
 * @param str 手机号或邮箱
 * @param type 类型
 */
export const getCaptcha = async (str: string,type: 'phoneNumber'|'email'|string) => {
    const url = type === 'phoneNumber'?api.SMS:api.Mail
    return await service.post<ResponseData<string>>(url, {params: { [type]: str }})
}
/**
 * 登录
 * @param { User } user 用户信息
 */
export const login = async (user:User) => await service.post<ResponseData<{ token:string,userId:bigint }>>(api.Login,user)