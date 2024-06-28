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
        <div class="row">
          <div @click="switchScene(2)" class="rectangle-button">
            <span class="button-text">政治思想道德类</span>
            <img src="../../assets/politics.png" alt="政治思想道德类" class="button-image">
          </div>
          <div @click="switchScene(3)" class="rectangle-button">
            <span class="button-text">文体实践类</span>
            <img src="../../assets/sports.png" alt="文体实践类" class="button-image">
          </div>
        </div>
        <div class="row">
          <div @click="switchScene(4)" class="rectangle-button">
            <span class="button-text">社会工作类</span>
            <img src="../../assets/social.png" alt="社会工作类" class="button-image">
          </div>
          <div @click="switchScene(5)" class="rectangle-button">
            <span class="button-text">学习、竞赛及科研成果类</span>
            <img src="../../assets/study.png" alt="学习、竞赛及科研成果类" class="button-image">
          </div>
        </div>
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
  padding: 5vh;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  gap: 5vh;
}

.row {
  display: flex;
  justify-content: center;
  gap: 5vh;
  width: 100%;
}

.rectangle-button {
  display: flex;
  align-items: center;
  width: 60%;
  height: calc(50vh * 8 / 12); /* 10:6 的长宽比 */
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.rectangle-button:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}

.button-text {
  flex: 3;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  color: #333;
}

.button-image {
  flex: 7;
  height: 100%; /* 使图片高度与按钮一致 */
  object-fit: cover;
}

.new-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}

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

.back-button {
  width: 100px;
  height: 30px;
  margin: 0 20px;
  transition: transform 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #ccc;
  border-radius: 5px;
}

.back-button:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
