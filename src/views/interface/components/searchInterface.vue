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
                 @click="goInterfaceInfo()">新增接口</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created () {

  },
  data () {
    return {
      input3: ''
    }
  },
  methods: {
    // 点击跳转至InterfaceInfo页面
    goInterfaceInfo () {
      this.$router.push({ path: '/interface/info' })
      window.sessionStorage.removeItem('interface_id')
      // this.$store.commit('deleteInterfaceId')
    }

  }
}
</script>
