<template>
  <Chart></Chart>

  <!-- 底部图案 -->
  <div class="bottom-bar">
    <img src="/src/assets/bottomBar.png" alt="Bottom Bar">
  </div>

  <!-- 文字图片 -->
  <div class="welcome-container">
    <img src="/src/assets/welcome.png" alt="Welcome" class="welcome-img">
  </div>

</template>
  
<script setup>

import Chart from "./Chart.vue";
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

</script>

<style scoped>

.bottom-bar {
  position: absolute;
  bottom: 5vh;
  left: 0;
  width: 100vw;
  height: 15vh;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-bar img {
  width: 100vw;
  height: 100%;
  opacity: 0.6;
}

.welcome-container {
  position: absolute;
  bottom: 5vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
}

.welcome-img {
  height: 100%;
  width: auto;
}

</style>
  
