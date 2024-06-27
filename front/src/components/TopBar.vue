<template>

  <el-image
      src="/src/assets/topBar.png"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 15%; z-index: 998;"
      alt="Top Bar"
  />

  <el-menu class="topBar" router :default-active="route.fullPath" mode="horizontal" :ellipsis="false">
    <div class="弹性盒子" :style="{ flexGrow: 1 }" />

    <el-menu-item style="position: absolute; left: 2%; height: 100%;" index="0">
      <el-image style="width: 100%; height: 100%;" src="/src/assets/sysu.png"/>
    </el-menu-item>

    <template v-for="item in menuItems">
      <template v-if="item.mainMenu === 'noSub'">
        <el-menu-item :index="item.index" class="menu">{{ item.label }}</el-menu-item>
      </template>

      <template v-if="item.mainMenu === 'hasSub'">
        <el-sub-menu :index="item.index" class="menu">
          <template #title>
            <span class="menu-title">{{ item.label }}</span>
          </template>
          <template v-for="subItem in menuItems">
            <el-menu-item :index="item.index + '?category=' + subItem.index"
                          v-if="subItem.mainMenu == item.index" class="submenu-item">
              {{ subItem.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>

      </template>
    </template>

    <el-menu-item style="position: absolute; right: 2%; height: 100%; border-radius: 10px;" index="0">
      <el-row>
        <el-col :span="8">
          <el-image style="width: 90%; height: auto; top: -10%;" src="/src/assets/avatar.png"/>
        </el-col>
        <el-col :span="8">
          <div class="user" @click.stop="handleUserClick">用户</div>
        </el-col>
        <el-col :span="8">
          <div class="logout" @click.stop="handleLogoutClick">退出</div>
        </el-col>
      </el-row>
    </el-menu-item>

    <div class="弹性盒子" :style="{ flexGrow: 1 }" />
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute, useRouter} from 'vue-router'
// 导入菜单选项配置文件
import config from '../config/config.json';
import Cookies from 'js-cookie'
import { AuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = AuthStore()

interface MenuItem {
  index: string;
  label: string;
  mainMenu: string;
}

const menuItems = config.menuItems as MenuItem[]

const handleUserClick = () => {
  router.push({ path: "/info" })
}

const handleLogoutClick = () => {
  // 删除cookie
  Cookies.remove('authToken')
  Cookies.remove('SID')
  // 跳转到登录页面
  authStore.logout()
}
</script>

<style lang="scss" scoped>
.topBar {
  position: fixed;
  top: 2.5%;
  height: 10%;
  left: 10%;
  right: 10%;
  z-index: 999;
  border: none;
  background: rgba(0, 0, 0, 0.0);
}

.menu {
  font-size: 18px;
  font-weight: bold;
  border: 0;
  color: #ffffff;
}

.menu-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff; /* 白色字体 */
}

.submenu-item {
  font-size: 16px;
  font-weight: bold;
  color: #000000; /* 黑色字体 */
  text-align: center; /* 水平居中 */
  min-width: 135px !important;
}

.el-sub-menu .el-sub-menu__title {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.el-menu--horizontal.el-menu {
  border-bottom: 0;
}

.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 135px !important;
}


.user {
  z-index: 999;
  display: flex;
  font-size: 18px;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}

.user:hover {
  color: #0066ff; /* 鼠标悬停时的颜色 */
  cursor: pointer; /* 鼠标悬停时的光标样式 */
}

.logout {
  z-index: 999;
  margin-left: 10px;
  display: flex;
  font-size: 18px;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}

.logout:hover {
  color: #0066ff; /* 鼠标悬停时的颜色 */
  cursor: pointer; /* 鼠标悬停时的光标样式 */
}
</style>
