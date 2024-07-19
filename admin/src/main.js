import '@unocss/reset/tailwind.css'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupNaiveDiscreteApi, setupNaiveUnocss } from './utils'
import { setupRouter } from './router'
import { setupStore } from './store'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app) // 优先级最高
  setupNaiveUnocss()
  setupNaiveDiscreteApi()
  await setupRouter(app)
  // 启用 Vue 的 JSX 模式
  app.config.isCustomElement = tag => tag.startsWith('n'); // 如果有自定义元素需要使用
  app.config.compilerOptions = {
    isCustomElement: tag => tag.startsWith('n') // 如果有自定义元素需要使用
  };
  app.mount('#app')
}

bootstrap()
