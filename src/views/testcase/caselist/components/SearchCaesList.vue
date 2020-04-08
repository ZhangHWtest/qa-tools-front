<template>
  <!-- 搜索与添加区域-->
  <el-row :gutter="30">
    <el-col :span="8">
      <el-input placeholder="请输入内容"
                v-model="input3"
                class="input-with-select">
        <el-button slot="append"
                   icon="el-icon-search"></el-button>
      </el-input>
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
    }

  }
}
</script>
