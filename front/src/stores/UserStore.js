import { defineStore } from "pinia"; // 引入pinia库中的defineStore函数，用于定义Pinia状态管理的store

// 定义名为UserStore的Pinia store
export const UserStore = defineStore('admin', {
  state: () => ({ // 定义store的初始状态
    LoggedIn: false, // 用户登录状态，默认为未登录
    user: null, // 当前用户信息，默认为null
  }),
  actions: { // 定义store的操作，用于修改状态
    login(user) { // 登录操作，将用户登录状态设为已登录，并存储用户信息
      this.LoggedIn = true; // 将用户登录状态设为true
      this.user = user; // 存储用户信息
    },
    logout() { // 登出操作，将用户登录状态设为未登录，并清空用户信息
      this.LoggedIn = false; // 将用户登录状态设为false
      this.user = null; // 清空用户信息
    },
  },
  getters: { // 定义store的getter，用于获取状态
    isLoggedIn: (state) => state.LoggedIn, // 获取用户登录状态
    currentUser: (state) => state.user, // 获取当前用户信息
  },
});
