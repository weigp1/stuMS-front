<script setup>
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const title = import.meta.env.VITE_TITLE
// const title_en = import.meta.env.VITE_TITLE_EN
</script>

<template>
  <RouterLink class="h-[40px] flex items-center justify-center" to="/">
    <div class="h-full flex items-center justify-left">
      <img src="/image/logo.png" alt="logo" class="h-[36px] w-[36px]">
      <!-- <img src="/image/SSElogo.png" alt="SSElogo" class="h-[30px] w-[30px]"> -->
    </div>
    <!-- <h2
      v-show="!themeStore.collapsed"
      class="ml-2 max-w-[80px] flex-shrink-0 text-base text-primary font-bold dark:text-white"
    >
      {{ title_en }}
    </h2> -->
    <h2
      v-show="!themeStore.collapsed"
      class="ml-2 max-w-[120px] flex-shrink-0 text-base text-primary font-bold dark:text-white"
    >
      {{ title }}
    </h2>
    
  </RouterLink>
</template>
