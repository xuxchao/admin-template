<template>
  <div class="flex gap-4">
    <draggable v-model="list" v-bind="dragOptions" item-key="order"></draggable>
    <draggable v-model="list" v-bind="dragOptions" item-key="order">
      <template #item="{ element }">
        <li class="list-group-item">
          <i
            :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
            @click="element.fixed = !element.fixed"
            aria-hidden="true"
          ></i>
          {{ element.name }}
        </li>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];

export default defineComponent({
  name: 'transition-example-2',
  display: 'Transitions',
  order: 7,
  components: {
    draggable,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
    };
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
});
</script>
<style>
/* .ghost {
  opacity: 0.5;
  background: #c8ebfb;
} */

.list-group-item {
  cursor: move;
}
</style>
