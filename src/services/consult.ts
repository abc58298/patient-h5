import { KnowledgeParams, KnowledgePage, DoctorPage,PageParams,FollowType, TopDep} from "@/types/consult"
import request from "@/utils/request"

//首页-知识列表
export const getKnowledgePage = (params: KnowledgeParams) =>
{
  return request<KnowledgePage>("patient/home/knowledge","GET",params)
}
//关注的医生列表
export const  getDoctorPage=(params:PageParams)=>{
  return request<DoctorPage>("home/page/doc","GET",params)
}
//关注操作
export const followOrUnfollow=(id:string,type:FollowType='doc')=>{
  return request("like","POST",{id,type})
}
//科室数据
export const getAllDep=()=>request<TopDep>("dep/all")
