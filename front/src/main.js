import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./style.css";
import './assets/base.css'
import './assets/iconfont/iconfont.css'

import axios from 'axios';
import './api/mock'

import { createPinia } from "pinia";

import { router, setupRouter } from './router'

const app = createApp(App);

app.use(router)
app.use(createPinia()); 
await setupRouter(app)

app.provide("axios", axios);

app.use(ElementPlus)

app.mount("#app");

export {axios}
