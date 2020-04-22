<template>
  <el-menu class="el-menu-top"
           mode="horizontal"
           :router="true"
           :default-active="activePath">
    <el-menu-item index="/casechart"
                  route="/casechart"
                  @click="saveNavState('/casechart')">
      <i class="iconfont icon-tradingvolume"></i>
      <span slot="title">数据图标</span></el-menu-item>
    <el-menu-item index="/interface"
                  route="/interface"
                  @click="saveNavState('/interface')">
      <i class="iconfont icon-icon_renwujincheng"></i>
      <span slot="title">接 口</span></el-menu-item>
    <el-menu-item index="/user/list"
                  route="/user/list"
                  @click="saveNavState('/user/list')">
      <i class="iconfont icon-icon_signal"></i>
      <span slot="title">用 户</span>
    </el-menu-item>
    <el-menu-item index="/environment/list"
                  route="/environment/list"
                  @click="saveNavState('/environment/list')">
      <i class="iconfont icon-icon_setting"></i>
      <span slot="title">设 置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      activePath: '/casechart'
    }
  },
  methods: {
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu-top {
  height: 45px;
  padding-left: 5px;
}
.el-menu--horizontal {
  .el-menu-item {
    float: left;
    height: 45px;
    line-height: 45px;
  }
}
</style>
