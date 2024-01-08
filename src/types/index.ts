export type ResponseData<T> = Promise<{
    code: number
    msg: number
    data: T
}>

export type QueryParams = {
    page?: number,
    size?: number
}

export type Page<T> = {
    countId: number | null
    current: number
    maxLimit: number | null
    optimizeCountSql: boolean
    orders: unknown[]
    pages: number
    records: T[]
    searchCount: boolean
    size: number
    total: number
}

export type PageResult<T> = Promise<ResponseData<Page<T>>>

export type Result<T> = Promise<ResponseData<T>>

export type HomeSearchInfo = {
    beginDate: string,
    endDate: string,
    homeType?: string,
    device?: string,
    roomCount?: number,
    minRent: number,
    maxRent?: number,
    address?: string,
    personCount?: number,
    maxPeople: number,
} & QueryParams

export type HomeSearchResult = {
    collectionCount: number,
    homeId: number,
    home: Home,
    homeDeviceList: HomeDevice[],
    homeInformation: HomeInformation
}

export interface User {
    userId?: bigint;
    userAccount?:string;
    userName?:string;
    userPwd?:string;
    userEmail?:string;
    userPhone?:string;
    userInDate?:Date;
    userHeadImage?: string;
    version?:string;
}

/**
 * UserInformation
 */
export type UserInformation = {
    idCardNumber?: string;
    idCardType?: string;
    UIId?: number;
    userBirthday?: Date;
    userGender?: string;
    userHeadId?: number;
    userId?: number;
    userSignature?: string;
}

/**
 * UserHeadImage
 */
export interface UserHeadImage {
    imagePath?: string;
    inDateTime?: Date;
    userId?: number;
    userImageId?: number;
}

export type UserInfo = {
    "token"?: string,
    "userId": number,
    "user": User
    "userInformation": UserInformation,
    "userHeadImage"?: UserHeadImage,
}

export interface UserVerify {
    userInput?: string;
    userAccount?: string;
    userEmail?: string;
    userPhone?: string;
    userPwd?: string;
    captcha?: string;
    repeatPassword?: string;
}
/**
 * Home
 */
export interface Home {
    homeAddress: string;//房屋地址
    homeDayRent: number;//房屋日租金
    homeImages: string;
    homeImageList: string[]
    homeId: number;//房屋id
    homeName: string;//房屋名称
    homeState: string;//房屋状态
    homeType: string;//房屋类型
}

export type HomeInformation = {
    homeInfId?: number
    homeId?: number
    homeArea?: number
    houseStructure?: string
    maxPerson?: number
    homeDeposit?: number
    homeInDate?: Date
}

export type HomeDevice={
    deviceID: number
    homeId: number
    deviceName: string
    deviceType: string
    brand: string
    price: number
}

export type HomeCollection = {
    hFavoriteRecordsId: number
    userId: number
    homeId: number
    home: Home
    collectionTime: Date
}

export type Attraction = {
    attractionId: number
    attractionName: string
    attractionInformation: string
    attractionImages: string
    attractionImageList: string[]
    openingTime: Date
    closingTime: Date
    attractionInDate: Date
}

export type AttractionCollection = {
    aFavoriteRecordsId: number
    userId: number
    attractionId: number
    attraction: Attraction
    collectionTime: Date
}

export type HotAttraction = {
    attractionId: number
    attraction: Attraction,
    attractionImageList: any[],
    collectionCount: number
}

export type Order = {
    orderId: number
    homeId: number
    dynamicDoorPassword: string
    creationTime: Date
    endTime: Date
    checkInTime: Date
    checkOutTime: Date
    orderPayment: number
    orderDeposit: number
    orderState: string
    userId: number
    home?: Home
}

export type UserTenant = {
    name: string
    phone: string
    cardIdNumber: string
}

export type OrderRequestData = {
    userTenantList: UserTenant[]
    checkInDate: string
    checkOutDate: string
    orderId: number
    homeId: number
    userId: number
    UACID: number
    maintenanceCost: number
}

export type RCAMI = {
    workItemId: number
    informationCreatTime: Date
    completionProcessTime: Date
    RCAMIInformation: string
    des: string
    workUserId: number
    completion: string
    publisherId: number
    orderId: number
    homeId: number
}

export type Balance = {
    bid: number,
    userId: number,
    userBalance: number,
    lastModifiedDate: Date,
    openTime: Date
}

export type HousingReview = {
    secondHousingInfo?: HousingReview;
    index?: number;
    like?: boolean;
    housingReviewId: number
    comments: string
    userId: number
    homeId: number
    reviewTime: Date
    housingReviewRating: number
    homeLikeCount: number
    secondHousingReviewId: number
}

export type AttractionReview = {
    attractionReviewId: number
    comments: string
    userId: number
    attractionId: number
    reviewTime: Date
    attractionLikeCount: number
    attractionReviewRating: number
    secondAttractionReviewId: number
}

export type Manager = {
    managerId: number
    managerCategory: string
    managerAccount: string
    managerPwd: string
    managerName: string
    managerPhone: string
    managerGender: string
    managerInDate: Date
    onlineStatus: string
}

export type ManagerHomeBinding = {
    bindingID: number
    managerID: number
    homeID: number
    bindingType: string
    bindingTime: Date
    bindingState: string
}

export type Notification = {
    userNotificationId: number
    notificationReleaseTime: Date
    notifyPostManager: number
    notificationContent: string
}

export type Coupon = {
    couponId: number
    couponName: string
    discountMethod: string
    discountIntensity: number
    useThreshold: number
    applicableScope: string
    discountInformation: string
    earliestUseTime: Date
    latestUseTime: Date
}
export type UserCoupon = {
    UACID: number
    condition: string
    couponId: number
    userId: number
}


export type CouponResult = {
    coupon: Coupon
    usersAndCoupons: UserCoupon
}

export type Log = {
    logId: number
    userPerformingId: number
    executionTime: Date
    executionContent: string
    deviceId: string
    executionPlace: string
}

export type PaymentPassword = {
    passwordID: number
    userID: number
    paymentPassword: string
    setTime: Date
}

export type Identity = {
    IDCardRecordID?: number
    IDCardName: string
    IDCardNumber: string
    IDCardPhoneNumber: string
    userId: number
    inDateTime?: Date
}

export type UpdateIdentityRequestData = {
    userId: number
    newIDCardName: string
    newIDCardNumber: string
    newIDCardPhoneNumber: string
    oldIDCardName: string
    oldIDCardNumber: string
    oldIDCardPhoneNumber: string
}
