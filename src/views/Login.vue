<template>
  <el-form :model="form" style="width:300px;margin:150px auto">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import request from '../utils/request'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const form = reactive({ username: '', password: '' })
const store = useUserStore()
const router = useRouter()

const login = async () => {
  const res = await request.post('/auth/login', form)
  store.setUser(res.data.token, form.username)
  router.push('/')
}
</script>