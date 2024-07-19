# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur



后台：
- 鉴权使用 JWT
- 常规后台功能齐全：侧边栏、面包屑、标签栏等
- 对 CRUD 操作封装了通用 Hook
- 
其他：
- 采用 Restful 风格的 API
- 代码整洁层次清晰，利于开发者学习
- 技术点新颖，代码轻量级，适度封装

后台admin前端技术栈: 使用 pnpm 包管理工具
- 基于 TypeScript
- Vue3
- VueUse: 服务于 Vue Composition API 的工具集
- Unocss: 原子化 CSS (https://unocss.nodejs.cn/config/) 
- Pinia
- Vue Router 
- Axios 
- Naive UI
- ...

// 安装unocss和三个预设，第一个是工具类预设，第二个是属性化模式支持，第三个是icon支持
// pnpm i -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons


代码仓库目录：
```bash
STUMS
├── admin      -- 后台前端

前端目录：简略版

```
admin 目录结构(front可通用)
├── src              
│   ├── api             -- 接口
│   ├── assets          -- 静态资源
│   ├── styles          -- 样式
│   ├── components      -- 组件
│   ├── composables     -- 组合式函数
│   ├── router          -- 路由
│   ├── store           -- 状态管理
│   ├── utils           -- 工具方法
│   ├── views           -- 页面
│   ├── App.vue
│   └── main.js
├── public           -- 公共资源
├── package.json 
├── pnpm-lock.yaml
├── index.html
├── tsconfig.json
├── unocss.config.ts -- unocss 配置
└── vite.config.ts   -- vite 配置
├── .env             -- 通用环境变量
├── .env.development -- 开发环境变量
├── .gitignore

## 环境介绍

### 开发环境

| 开发工具                       | 说明                    |
| ----------------------------- | ----------------------- |
| Vscode                        | Vue 前端 |
| Navicat                       | MySQL 远程连接工具      |


### VsCode 插件

前端必备插件：

| 插件 | 作用 |
| -------- | ---- |
| Volar   | Vue 官方插件 |
| UnoCSS | Unocss 官方插件 |
| Iconify IntelliSense | Iconify 提示插件 |

其他插件：（个人推荐，用于提升开发体验）

| 名称 | 作用 |
| -------- | ---- |
| Better Comments   | 优化代码注释显示效果 |
| TODO Highlight | 高亮 TODO |
| Highlight Matching Tag | 高亮匹配的标签 | 


前端项目运行： 本admin项目使用 pnpm 进行包管理，建议全局安装 pnpm

```bash
npm install -g pnpm
```

后台前端：

```bash
# 1、进入后台前端项目根目录
cd admin

# 2、安装依赖
pnpm install

# 3、运行项目
pnpm dev
```

## 更新日志

描述规范定义，有以下几种行为 ACTION:
- `FIX`: 修复
- `REFINE`: 优化
- `COMPLETE`: 完善
- `ADD`: 新增

---

2024-4-9

admin：
- ADD  新增前端admin文件框架、侧边栏、标签页