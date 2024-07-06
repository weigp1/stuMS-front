<template>
  <TopBar></TopBar>
  <div class="container">
    <div class="pdfContainer">
      <embed :src="file_url" type="application/pdf" width="100%" height="100%" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fileUrl } from '../../api/resource.js'
import TopBar from "../../components/TopBar.vue";
// 根据实际路径调整

let file_url = ref('')

async function getFileUrl() {
  file_url.value = await fileUrl("plan", "软件工程学院本科生奖学金综合素质测评实施方案.pdf")
}

onMounted(() => {
  getFileUrl()
})
</script>

<style scoped>
.container {
  position: relative; /* 确保内部元素可以使用相对定位 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: flex-start; /* 顶部对齐 */
  height: 100vh; /* 占满整个视口高度 */
  padding: 20px; /* 设置内边距 */
  box-sizing: border-box; /* 让 padding 不影响容器的尺寸 */

  background-image: url("../../assets/background.jpg");

}

.pdfContainer {
  width: 80%; /* 设置宽度为屏幕宽度的80% */
  /* max-width: 800px; 最大宽度为800px */
  margin-top: 2vh;
  height: 85vh; /* 高度自适应内容 */
  border: 1px solid #4d4b4b; /* 边框样式 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  /* overflow: auto; 添加滚动条 */

  /* 设置绝对定位 */
  position: absolute;
  top: 100px;
  bottom: 50px; /* 距离父容器底部的偏移量 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 居中对齐 */

  /* 可以根据需要调整其他样式，比如内边距、背景颜色等 */
}
</style>
