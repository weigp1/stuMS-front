<template>
  <div class="form-layout">
    <el-form :model="form" label-width="120px">
      <el-form-item label="类别">
        <el-select v-model="form.selection" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖项">
        <el-input v-model="form.awardInfo"></el-input>
      </el-form-item>
      <el-form-item label="综测分值">
        <el-input v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="() => switchScene(1)">返回</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  selection: '',
  awardInfo: '',
  score: ''
});

const submitForm = () => {
  console.log('表单提交', form.value);
  // 可以在这里添加表单提交的逻辑
};

defineProps<{
  switchScene: (scene: number) => void;
}>();
</script>

<style scoped>
.form-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
