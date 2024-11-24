import type { CodeType, PatientList, User,UserInfo } from "@/types/user"
import request from "@/utils/request"
//密码登录
export const login=(mobile:string,password:string)=>{
  return request<User>("login/password","POST",{mobile,password})
}
//发送短信验证码
export const sendCode=(mobile:string,type:CodeType)=>{
  return request("code","GET",{mobile,type})
}
//短信登录
export const loginByCode=(mobile:string,code:string)=>{
  return request<User>("login","POST",{mobile,code})
}
//获取用户信息
export const getUserInfo=()=>{
  return request<UserInfo>("patient/myUser")
}
//获取患者列表
export const getPatientList=()=>{
  return request<PatientList>("patient/mylist")
}
//添加患者
export const addPatient=(patient:object)=>{
  return request("patient/add","POST",patient)
}
//编辑患者
export const editPatient=(patient:object)=>{
  return request("patient/update","PUT",patient)
}
//删除患者
export const delPatient=(id:string)=>{
  return request(`patient/del/${id}`,"DELETE")
}
