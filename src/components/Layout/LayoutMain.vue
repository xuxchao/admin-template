<template>
  <div class="common-layout">
    <el-container>
      <el-header class="shadow-md z-10">
        <div class="flex justify-end items-center h-full">
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
        <LayoutMenu></LayoutMenu>
        <el-container>
          <el-main>
            <RouterView></RouterView>
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
</script>
