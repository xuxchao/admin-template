<template>
  <div class="flex w-screen h-screen justify-center items-center bg-gray-500">
    <el-card>
      <el-form label-width="40">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
const { login } = useAccountStore();

const form = ref({
  account: '123456789',
  password: '123456789',
});

function loginHandler() {
  login();
}
</script>
