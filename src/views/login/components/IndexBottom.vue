<template>
  <div class="index-bottom">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-github"></i>
          <span class="footer-bar-title">GitHub</span>
          <div>
            <span class="footer-title">源码仓库</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-icon_group"></i>
          <span class="footer-bar-title">团队</span>
          <div>
            <span class="footer-title">kkb.质量管理部</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-icon_secret"></i>
          <span class="footer-bar-title">反馈</span>
          <div>
            <span class="footer-title">Github Issues</span>
            <div>
              <span class="footer-title">Github Pull Requests</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="footer-title">版本：1.0.0</span>
          <div>
            <span class="footer-title">使用文档</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.index-bottom {
  z-index: 999;
  background: #373d41;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px 0px 75px 100px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #373d41;
  color: #8898aa;
  font-size: 17px;
  margin-bottom: 8px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.footer-title {
  font-size: 14px;
}
</style>
