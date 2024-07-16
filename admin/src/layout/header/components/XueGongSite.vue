<script setup>
import { NIcon } from 'naive-ui'

// 中大学工链接
function handleLinkClick() {
  window.open('https://xgxt-443.webvpn.sysu.edu.cn/')
}
</script>

<template>
  <NIcon class="cursor-pointer" size="20" @click="handleLinkClick">
     <img src="/image/sysulogo.png">
  </NIcon>
</template>
