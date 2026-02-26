<template>
  <el-container class="layout" style="height:100vh">
    <div class="sidebar-container">
      <div class="title">
        库存管理系统
      </div>
      <el-aside width="240px">
        <el-menu router :default-active="currentRoute" class="el-menu-vertical-demo" background-color="transparent"
          text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/sku">商品管理</el-menu-item>
          <el-menu-item index="/stock">库存管理</el-menu-item>
          <el-menu-item index="/logs">操作记录</el-menu-item>
        </el-menu>
      </el-aside>
    </div>
    <el-container class="main-container">
      <el-header>
        <div>
          {{ user.username }}
          <el-button type="text" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const currentRoute = router.currentRoute.value.path
const logout = () => {
  user.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout {
  .sidebar-container {
    background: url(../assets/imgs/system/sidebarbgw.png) no-repeat;
    background-size: 100% 100%;
    width: 240px;

    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }

    .el-aside {
      background: linear-gradient(270deg,
          #014580 0%,
          rgba(1, 68, 128, 0) 100%);
    }

    .el-menu {
      background: transparent;
      border-right: none;

      .el-menu-item {
        color: #fff;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        &.is-active {
          background: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }

  .main-container {
    display: flex;
    flex-direction: column;

    .el-header {
      height: 50px;
      overflow: hidden;
      position: relative;
      background: linear-gradient(180deg, rgba(224, 234, 255, 0.7) 0%, rgba(242, 246, 252, 0.7) 100%);
      box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

      div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;

        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>