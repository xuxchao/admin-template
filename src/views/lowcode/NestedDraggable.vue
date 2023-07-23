<template>
  <draggable
    class="p-6"
    style="min-height: 50px; outline: 1px dashed"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <nested-draggable :tasks="element.tasks" />
      </li>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable';

defineProps<{
  tasks: any[];
}>();
</script>
<style scoped lang="scss"></style>
