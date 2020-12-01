<template>
  <!-- 搜索与添加区域-->
  <div class="interface-top-addbutton">
    <el-button type="primary" class="add-button" @click="showDialogMethod()">
      新增环境
    </el-button>
  </div>
</template>

<script>
export default {
  props: [
    'showDialog'
  ],
  data() {
    return {
      input: ''
    }
  },
  created() {
  },
  methods: {
    showDialogMethod() {
      this.$emit('listenToChildShowDialog', true)
      window.sessionStorage.removeItem('env_id')
    }

  }
}
</script>

<style scoped lang="less">
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-button {
    font-size: 13px;
    float: right;
  }
}
</style>
