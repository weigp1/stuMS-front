import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'// 导入ElementPlus
import 'element-plus/dist/index.css'
// 导入css文件
import "./style.css";
import './assets/base.css'
import './assets/iconfont/iconfont.css'

import axios from 'axios';
import './api/mock'

import { createPinia } from "pinia";
import { UserStore } from "./stores/UserStore" 

import { router } from "./routes/router";


const app = createApp(App);

app.provide("axios", axios); // 将axios全局放入

app.use(ElementPlus) // 使用Element UI

app.use(createPinia()); // 引入pinia
const userStore = UserStore() // 引入UserStore

app.use(router); // 引入路由

app.mount("#app");

export {axios}
