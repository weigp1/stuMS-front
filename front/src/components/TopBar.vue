<template>
  <!-- 顶部导航栏的外层容器 -->

  <!-- 使用Element UI的el-menu组件来创建导航栏 -->
  <el-menu class="topBar" router :default-active="this.$route.fullPath" mode="horizontal" :ellipsis="false">

    <!-- 左侧的标题图片 -->
    <el-menu-item style="position: absolute; left: 2%; height: 100%;" index="0">
      <el-image style="width: 75%; height: auto;" src="/src/assets/sysu.png"/>
    </el-menu-item>

    <!-- 左右两侧的弹性盒子，用于自动填充剩余空间 -->
    <div class="弹性盒子" :style="{ flexGrow: 1 }" />

    <!-- 遍历menuItems数组，渲染菜单项 -->
    <template v-for="item in menuItems">

      <!-- 如果当前菜单项没有子菜单 -->
      <template v-if="item.mainMenu === 'noSub'">
        <!-- 渲染一个el-menu-item -->
        <el-menu-item :index="item.index" class="menu">{{ item.label }}</el-menu-item>
      </template>

      <!-- 如果当前菜单项有子菜单 -->
      <template v-if="item.mainMenu === 'hasSub'">
        <!-- 渲染一个el-sub-menu -->
        <el-sub-menu :index="item.index">
          <!-- 设置子菜单的标题 -->
          <template #title>{{ item.label }}</template>
          <!-- 遍历子菜单项 -->
          <template v-for="subItem in menuItems">
            <el-menu-item :index="item.index + '?category=' + subItem.index"
                          v-if="subItem.mainMenu == item.index">
              {{ subItem.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>

    </template>

    <!-- 右侧的弹性盒子，用于自动填充剩余空间 -->
    <div class="弹性盒子" :style="{ flexGrow: 1 }" />
  </el-menu>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
// 导入菜单选项配置文件
import config from '../config/config.json';

interface MenuItem {
  index: string;
  label: string;
  mainMenu: string;
}

export default defineComponent({
  name: 'TopBar',
  data() {
    return {
      menuItems: config.menuItems as MenuItem[]
    }
  },
});
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
  color: #ffffff;
}

//.sub-menu {
//  font-size: 16px;
//  font-weight: bold;
//  color: #078d18;
//}

</style>