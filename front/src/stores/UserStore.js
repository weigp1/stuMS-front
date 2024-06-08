import { defineStore } from "pinia"; // 引入pinia库中的defineStore函数，用于定义Pinia状态管理的store

// 定义名为UserStore的Pinia store
export const UserStore = defineStore('admin', {
  state: () => ({ // 定义store的初始状态
    LoggedIn: false,
    user: null,
  }),
  actions: { // 定义store的操作，用于修改状态
    login(user) {
      this.LoggedIn = true; // 将用户登录状态设为true
      this.user = user; // 存储用户信息
    },
    logout() {
      this.LoggedIn = false; // 将用户登录状态设为false
      this.user = null; // 清空用户信息
    },
  },
  getters: {
    isLoggedIn: (state) => state.LoggedIn, // 获取用户登录状态
    currentUser: (state) => state.user, // 获取当前用户信息
  },
});
