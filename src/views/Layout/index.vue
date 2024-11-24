<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home"
        >首页
        <template #icon="{ active }">
          <SvgMap :name="`home-index-${active ? 'active' : 'default'}`"></SvgMap>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article"
        >健康百科
        <template #icon="{ active }">
          <SvgMap :name="`home-article-${active ? 'active' : 'default'}`"></SvgMap>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify"
        >消息通知
        <template #icon="{ active }">
          <SvgMap :name="`home-notice-${active ? 'active' : 'default'}`"></SvgMap>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user"
        >我的
        <template #icon="{ active }">
          <SvgMap :name="`home-mine-${active ? 'active' : 'default'}`"></SvgMap>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'LoginPage'
})
</script>

<style scoped lang="scss">
.layout-page {
  :deep() {
    .van-tabbar-item {
      &_icon {
        font-size: 21px;
      }
      &_text {
        font-size: 21px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
