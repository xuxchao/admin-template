<template>
  <template v-if="itemData.isContainer">
    <draggable
      class="p-6"
      style="min-height: 50px; outline: 1px dashed"
      v-model="itemData.children"
      item-key="id"
      v-bind="dropOptions"
      :class="itemData.props?.class"
    >
      <template #item="{ element, index }">
        <template v-if="typeof itemData.component === 'string'">
          <span>{{ itemData.component }}</span>
        </template>
        <template v-else>
          <LowItem :data="element" @update:data="updateData(element, index)"></LowItem>
        </template>
      </template>
    </draggable>
  </template>
  <template v-else-if="typeof itemData.component === 'string'">
    <span>{{ itemData.component }}</span>
  </template>
  <template v-else>
    <component :is="itemData.component" v-bind="itemData.props">
      <template v-for="item in itemData.children" :key="item.id">
        <LowItem :data="item"></LowItem>
      </template>
    </component>
  </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import type { MetaDataItem } from '../type';
const props = defineProps<{
  data: MetaDataItem<any>;
}>();

const emit = defineEmits<{
  (e: 'update:data', data: any): void;
}>();

const itemData = computed({
  get: () => {
    return props.data;
  },
  set: (v) => {
    console.log(v.children?.map((item) => item.id));
    emit('update:data', v);
  },
});

const dropOptions = computed(() => ({
  animation: 200,
  group: 'people',
  disabled: false,
  ghostClass: 'ghost',
}));

function updateData(params: MetaDataItem<any>, index: number) {
  const newData = [...(itemData.value.children ?? [])];
  newData[index] = params;
  itemData.value = {
    ...itemData.value,
    children: newData,
  };
}
</script>
<style scoped>
.ghost {
  background-color: red;
}
</style>
