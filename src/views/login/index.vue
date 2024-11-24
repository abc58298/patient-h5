<script setup lang="ts">
import { login, loginByCode, sendCode } from '@/services/user'
import { moblieRules, passwordRules, codeRules } from '@/utils/rules'
import { FormInstance, showSuccessToast, showToast } from 'vant'
import { onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import SvgMap from '@/components/SvgMap.vue'

defineOptions({
  name: 'LoginPage'
})

const store = useUserStore()
const moblie = ref('')
const password = ref('')
const agree = ref(false)
const code = ref('')
//路由实例
const router = useRouter()
//路由对象
const route = useRoute()
//处理登录逻辑(合并短信登陆)
const onsubmit = async () => {
  if (!agree.value) return showToast('请勾选协议')
  const res = isPass.value ? await login(moblie.value, password.value) : await loginByCode(moblie.value, code.value)
  store.setUser(res.data)
  showSuccessToast('登录成功')
  router.replace(route.query.returnUrl as string)
}
//短信登录界面切换
const isPass = ref(true)
//发送短信验证码
const time = ref(0)
const form = ref<FormInstance>()
//定时器id
let timer: NodeJS.Timeout | null = null

/**
 * 发送验证码功能
 * 此函数首先检查是否有倒计时存在，以防止重复发送验证码
 * 然后验证手机号格式，如果验证通过则发送验证码
 * 发送成功后启动倒计时，期间禁用发送按钮
 */
const onsend = async () => {
  // 验证倒计时是否存在，如果存在则返回，防止重复发送
  if (time.value) return

  // 验证手机号格式
  await form.value.validate('mobile')

  // 发送验证码，第二个参数指定验证码用途为登录
  await sendCode(moblie.value, 'login')

  // 显示发送成功的提示信息
  showToast('发送成功')

  // 设置倒计时初始值为60秒
  time.value = 60

  // 开始倒计时
  // 1. 清除上一次的定时器，避免有多个定时器同时运行
  if (timer) clearInterval(timer)

  // 设置新的定时器，每秒减少倒计时时间
  timer = setInterval(() => {
    time.value--

    // 当倒计时结束时，清除定时器
    if (time.value <= 0) clearInterval(timer)
  }, 1000)
}
//组件销毁时销毁定时器，避免内存泄流哦
onUnmounted(() => clearInterval(timer))

//控制密码的可见与不可见
const showPassword = ref(false)
</script>

<template>
  <div class="login-page">
    <NavBar right-text="注册" />
    <!-- 头部 -->
    <div class="login-header">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow" />
      </a>
    </div>

    <!-- 表单 -->
    <van-form ref="form" @submit="onsubmit">
      <!-- 手机号输入框 -->
      <van-field name="mobile" type="tel" placeholder="请输入手机号" v-model="moblie" :rules="moblieRules" />

      <!-- 密码输入框 -->
      <van-field
        name="code"
        :type="showPassword ? 'text' : 'password'"
        placeholder="请输入密码"
        v-model="password"
        :rules="passwordRules"
        v-if="isPass"
      >
        <template #button>
          <SvgMap
            :name="`login-eye-${showPassword ? 'on' : 'off'}`"
            style="margin-right: 10px"
            @click="showPassword = !showPassword"
          ></SvgMap>
        </template>
      </van-field>
      <van-field placeholder="短信验证码" v-model="code" v-else :rules="codeRules">
        <template #button>
          <span class="btn-send" @click="onsend">{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span>
        </template>
      </van-field>
      <!-- 用户协议 -->
      <div class="login-checkbox">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>

      <!-- 提交按钮 -->
      <van-button block round type="primary" native-type="submit"> 登 录 </van-button>

      <!-- 忘记密码 -->
      <div class="login-footer">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <SvgMap name="consult-alipay"></SvgMap>
    <!-- 第三方登录 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <a class="login-icon">
        <img src="@/assets/qq.svg" alt="QQ 登录" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  padding-top: 46px;

  .login-header {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }

  .van-form {
    padding: 0 14px;
    .btn-send {
      color: var(--cp-primary);
    }
    .login-checkbox {
      display: flex;
      align-items: center;
      margin-top: 20px;

      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }

    .van-button {
      margin-top: 20px;
    }

    .login-footer {
      text-align: center;
      margin-top: 10px;
    }
  }

  .login-other {
    margin-top: 60px;
    padding: 0 30px;

    .login-icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
