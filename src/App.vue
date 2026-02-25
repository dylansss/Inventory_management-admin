<template>
  <!-- 全局路由入口 -->
  <router-view />
</template>

<script setup>
// App.vue 不需要额外逻辑，路由和状态都在 router 和 Pinia 中管理
</script>

<style>
/* 全局样式，可选 */
body, html, #app {
  height: 100%;
  margin: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.el-header, .el-aside, .el-main {
  padding: 0;
}
</style>