import { ConsultType } from "@/enums"
import { PartialConsult } from "@/types/consult"
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
    return {consult,setType,setillnessType,setDep}

},{persist:true})
