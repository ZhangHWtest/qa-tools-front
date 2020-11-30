<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>UI管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <ui-search-component />
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：添加case必须先选择平台、端！</span>
        <el-button
          class="add-model-button"
          type="primary"
          :disabled="buttonDisabled"
          @click="goAddCaseInfo()"
        >
          新增 用例
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import UiSearchComponent from '@/components/UiSearchComponent/index'
export default {
  inject: ['reload'],
  components: {
    UiSearchComponent
  },
  data() {
    return {
      buttonDisabled: true
    }
  }
}
</script>
<style  lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    margin-right: 10px;
    float: right;
  }
}
</style>
