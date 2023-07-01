import service from "@/utils/service";
import api from "@/request/api";
import type {HotAttraction, HotRoomType, ResponseData} from "@/types";

export const getHotRoomType = async () => (await service.get<ResponseData<HotRoomType[]>>(api.HotRoomType)).data // 热门房型
export const getHotAttraction = async () => (await service.get<ResponseData<HotAttraction[]>>(api.HotAttraction)).data // 热门景点
export const getCaptcha = async (phoneNumber: string) => (await service.post<ResponseData<string>>(api.CaptCha, {params: {phoneNumber}})).data // 获取验证码