export interface ResponseData<T> {
    code: number;
    msg: number;
    data: T;
}

export interface User {
    userPhone: string;
    userPwd: string;
    captcha?: string;
    repeatPassword?: string;
}

/**
 * HotRoomType
 */
export interface HotRoomType {
    homeId_zch_hwz_gjc: number;//房屋id
    collectionCount: number;//收藏数
    home: Home;//房屋信息
    homeInformation: HomeInformation;//房屋详细信息
    homeDeviceList: HomeDevice[];//房屋设备列表
    homeImageList: HomeImage[];//房屋图片列表
}

/**
 * Home
 */
export interface Home {
    homeAddress_zch_hwz_gjc: string;//房屋地址
    homeDayRent_zch_hwz_gjc: number;//房屋日租金
    homeId_zch_hwz_gjc: number;//房屋id
    homeName_zch_hwz_gjc: string;//房屋名称
    homeState_zch_hwz_gjc: number;//房屋状态
    homeType_zch_hwz_gjc: string;//房屋类型
}

/**
 * HomeDevice
 */
export interface HomeDevice {
    brand_zch_hwz_gjc: string;//品牌
    deviceID_zch_hwz_gjc: number;//设备id
    deviceName_zch_hwz_gjc: string;//设备名称
    deviceProperties_zch_hwz_gjc: string;//设备属性
    deviceType_zch_hwz_gjc: string;//设备类型
    homeId_zch_hwz_gjc: number;//房屋id
    price_zch_hwz_gjc: number;//价格
}

/**
 * HomeImage
 */
export interface HomeImage {
    homeId_zch_hwz_gjc?: number;//房屋id
    imageId_zch_hwz_gjc?: number;//图片id
    imagePath_zch_hwz_gjc?: string;//图片路径
    inDateTime_zch_hwz_gjc?: Date;//上传时间
}

/**
 * HomeInformation
 */
export interface HomeInformation {
    homeArea_zch_hwz_gjc?: number; //房屋面积
    homeDeposit_zch_hwz_gjc?: number; //房屋押金
    homeId_zch_hwz_gjc?: number; //房屋id
    homeInDate_zch_hwz_gjc?: Date; //入住时间
    homeInfId_zch_hwz_gjc: number; //房屋详细信息id
    homeStructure_zch_hwz_gjc?: string; //房屋结构
    maxPerson_zch_hwz_gjc?: number;//最大入住人数
}
export interface HotAttraction {
    attractionImageList: AttractionImage[];
    attractions: Attractions;
    attractionsId_zch_hwz_gjc: number;
    collectionCount: number;
}
/**
 * AttractionImage
 */
export interface AttractionImage {
    /**
     * 景点编号
     */
    attractionId_zch_hwz_gjc?: number;
    /**
     * 图片编号
     */
    imageId_zch_hwz_gjc: number;
    /**
     * 图片路径
     */
    imagePath_zch_hwz_gjc?: string;
    /**
     * 上传时间
     */
    inDateTime_zch_hwz_gjc?: Date;
}

/**
 * Attractions
 */
export interface Attractions {
    attractionInDate_zch_hwz_gjc?: Date;//景点记录时间
    attractionInformation_zch_hwz_gjc?: string;//景点信息
    attractionsId_zch_hwz_gjc?: number;//景点编号
    attractionsName_zch_hwz_gjc?: string;//景点名称
    closingTime_zch_hwz_gjc?: Date; // 景点关闭时间
    openingTime_zch_hwz_gjc?: Date; // 景点开放时间
}
