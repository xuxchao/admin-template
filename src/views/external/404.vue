<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-9xl">404</h1>
    <el-button class="mt-6" type="primary" @click="tapHandler">回首页</el-button>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';

function tapHandler() {
  router.push({ name: 'login' });
}
</script>
<style scoped lang="scss"></style>
