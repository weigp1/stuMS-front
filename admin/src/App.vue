
<!-- 这个文件是一个 Vue.js 组件文件，名为 App.vue。它是 Vue.js 应用的主组件，通常作为所有其他组件的父组件。

在 <script setup> 标签中，导入了一些必要的库和模块，包括 Vue.js 的生命周期钩子 onMounted，naive-ui UI 库的一些组件和主题，highlight.js 代码高亮库以及一些自定义的 store 和 API。

hljs.registerLanguage('json', json) 这行代码注册了 JSON 语言的高亮规则。

const themeStore = useThemeStore() 这行代码创建了一个主题 store 的实例，用于管理应用的主题状态。

注释掉的 onMounted 钩子函数中，原本在组件挂载后会调用 api.report() 上报用户信息，但现在这部分代码被注释掉了。

在 <template> 标签中，定义了组件的 HTML 结构。使用了 NConfigProvider 组件作为根元素，它是 naive-ui 库的配置提供者，用于设置整个应用的主题、本地化和代码高亮等配置。

RouterView 组件是 Vue Router 的路由视图，它会根据当前的路由显示对应的组件。v-slot="{ Component }" 是一个插槽，用于获取当前路由对应的组件，然后通过动态组件 <component :is="Component" /> 将其渲染出来。

总的来说，这个 App.vue 组件是整个 Vue.js 应用的主组件，它设置了应用的主题和本地化配置，注册了代码高亮规则，并通过路由视图渲染出当前路由对应的组件。 -->


<script setup>
import { onMounted } from 'vue'
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
// import hljs from 'highlight.js/lib/core'
// import json from 'highlight.js/lib/languages/json'

import { useAuthStore, useThemeStore } from '@/store'
import themes from '@/assets/themes'
import api from '@/api'

// hljs.registerLanguage('json', json)
const themeStore = useThemeStore()

// onMounted(() => {
//   const { accessToken } = useAuthStore()
//   accessToken && api.report() // 上报用户信息
// })

// FIXME: 每次 Docker 打包完运行会继承之前的 localStorage
// TODO: 每次如果发现当前没有路由信息，就跳转到登录页
</script>

<template>
  <NConfigProvider
    class="h-full w-full"
    :theme="themeStore.darkMode ? darkTheme : undefined"
    :theme-overrides="themes.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </NConfigProvider>
</template>


<!-- RouterView组件在Vue Router中用于渲染当前路由对应的组件。它并不直接依赖于某个特定的路由变量，而是依赖于Vue Router的内部状态。

在你的项目中，Vue Router的实例是在index.js文件中创建的，代码如下：router = createRouter

这个router实例管理着所有的路由状态，包括当前的路由。当路由发生变化时，Vue Router会自动更新其内部状态，RouterView组件会感知到这个变化，并渲染新路由对应的组件。 -->
