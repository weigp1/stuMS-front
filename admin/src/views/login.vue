<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { NButton, NCheckbox, NInput } from 'naive-ui'

import AppPage from '@/components/common/AppPage.vue'

import { addDynamicRoutes } from '@/router'
import { getLocal, removeLocal, setLocal } from '@/utils'
import { useAuthStore, useUserStore } from '@/store'
import api from '@/api'

const title = import.meta.env.VITE_TITLE // 环境变量中读取

const userStore = useUserStore()
const authStore = useAuthStore()

const router = useRouter()
const { query } = useRoute()

const loginForm = reactive({
  SID: '21311111',
  password: '111',
})

initLoginInfo()

// 从 localStorage 中获取记住的用户名和密码
function initLoginInfo() {
  const localLoginInfo = getLocal('loginInfo')
  if (localLoginInfo) {
    loginForm.SID = localLoginInfo.SID
    loginForm.password = localLoginInfo.password
  }
}

// Reactive LocalStorage/SessionStorage - vueuse
const isRemember = useStorage('isRemember', false)
const loading = ref(false)

async function handleLogin() {
  const { SID, password } = loginForm
  if (!SID || !password) {
    $message.warning('请输入账号和密码')
    return
  }

  const doLogin = async (SID, password) => {
    loading.value = true

    // 登录接口
    try {
      const resp = await api.login({ 'SID':SID, 'password':password})
      authStore.setToken(resp.data)

      // $message.warning(SID)
      // console.log(SID)
      // let sid = { 'SID': SID };
      // console.log(sid)
      await userStore.getUserInfo(SID)
      await addDynamicRoutes()

      isRemember ? setLocal('loginInfo', { SID, password }) : removeLocal('loginInfo')
      $message.success('登录成功')

      // 页面跳转: 根据 URL 中的 redirect 进行跳转
      if (query.redirect) {
        const path = query.redirect
        Reflect.deleteProperty(query, 'redirect') // 从对象身上删除属性
        router.push({ path, query })
      }
      else {
        router.push('/')
        // router.push('/student/list') ?
      }
    }
    finally {
      loading.value = false
    }
  }

  doLogin(SID, password)

  // 判断是否需要验证码
  // if (JSON.parse(import.meta.env.VITE_USE_CAPTCHA)) {
  //   // 腾讯滑块验证码 (在 index.html 中引入 js 文件)
  //   const captcha = new TencentCaptcha(config.TENCENT_CAPTCHA, async res => res.ret === 0 && doLogin(SID, password))
  //   captcha.show()
  // }
  // else {
  // doLogin(SID, password)
  // }
}
</script>

<template>
  <!-- FIXME: 使用 style="background-image: url(/image/login_bg.webp);" 不生效, 需要写到 style 里的 class 中 -->
  <AppPage class="backgroundImg bg-cover">
    <div style="transform: translateY(25px)" class="m-auto max-w-[700px] min-w-[345px] flex items-center justify-center rounded-2 bg-white bg-opacity-60 p-4 shadow">
      <div class="hidden w-[380px] px-5 py-9 md:block">
        <img src="/image/logo.png" class="w-full" alt="login_banner">
      </div>

      <div class="w-[320px] flex flex-col px-4 py-9 space-y-5.5">
        <h5 class="flex items-center justify-center text-2xl text-gray font-normal">
          <img src="/image/SSElogo.png" alt="logo" class="mr-2 h-[50px] w-[50px]">
          <span> {{ title }} </span>
        </h5>
        <NInput
          v-model:value="loginForm.SID"
          class="h-[50px] items-center pl-2"
          autofocus
          :maxlength="20"
        />
        <NInput
          v-model:value="loginForm.password"
          class="h-[50px] items-center pl-2"
          type="password"
          show-password-on="mousedown"
          placeholder="11111"
          :maxlength="20"
          @keydown.enter="handleLogin"
        />
        <NCheckbox
          :checked="isRemember"
          label="记住我"
          :on-update:checked="(val) => (isRemember = val)"
        />
        <NButton
          class="h-[50px] w-full rounded-5"
          type="primary"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </NButton>
      </div>
    </div>
  </AppPage>
</template>

<!-- <style scoped>
.backgroundImg{
  background-image: url(/image/login_bg.webp);
}
</style> -->
