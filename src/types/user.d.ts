export interface User {
  /**
   * 用户名
   */
  account: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 用户id
   */
  id: string
  /**
   * 脱敏手机号，带星号的手机号
   */
  mobile: string
  /**
   * token
   */
  token: string,
  refreshToken:string
}
export  type  CodeType="login"|"register"|"changeMobile"|"forgetPassword"|"bindMobile"
//从user类型中去除某些属性后得到的类型omit
type OmitUser=Omit<User,'token'>
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

// 患者列表信息
export type PatientList = Patient[]
