<template>
  <TopBar></TopBar>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import TopBar from "./components/TopBar.vue";
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

