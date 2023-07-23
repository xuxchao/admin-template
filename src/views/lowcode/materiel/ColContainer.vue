<template>
  <div :class="props.class" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  class: string;
}>();
</script>
<style scoped lang="scss"></style>
