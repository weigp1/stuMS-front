# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

后台：
- 鉴权使用 JWT
- 权限管理使用 CASBIN，实现基于 RBAC 的权限管理
- 支持动态权限修改，前端菜单由后端生成（动态路由）
- 文章编辑使用 Markdown 编辑器
- 常规后台功能齐全：侧边栏、面包屑、标签栏等
- 实现记录操作日志功能（GET 不记录）
- 实现监听在线用户、强制下线功能
- 文件上传支持七牛云、本地（后续计划支持更多）
- 对 CRUD 操作封装了通用 Hook
- 前端使用 Nginx


后台admin前端技术栈: 使用 pnpm 包管理工具
- 基于 TypeScript
- Vue3
- VueUse: 服务于 Vue Composition API 的工具集
- Unocss: 原子化 CSS
- Pinia
- Vue Router 
- Axios 
- Naive UI
- ...


其他:
- 七牛云对象存储
- ...

代码仓库目录：
```bash
STUMS
├── admin      -- 后台前端
├── deploy              -- 部署

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
├── settings         -- 项目配置
├── build            -- 构建相关的配置
├── public           -- 公共资源, 在打包后会被加到 dist 根目录
├── package.json 
├── package-lock.json
├── index.html
├── tsconfig.json
├── unocss.config.ts -- unocss 配置
└── vite.config.ts   -- vite 配置
├── .env             -- 通用环境变量
├── .env.development -- 开发环境变量
├── .env.production  -- 线上环境变量
├── .gitignore
├── .editorconfig    -- 编辑器配置

部署目录：简略版

```
deploy
├── build      -- 镜像构建
│   ├── mysql  -- mysql 镜像构建
│   ├── server -- 后端镜像构建 (基于 gin-blog-server 目录)
│   └── web    -- 前端镜像构建 (基于前端项目打包的静态资源)
└── start
    ├── docker-compose.yml    -- 多容器管理
    └── .env                  -- 环境变量
    └── ...
```

## 环境介绍

### 线上环境

服务器：腾讯云 2核 4G Ubuntu 22.04 LTS

对象存储：七牛云

### 开发环境

| 开发工具                       | 说明                    |
| ----------------------------- | ----------------------- |
| Vscode                        | Java 后端 +  Vue 前端 |
| Navicat                       | MySQL 远程连接工具      |
| Another Redis Desktop Manager | Redis 远程连接工具      |
<!-- | MobaXterm                     | Linux 远程工具          | -->
| Apifox                        | 接口调试 + 文档生成     |

| 开发环境 | 版本 |
| -------- | ---- |
| Java     |      |
| MySQL    | 8.x  |
| Redis    | 7.x  |

### VsCode 插件

目前推荐安装插件已经写到 `.vscode/extensions.json` 中，使用 VsCode 打开项目会推荐安装。

> 注意，一定要用 VsCode 打开 admin 这个前端项目，而不是打开 STUMS 目录！

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
cd gin-blog-admin

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