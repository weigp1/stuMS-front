import { defineStore } from "pinia"; // 引入pinia库中的defineStore函数，用于定义Pinia状态管理的store
import { getUser } from '../api/api.js'

export const UserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    userInfo: null,
  }),
  actions: {
    async login(sid) {
      const resp = await getUser(sid)
      this.loggedIn = true; // 将用户登录状态设为true
      this.userInfo = resp.data; // 存储用户信息
    },
    logout() {
      this.loggedIn = false; // 将用户登录状态设为false
      this.userInfo = null; // 清空用户信息
    },
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn, // 获取用户登录状态
    currentUser: (state) => state.userInfo, // 获取当前用户信息
  },
});
