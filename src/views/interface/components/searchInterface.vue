<template>
  <div>
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
    <!-- 对话框-->
    <el-dialog title="新增接口"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="addInterfaceData"
               :rules="addRulesForm"
               label-width="85px">
        <el-form-item label="项目名称"
                      prop="model_name">
          <el-select :model="addInterfaceData.project_id"
                     placeholder="全部">
            <el-option v-for="item in projectList"
                       :key="item.project_id"
                       :label="item.project_name"
                       :value="item.project_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editModelById()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
      },
      addInterfaceData: {
        project_id: 1
      },
      addRulesForm: {
        model_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      },
      addDialogVisible: false
    }
  },
  methods: {
    selectProjectMethod () {
      this.$emit('listenChildSelectProject', this.defulProject)
    },
    selectModelMethod () {
      this.$emit('listenChildSelectModel', this.defulProject, this.defulModel)
    },
    addInterfaceInfo () {
      this.addDialogVisible = true
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
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
