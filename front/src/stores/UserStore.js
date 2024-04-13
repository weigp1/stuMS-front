import { defineStore } from "pinia"; // 引入pinia

export const UserStore = defineStore('admin', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    login(user) {
      this.isLoggedIn = true;
      this.user = user;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    currentUser: (state) => state.user,
  },
});