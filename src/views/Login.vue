<template>
  <div class="base-login-wraps">
    <div class="base-dwo">
      <div class="base-logo">
        <!-- <img src="@/assets/images/logo_tu.png" alt="Logo" class="logo-img" /> -->
      </div>
      <div class="base-login-box">
        <div class="user-login">
          用户登录<span class="min-title">欢迎使用福庆库存管理系统</span>
        </div>
        <el-form :model="form" :label-width="90" style="width:300px;margin:150px auto">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" />
          </el-form-item>

          <el-form-item label="">
            <!-- <base-button @click="register">注册</base-button> -->
            <base-button @click="login">登录</base-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
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
const register = async () => {
  try {

    const res = await request.post('/auth/register', form)
    login()
  } catch (error) {

  }
}
</script>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/login-bigbg.png) 100% 80% no-repeat;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  position: relative;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.base-login-wraps {
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/login-bigbg.png) 100% 10% no-repeat;
  background-size: cover;
  /* 改为flex布局居中显示子元素 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .base-dwo {
    width: 70%;
    height: 60%;
    display: flex;
    transition: 0.2s ease;
    z-index: 9999;
    transition-delay: 0.3s;
    box-sizing: border-box;

    .base-logo {
      width: 55%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px 0px 0px 20px !important;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
      position: relative;
      z-index: 1;

      .logo-img {
        padding: 20px;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        /* 保持图片比例，适应容器 */
        position: relative;
        z-index: 2;
      }
    }

    .base-login-box {
      background: #FFFFFF;
      box-shadow: 0px 4px 24px 0px rgba(104, 139, 247, 0.1);
      border-radius: 0px 20px 20px 0px;
      padding: 40px 60px;
      width: 45%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;

      .user-login {
        font-size: 32px;
        font-weight: 600;
        color: #2d3d4f;
        letter-spacing: 0.04em;

        .min-title {
          margin-left: 15px;
          color: #666666;
          font-size: 16px;
          font-weight: 400;
        }
      }

      .login-form {
        width: 100%;
      }
    }

    .auto-login {
      color: #34404b;
      font-size: 12px;
    }

    .user-login {
      height: 45px;
      font-size: 32px;
      font-weight: 600;
      line-height: 45px;
      color: #0054d9;
      letter-spacing: 6px;
    }

  }


}
</style>
