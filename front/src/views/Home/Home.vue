<template>
  <Chart></Chart>
  <TopBar></TopBar>
</template>
  
<script setup>

import Chart from "./Chart.vue";
import TopBar from "../../components/TopBar.vue";
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

</script>

<style scoped>


</style>
  
