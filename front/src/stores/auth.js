import { unref } from 'vue'
import { defineStore } from 'pinia'
import { UserStore } from './user'
import { router } from '../router'

export const AuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    toLogin() {
      const currentRoute = unref(router.currentRoute)
      router.replace({
        path: '/login',
        query: currentRoute.query,
      })
    },
    resetLoginState() {
      this.token = null
      UserStore().$reset()
      this.$reset()
    },
    // 主动退出登录
    async logout() {
      // await api.logout()
      this.resetLoginState()
      this.toLogin()
      ElMessage.success('您已经退出登录！')
    },
    // 被强制退出
    async forceOffline() {
      this.resetLoginState()
      this.toLogin()
      ElMessage.info('登录已失效！')
    },
  },
})

