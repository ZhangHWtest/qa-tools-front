<template>
  <!-- 搜索与添加区域-->
  <el-row :gutter="30">
    <el-col :span="8">
      <el-input placeholder="请输入内容"
                v-model="input"
                class="input-with-select">
        <el-button slot="append"
                   icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
                 plain
                 @click="showDialogMethod()">新增环境</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: [
    'showDialog'
  ],
  created () {
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    showDialogMethod () {
      this.$emit('listenToChildShowDialog', true)
      window.sessionStorage.removeItem('env_id')
    }

  }
}
</script>
