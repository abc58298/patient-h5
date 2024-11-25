<script lang="ts" setup>
import { KnowledgeType } from '@/enums'
import KnowLedgeCard from './KnowLedgeCard.vue'
import { ref } from 'vue'
import { KnowledgeList, KnowledgeParams,KnowledgePage } from "@/types/consult"
import { getKnowledgePage } from '@/services/consult'
const props = defineProps<{
  type: KnowledgeType
}>()
//加载中的状态
const loading = ref(false)
//是否完成加载完毕
const finished = ref(false)
//数据列表
const list = ref<KnowledgeList>([])
//滚动到底部
type res={
  data: KnowledgePage
}
const onLoad = async () => {
  const res:res= await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  //判断已经记载完毕
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
}
//查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 5,
})
</script>
<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading" finished-text="没有更多了" :finished="finished" @load="onLoad">
      <KnowLedgeCard v-for="item in list" :key="(item as any).id" :item="item" />
    </van-list>
  </div>
</template>
<style>
.knowledge-list {
  padding: 0 15px;
}
</style>
