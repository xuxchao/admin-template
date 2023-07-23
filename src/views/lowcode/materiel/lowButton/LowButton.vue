<template>
  <el-button v-bind="props"></el-button>
</template>
<script lang="ts" setup>
import type { ButtonInstance } from 'element-plus';
const props = defineProps<{
  type: ButtonInstance['props']['type'];
}>();
</script>
<style scoped lang="scss"></style>
