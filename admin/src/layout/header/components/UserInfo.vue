<script setup>
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { NDropdown, NIcon } from 'naive-ui'

import { useAuthStore, useUserStore, useThemeStore } from '@/store'

const userStore = useUserStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()

const options = [
  {
    label: '个人中心',
    key: 'profile',
    icon: () => h('i', { class: 'i-mdi:account' }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-mdi:exit-to-app' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    window.$dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        authStore.logout()
      },
    })
  }
  else if (key === 'profile') {
    router.push('/profile')
  }
}
</script>

<template>
  <NDropdown :options="options" @select="handleSelect">
    <div class="flex cursor-pointer items-center">
      <!-- <img :src="userStore.avatar" class="mr-2 h-[35px] w-[35px] border-1 border-gray-300 rounded-full"> -->
       <!-- <span>user</span> -->
      <NIcon size="18" class="cursor-pointer">
      <!-- <i v-if="!themeStore.darkmode" class="i-mdi:account-cog"/>
      <i v-else class="i-mdi:account-cog-outline"/> -->
      <!-- 切换darkmode会自动切换图标颜色 -->
      <i class="i-mdi:account-cog"/>
      </NIcon>
      <span>{{ userStore.name }}</span>
    </div>
  </NDropdown>
</template>
