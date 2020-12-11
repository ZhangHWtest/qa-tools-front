<template>
  <div>
    <el-header>
      <div>
        <img src="@/assets/bsy-logo.png">
        <span>BSYQaTools</span>
      </div>
      <div class="header-button">
        <i class="iconfont icon-icon_secret" style="padding:10px" />
        <i class="iconfont icon-github" />
      </div>
    </el-header>
    <my-video />

    <login-introduce />
    <!--登录区域 -->
    <div class="login_box">
      <span class="login_title">BSYQaTools</span>
      <el-form ref="loginFormRef" :model="loginForm" class="login_form" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-footer>
      <index-bottom />
    </el-footer>
  </div>
</template>

<script>
import IndexBottom from './components/IndexBottom'
import MyVideo from './components/MyVideo'
import LoginIntroduce from './components/LoginIntroduce'
import Cookies from 'js-cookie'
export default {
  components: {
    IndexBottom,
    MyVideo,
    LoginIntroduce
  },
  data() {
    return {
      loginForm: {
        username: 'zadmin',
        password: '111111'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid);
        const { data: res } = await this.$api.login.login(this.loginForm)
        if (res.code !== 1) {
          return this.$message.error('登录失败！请检查账号信息！')
        }
        window.sessionStorage.setItem('loginName', res.data.user)
        window.sessionStorage.setItem('token', res.data.token)
        Cookies.set('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  height: 50px !important;
  background-color:#283443;
  // background-color: #FBFBFB;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-right: 25px;
    img {
      width: 120px;
      height: 100%;
      background-color:#283443;
      margin-left: 40px;
      margin-right: 10px;
    }
    span {
      font-size: 30px;
      padding-left: 5px;
      border-left: 0.1px solid #ffffff;
    }
  }
}
.header-button {
  display: flex;
  flex-direction: row-reverse;
  right: 55px;
  position: absolute;
  width: 10%;
  .login-button {
    margin-left: 20px;
    font-size: 20px;
  }
}
.login_box {
  z-index: 998;
  width: 350px;
  height: 300px;
  background: rgba(0, 0, 0, 0.3) none repeat scroll !important;
  /* rgba(0, 0, 0, 0.2) 前三个确定颜色，最后0.2确定透明度 */
  /*实现FireFox背景透明，文字不透明*/
  background: #ffffff;
  filter: Alpha(opacity=20);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -75%);
  .login_title {
    font-family:  "Helvetica Neue";
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    font-size: 45px;
    color: #fff;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.el-footer {
  padding: 0 0;
}
</style>
