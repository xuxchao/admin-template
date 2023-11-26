<template>
  <el-card>
    <el-form :model="form" ref="formRef" :rules="rules" label-width="120">
      <el-form-item prop="name" label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="age" label="年龄">
        <el-input-number v-model="form.age"></el-input-number>
      </el-form-item>
      <el-form-item prop="birth" label="生日">
        <el-date-picker v-model="form.birth" :value-format="'x'" type="date" />
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="hobbies" label="兴趣爱好">
        <el-checkbox-group v-model="form.hobbies">
          <el-checkbox label="篮球"></el-checkbox>
          <el-checkbox label="足球"></el-checkbox>
          <el-checkbox label="乒乓球"></el-checkbox>
          <el-checkbox label="羽毛球"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="desc" label="个人介绍">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitHandler" :loading="loading" type="primary">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { useForm } from '@alova/scene-vue';
import { draftFormApi } from '@/api';
import { type FormInstance } from 'element-plus';

const { form, loading, reset, send } = useForm(
  (params) => {
    return draftFormApi({
      ...params,
      age: params.age ?? 0,
    });
  },
  {
    initialForm: {
      name: '',
      age: undefined as undefined | number,
      birth: '',
      sex: '',
      idCard: '',
      hobbies: [] as string[],
      desc: '',
    },
    store: true,
  }
);

const formRef = ref<FormInstance>();

const rules: FormInstance['rules'] = {
  name: [{ required: true }],
  age: [{ required: true }],
  birth: [{ required: true }],
  sex: [{ required: true }],
  idCard: [{ required: true }],
  hobbies: [{ required: true }],
  desc: [{ required: true }],
};

async function submitHandler() {
  if (!(await formRef.value?.validate())) return;
  await send();
  reset();
}
</script>
<style scoped lang="scss"></style>
