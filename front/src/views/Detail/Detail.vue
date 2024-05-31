<script lang="ts" setup>
import { ref } from 'vue';
import TopBar from "../../components/TopBar.vue";

const currentScene = ref(1);

const form = ref({
  selection: '',
  awardInfo: '',
  score: ''
});

const switchScene = (scene: number) => {
  currentScene.value = scene;
};

const submitForm = () => {
  console.log('表单提交', form.value);
  // 可以在这里添加表单提交的逻辑
};
</script>


<template>
  <TopBar></TopBar>
  <div class="centered">
    <div v-if="currentScene === 1">
      <div class="button-container">
        <button @click="switchScene(2)" class="square-button">政治思想道德类</button>
        <button @click="switchScene(3)" class="square-button">文体实践类</button>
        <button @click="switchScene(4)" class="square-button">社会工作类</button>
        <button @click="switchScene(5)" class="square-button">学习、竞赛及科研成果类</button>
      </div>
    </div>
    <div v-else-if="currentScene === 2">
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
            <el-button @click="switchScene(1)">返回</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else-if="currentScene === 3">
      <div class="new-layout">
        <button @click="switchScene(1)" class="back-button">返回</button>
      </div>
    </div>
    <div v-else-if="currentScene === 4">
      <div class="new-layout">
        <button @click="switchScene(1)" class="back-button">返回</button>
      </div>
    </div>
    <div v-else-if="currentScene === 5">
      <div class="new-layout">
        <button @click="switchScene(1)" class="back-button">返回</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.square-button {
  width: 150px;
  height: 150px;
  margin: 0 20px;
  transition: transform 0.3s ease;
}

.square-button:hover {
  transform: scale(1.1);
}

.new-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.form-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.back-button {
  width: 100px;
  height: 30px;
  margin: 0 20px;
  transition: transform 0.3s ease;
}
</style>
