import axios from 'axios'
import type { Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

const baseURL = 'https://consult-api.itheima.net/'

// 创建 axios 实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器（携带token）
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器（处理 token 过期 401）
instance.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数
    if (res.data.code !== 10000) {
      showToast(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }
    return res.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // token过期了，清除 token
      const store = useUserStore()
      store.deleteUser()

      // 跳转到登录页面，传递重定向页面的参数
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
    }

    // 如果没有捕获到更具体的错误类型，可以统一显示
    showToast(error.message || '请求失败，请稍后再试')
    return Promise.reject(error)
  }
)

// 封装一个通用的 request 方法
const request = <T>(url: string, method: Method = 'GET', data?: object) => {
  return instance.request<{
    code: number; message: string; data: T
}>({
    url,
    method,
    // GET 请求使用 params，其他请求使用 data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

// 导出 request 方法
export default request
