<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="interface-info-card">
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：添加模块必须先选中项目！</span>
        <el-button class="add-model-button"
                   type="warning"
                   @click="showProjectAndModel()">危</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6"
                class="project-list-col">
          <div class="project-list-col-tittle">
            <span class="project-list-col-tittle-name">项目列表：</span>
            <el-button class="project-list-col-tittle-button"
                       type="primary"
                       size="mini"
                       @click="addProjectDialog=true">新 增</el-button>
          </div>
          <el-menu class="el-menu-vertical-demo"
                   active-text-color="#409EFF"
                   :default-active="activePath">
            <el-menu-item v-for="subItem in projectList"
                          :key="subItem.project_id"
                          :index="subItem.project_id+ ''"
                          @click="getModelListMethod(subItem.project_id,subItem.project_name)">
              <template slot="title">
                <span class="sider-bar-title">{{ subItem.project_name }}</span>
              </template>
            </el-menu-item>

          </el-menu>
        </el-col>
        <el-col :span="3"
                class="project-list-col-two">
          <span> > > </span>
        </el-col>
        <el-col :span="6"
                class="project-list-col">
          <div class="project-list-col-tittle">
            <span class="project-list-col-tittle-name">模块列表:</span>
            <el-button class="project-list-col-tittle-button"
                       type="primary"
                       size="mini"
                       @click="addModelDialog = true">新 增</el-button>
          </div>
          <el-menu class="el-menu-vertical-demo"
                   active-text-color="#409EFF"
                   :default-active="activePath">
            <el-menu-item v-for="modelItem in modelList"
                          :key="modelItem.model_id"
                          :index="modelItem.model_id+''">
              <template slot="title">
                <span class="sider-bar-title">{{ modelItem.model_name }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <project-list :showPAndMListTable="showPAndMListTable"
                    :projectList="projectList" />
    </el-card>
    <!-- 新增项目对话框-->
    <el-dialog title="新增项目"
               :visible.sync="addProjectDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="addProjectDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="addProjectBody"
               :rules="addRulesForm"
               label-width="85px">
        <el-form-item label="项目名称"
                      prop="project_name">
          <el-input v-model="addProjectBody.project_name"
                    placeholder="请输入项目名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addProjectDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="createProjectMethod()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增模块对话框-->
    <el-dialog title="新增项目"
               :visible.sync="addModelDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="addModelDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addModelFormRef"
               :model="addModelBody"
               :rules="addModelRulesForm"
               label-width="85px">
        <el-form-item label="项目名称"
                      prop="project_id">
          <el-input v-model="projectName"
                    :disabled="true"
                    placeholder="请输入项目名"></el-input>
        </el-form-item>
        <el-form-item label="模块名称"
                      prop="model_name">
          <el-input v-model="addModelBody.model_name"
                    placeholder="请输入模块名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addModelDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="createModelMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ProjectList from './components/ProjectList'
export default {
  components: {
    ProjectList
  },
  data () {
    return {
      activePath: 'test',
      projectListBody: {},
      projectList: [],
      getModelListBody: {
        project_id: ''
      },
      modelList: [],
      addProjectDialog: false,
      addProjectBody: {
        project_name: ''
      },
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      },
      addModelDialog: false,
      addModelBody: {
        project_id: '',
        model_name: ''
      },
      addModelRulesForm: {
        project_name: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        project_id: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        model_name: [
          { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      },
      projectName: '',
      showPAndMListTable: false
    }
  },
  created () {
    this.getProjectListMethod()
  },
  methods: {
    // 获取所有项目列表
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    // 获取所有模块列表
    async getModelListMethod (projectId, projectName) {
      this.getModelListBody.project_id = projectId
      this.addModelBody.project_id = projectId
      this.projectName = projectName
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.modelList = responseBody.data
    },
    addProjectDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击”确认“提交前的预校验
    createProjectMethod () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.addProject(
            this.addProjectBody
          )
          if (res.code === 1) {
            this.$message.success('添加项目成功！')
            this.addProjectDialog = false
            this.getProjectListMethod()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    addModelDialogClosed () {
      this.$refs.addModelFormRef.resetFields()
    },
    createModelMethod () {
      this.$refs.addModelFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.addModel(
            this.addModelBody
          )
          if (res.code === 1) {
            this.$message.success('添加项目成功！')
            this.addModelDialog = false
            location.reload()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    showProjectAndModel () {
      this.showPAndMListTable = true
    }
  }

}
</script>
<style lang="less" scoped>
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
  .add-model-button {
    font-size: 13px;
    float: right;
  }
}
.project-list-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  .project-list-col-tittle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    border-radius: 4px;
    .project-list-col-tittle-name {
      margin-left: 10px;
      font-size: 15px;
      color: rgba(39, 56, 72, 0.85);
    }
    .project-list-col-tittle-button {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
.project-list-col-two {
  height: 650px;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
