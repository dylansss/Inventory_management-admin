<template>
  <el-container style="height:100vh">
    <el-aside width="200px">
      <el-menu router>
        <el-menu-item index="/sku">商品管理</el-menu-item>
        <el-menu-item index="/stock">库存管理</el-menu-item>
        <el-menu-item index="/logs">操作记录</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="display:flex;justify-content:space-between">
        <h3>库存管理系统</h3>
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

const logout = () => {
  user.logout()
  router.push('/login')
}
</script>