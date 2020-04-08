<template>
  <div>
    <el-header>
      <div>
        <img src="@/assets/kkblogo.png" />
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#373d41"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">项目管理</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">用户管理</el-menu-item>
          <el-menu-item index="4">设置</el-menu-item>
        </el-menu>
      </div>
      <el-dropdown class="user-dropdown">
        <el-avatar :size="35"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="el-dropdown-link">
          {{ loginname.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updatePasword = true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
export default {
  props: [
    'loginname'
  ]

}
</script>

<style lang="less" scoped>
.el-header {
  height: 50px !important;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  .el-menu-demo {
    width: 100%;
  }
  > div {
    display: flex;
    align-items: center;
    margin-right: 25px;
    span {
      margin-left: 15px;
    }
    img {
      width: 120px;
      height: 100%;
      background-color: #373d41;
      margin-left: 40px;
      margin-right: 40px;
    }
  }
}
.el-dropdown-link {
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  color: #fff;
  font-size: 15px;
}
</style>
