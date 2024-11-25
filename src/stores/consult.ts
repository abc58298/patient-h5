import { ConsultType } from "@/enums"
import { ConsultIllness, PartialConsult } from "@/types/consult"
import {defineStore} from "pinia"
import { ref } from "vue"
export const useConsultStore=defineStore("consult",()=>{
  //问诊信息
  const consult=ref<PartialConsult>({})
  //记录类型
  const setType=(type:ConsultType)=>{
    consult.value.type=type
  }
  //记录级别
  const setillnessType=(level:0|1)=>{
    consult.value.illnessType=level
  }
  //记录科室
  const setDep=(depId:string)=>{
    consult.value.depId=depId
  }
  const setillness=(illness:ConsultIllness)=>{
    consult.value.illnessDesc=illness.illnessDesc
    consult.value.illnessTime=illness.illnessTime
    consult.value.consultFlag=illness.consultFlag
    consult.value.pictures=illness.pictures
   }
    return {consult,setType,setillnessType,setDep,setillness}
   //记录病情

},{persist:true})
