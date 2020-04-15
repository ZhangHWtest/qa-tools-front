<template>
  <!-- 搜索与添加区域-->
  <el-row :gutter="30">
    <el-col :span="12">
      <span class="select-title">项目名称：</span>
      <el-select v-model="defulProject"
                 placeholder="全部"
                 @change="selectProjectMethod()">
        <el-option v-for="item in projectList"
                   :key="item.project_id"
                   :label="item.project_name"
                   :value="item.project_id">
        </el-option>
      </el-select>
      <span class="select-title">模块名称：</span>
      <el-select v-model="defulModel"
                 placeholder="全部"
                 @change="selectModelMethod()">
        <el-option v-for="item in modelList"
                   :key="item.model_id"
                   :label="item.model_name"
                   :value="item.model_id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary"
                 plain
                 @click="addInterfaceInfo()">新增接口</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: [
    'projectList',
    'modelList'
  ],
  data () {
    return {
      defulProject: '',
      defulModel: '',
      getModelListBody: {
        project_id: ''
      }
    }
  },
  methods: {
    selectProjectMethod () {
      this.$emit('listenChildSelectProject', this.defulProject)
    },
    selectModelMethod () {
      this.$emit('listenChildSelectModel', this.defulProject, this.defulModel)
    }
  }
}
</script>
<style lang="less" scoped>
.project-model-elect {
  width: 100%;
}
.select-title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 12px;
}
</style>
