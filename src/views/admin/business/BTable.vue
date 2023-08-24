<template>
  <div>
    <el-card header="搜索条件">
      <el-form inline label-width="80">
        <el-form-item label="姓名">
          <el-input v-model="searchValues.name" autocomplete="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="searchValues.age"></el-input-number>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchValues.sex">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
            <el-option value="位置"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-select v-model="searchValues.job">
            <el-option value="IT"></el-option>
            <el-option value="商务"></el-option>
            <el-option value="务农"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card header="表格数据" class="mt-3">
      <el-table></el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useSearchValue } from '@/hooks/useSearchValue';
import type { SearchValue } from './type';

const { searchValues, resetSearch } = useSearchValue<SearchValue>({
  defaultValue: {
    name: '',
    age: 10,
    sex: '男',
    job: 'IT',
  },
  storageName: 'b-table',
});
</script>
<style scoped lang="scss"></style>
