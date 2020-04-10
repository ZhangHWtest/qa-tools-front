<template>
  <!-- 搜索与添加区域-->
  <el-row :gutter="30">
    <el-col :span="6">
      <span>搜索：</span>
      <el-select v-model="value"
                 multiple
                 filterable
                 remote
                 reserve-keyword
                 placeholder="联级搜索"
                 :remote-method="remoteMethod"
                 :loading="loading">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
                 plain
                 @click="goCaseInfo()">新增用例</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: [
    'getcaseListBody'
  ],
  created () {
  },
  data () {
    return {
      input3: ''
    }
  },
  methods: {
    // 点击跳转至InterfaceInfo页面
    goCaseInfo () {
      this.$router.push({ path: '/case/info' })
      window.sessionStorage.removeItem('case_id')
    }

  }
}
</script>
