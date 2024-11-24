import { defineStore } from 'pinia'
import { ref } from 'vue'
// eslint规范之后，我们导入的类型前面要加上type
import type {User} from "@/types/user"

/**
 * 参数1：仓库的名字
 * 参数2：写业务逻辑的函数
 * 参数3：持久化的设置
 */
export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>()

    // 保存用户信息（登录成功之后）
    const setUser = (u:User) => {
      user.value = u
      console.log(u)
    }

    // 删除用户信息（退出的时候）
    const deleteUser = () => {
      user.value = undefined
    }

    return { user, setUser, deleteUser }
  },
  {
    persist: true // 把用户信息存储到本地localStorage中
  }
)
