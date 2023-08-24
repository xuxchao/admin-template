<template>
  <div class="common-layout">
    <el-container>
      <el-header class="shadow-md z-10">
        <div class="flex justify-between items-center h-full">
          <div class="font-black">VUE ADMIN TEMPLATE</div>
          <el-dropdown @command="commandHandler">
            <el-avatar class="focus-visible:outline-none" :src="account?.avatar"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>{{ account?.userName }}</el-dropdown-item>
                <el-dropdown-item divided :command="Command.logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <div
          class="flex flex-col relative mr-2 menu-container"
          :style="{ minHeight: `calc(100vh - 60px)`, minWidth: !isCollapse ? '220px' : '64px' }"
        >
          <div
            class="h-10 w-6 rounded-md border border-black/30 flex items-center justify-center absolute top-1/2 -right-2 z-10 bg-white shadow-md cursor-pointer"
            @click="collapseHandler"
          >
            <span
              class="transition-transform duration-300 ease-in"
              :class="{ 'rotate-180': isCollapse }"
            >
              <i-ep-arrow-left />
            </span>
          </div>
          <LayoutMenu :collapse="isCollapse"></LayoutMenu>
        </div>
        <el-container>
          <el-main class="-ml-2">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import LayoutMenu from '@/components/Layout/LayoutMenu';
import { useAccountStore } from '@/stores/account';
import type { DropdownInstance } from 'element-plus';
const { account, logout } = useAccountStore();
const isCollapse = ref(false);

enum Command {
  logout,
}

const commandHandler: DropdownInstance['onCommand'] = (item: Command) => {
  switch (item) {
    case Command.logout:
      logout();
      break;

    default:
      break;
  }
};

function collapseHandler() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped>
:deep(.el-menu) {
  border-right: none;
}

.menu-container {
  border-right: solid 1px var(--el-menu-border-color);
  transition: min-width 200ms ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
