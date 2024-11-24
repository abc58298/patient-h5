<template>
  <!--固定定位，左侧箭头，标题-->
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
//1.通过props实现标题和右侧文字
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
//2.使用emit触发点击右侧文字时的事件
const onClickRight = () => {
  emit('click-right')
}
//3实现回退,了解history.state,有历史记录就回退，没有就返回首页
const onClickLeft = () => {
  //如果是回退到上一级并执行传入的函数
  if (props.back) return props.back()
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
:deep() {
  .van-nav-bar {
    &__left {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
