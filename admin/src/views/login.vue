<template>
    <AppPage title="登录">
      <div class="login-form">
        <NInput
          v-model:value="loginForm.username"
          class="input"
          placeholder="用户名"
        />
        <NInput
          v-model:value="loginForm.password"
          class="input"
          type="password"
          placeholder="密码"
          show-password-on="mousedown"
          @keydown.enter="handleLogin"
        />
        <NCheckbox v-model:value="isRemember">记住我</NCheckbox>
        <NButton class="login-button" @click="handleLogin" :loading="loading">
          登录
        </NButton>
      </div>
    </AppPage>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStorage } from '@vueuse/core'
  import { NButton, NCheckbox, NInput, NMessage } from 'naive-ui'
  
  import AppPage from '@/components/common/AppPage.vue'
  
  import { addDynamicRoutes } from '@/router'
  import { getLocal, removeLocal, setLocal } from '@/utils'
  import { useAuthStore, useUserStore } from '@/store'
  import api from '@/api'
  
  // const title = import.meta.env.VITE_TITLE // 环境变量中读取
  
  const userStore = useUserStore()
  const authStore = useAuthStore()
  
  const router = useRouter()
  const { query } = useRoute()
  
  const loginForm = reactive({
    username: 'guest',
    password: '123456',
  })
  
  initLoginInfo()
  
  // 从 localStorage 中获取记住的用户名和密码
  function initLoginInfo() {
    const localLoginInfo = getLocal('loginInfo')
    if (localLoginInfo) {
      loginForm.username = localLoginInfo.username
      loginForm.password = localLoginInfo.password
    }
  }
  
  // Reactive LocalStorage/SessionStorage - vueuse
  const isRemember = useStorage('isRemember', false)
  const loading = ref(false)
  
  async function handleLogin() {
    const { username, password } = loginForm
    if (!username || !password) {
      NMessage.warning('请输入用户名和密码')
      return
    }
  
    const doLogin = async (username, password) => {
      loading.value = true
  
      // 登录接口
      try {
        const resp = await api.login({ username, password })
        authStore.setToken(resp.data.token)
  
        await userStore.getUserInfo()
        await addDynamicRoutes()
  
        isRemember ? setLocal('loginInfo', { username, password }) : removeLocal('loginInfo')
        NMessage.success('登录成功')
  
        // 页面跳转: 根据 URL 中的 redirect 进行跳转
        if (query.redirect) {
          const path = query.redirect
          Reflect.deleteProperty(query, 'redirect') // 从对象身上删除属性
          router.push({ path, query })
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        loading.value = false
      }
    }
  
    doLogin(username, password)
  }
  </script>
  
  <style scoped>
    /* ... */
  </style>