<template>
  <div class="flex w-screen h-screen justify-center items-center bg-gray-500">
    <el-card class="w-120">
      <el-form :size="'large'" label-width="40">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="w-full" type="primary" @click="loginHandler">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { login as loginApi } from '@/api';
import { useAccountStore } from '@/stores/account';
const { login } = useAccountStore();
import { useForm } from '@alova/scene-vue';
const { form, loading, send } = useForm(loginApi, {
  initialForm: {
    account: '123456789',
    password: '123456789',
  },
});

async function loginHandler() {
  const data = await send();
  login(data);
}
</script>
