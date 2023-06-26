import service from "@/utils/service";
import api from "@/request/api";
import type {HotRoomType, ResponseData} from "@/types";

export const getHotRoomType = async () => (await service.get<ResponseData<HotRoomType[]>>(api.HotRoomType)).data // 热门房型

export const getHotAttraction = () => service.get(api.HotAttraction) // 热门景点