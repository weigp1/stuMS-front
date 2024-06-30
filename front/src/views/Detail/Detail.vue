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
      <Politics :switchScene="switchScene"></Politics>
    </div>

    <div v-else-if="currentScene === 3">
      <Sports :switchScene="switchScene"></Sports>
    </div>

    <div v-else-if="currentScene === 4">
      <Social :switchScene="switchScene"></Social>
    </div>

    <div v-else-if="currentScene === 5">
      <Study :switchScene="switchScene"></Study>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopBar from "../../components/TopBar.vue";
import Politics from "./Politics.vue";
import Sports from "./Sports.vue";
import Social from "./Social.vue";
import Study from "./Study.vue";

const currentScene = ref(1);

const switchScene = (scene: number) => {
  currentScene.value = scene;
};
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
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
