<template>
  <svg aria-hidden="true" class="svgIcon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style scoped>
.svgIcon {
  width: 1em;
  height: 1em;
}
</style>
