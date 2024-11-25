import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 指定路由模式
  routes: [
   {
    path:"/login",
    component:()=>import("@/views/login/index.vue"),
    meta:{
      title:"登录"
    },

   },
   {
    path:"/user/patient",
    component:()=>import("@/views/User/Patient.vue"),
    meta:{
      title:"家庭档案"
    },


   },
   {
    path:"/consult/fast",
    component:()=>import("@/views/Consult/ConsultFast.vue"),
    meta:{
      title:"极速问诊"
    },
   },
   {
    path:"/consult/dep",
    component:()=>import("@/views/Consult/ConsultDep.vue"),
    meta:{
      title:"选择科室"
    },
   },
   {
    path:"/consult/illness",
    component:()=>import("@/views/Consult/ConsultIllness.vue"),
    meta:{
      title:"病情描述"
    },
   },
   {
    path:"/",
    redirect:"/home",
    component:()=>import("@/views/Layout/index.vue"),
    children:[
      {path:"/home",component:()=>import('@/views/Home/index.vue'),meta:{title:"首页"}},
      {path:"/article",component:()=>import('@/views/Article/index.vue'),meta:{title:"健康百科"}},
      {path:"/notify",component:()=>import('@/views/Notify/index.vue'),meta:{title:"消息通知"}},
      {path:"/user",component:()=>import('@/views/User/index.vue'),meta:{title:"我的"}}
    ]
   }
  ]
})
//全局导航守卫
router.beforeEach((to)=>{
  NProgress.start()
  //获取token
  const store=useUserStore()
  //白名单
  const whiteList=["/login"]
  //如果没有token并且不在白名单内
  if(!store.user?.token&&!whiteList.includes(to.path))
    return '/login'
})
//全局后置导航
router.afterEach((to)=>{
  //设置标题
  document.title=`${to.meta.title||""}-99健康`
  NProgress.done()
})
export default router
