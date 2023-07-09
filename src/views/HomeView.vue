<template>
  <el-button class="text-red-400">{{ route.name }}</el-button>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
