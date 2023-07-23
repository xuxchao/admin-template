<template>
  <div>
    <h1>低代码平台</h1>
    <div class="flex gap-4 p-2">
      <draggable
        class="flex flex-col gap-2 min-w-[300px] p-2"
        style="min-height: 50px; outline: 1px dashed"
        v-model="cloneList"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneElement"
        item-key="id"
      >
        <template #item="{ element }">
          <template v-if="typeof element.component === 'string'">
            <span>{{ element.component }}</span>
          </template>
          <template v-else>
            <component :is="element.component" v-bind="{ ...element.props }"></component>
          </template>
        </template>
      </draggable>
      <draggable
        class="p-6 flex-1"
        style="min-height: 50px; outline: 1px dashed"
        v-model="metaData"
        item-key="id"
        v-bind="dropOptions"
      >
        <template #item="{ element }">
          <LowItem :data="element"></LowItem>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import LowItem from './components/LowItem.vue';
import ColContainer from './materiel/ColContainer.vue';
import { ElButton } from 'element-plus';
import type { MetaDataItem } from './type';
import draggable from 'vuedraggable';
let globalId = 1000;
let cloneList = ref<MetaDataItem<any>[]>([
  {
    id: 1,
    desc: '最外层容器',
    isContainer: true,
    component: markRaw(ColContainer),
    children: [],
    props: {
      class: 'flex flex-col w-full border border-gray-500 gap-2 items-center p-2 min-h-[50px]',
    },
  },
  {
    desc: '独立的 div 2',
    id: 2,
    component: '你好2',
    props: {},
  },
  {
    desc: '独立的 div 3',
    id: 3,
    component: markRaw(ElButton),
    props: { type: 'primary' },
  },
]);
let metaData = ref<MetaDataItem<any>[]>([]);

const dropOptions = computed(() => ({
  animation: 200,
  group: 'people',
  disabled: false,
  ghostClass: 'ghost',
}));

function cloneElement(element: MetaDataItem<any>) {
  const { id, ...otherParams } = element;
  return {
    ...otherParams,
    id: globalId++,
  };
}
</script>
<style scoped lang="scss"></style>
