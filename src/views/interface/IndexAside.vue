<template>
  <div>
    <el-col class="index-aside-one">
      <h2 class="index-aside-one-title">{{projectName}}</h2>
      <p style="color: #9297A3">简介：</p>
      <el-tooltip class="item"
                  effect="dark"
                  content="新增项目"
                  placement="top">
        <el-button class="add-project-button"
                   type="primary"
                   icon="el-icon-plus"
                   plain
                   @click="addProjectModelDialog = true">新增 项目</el-button>
      </el-tooltip>

    </el-col>
    <el-col class="index-aside-two">
      <el-menu class="el-menu-vertical-demo"
               :unique-opened="true"
               @open="handleOpen"
               @close="handleClose">
        <el-submenu v-for="(item) in projectList"
                    :key="item.project_name"
                    :index="item.project_id + ''">
          <template slot="title">
            <i class="el-icon-folder-opened"></i>
            <span class="sider-bar-title">{{ item.project_name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item v-for="subItem in item.subList"
                        :key="subItem.model_name"
                        :index="subItem.model_id + ''"
                        @click="getInterfaceList(item.project_id,subItem.model_id)">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span class="sider-bar-title">{{ subItem.model_name }}</span>
            </template>
          </el-menu-item>
          <el-tooltip class="item"
                      effect="dark"
                      content="新增项目"
                      placement="top">
            <el-button class="add-model-button"
                       type="primary"
                       icon="el-icon-plus"
                       plain
                       @click="addModelButton(item.project_id,item.project_name)">新增 模块</el-button>
          </el-tooltip>

        </el-submenu>
        <div>
          <el-pagination :current-page="getProjectListBody.page_num"
                         @current-change="handleCurrentChange"
                         layout=" pager"
                         :total="50">
          </el-pagination>
        </div>
      </el-menu>
    </el-col>
    <el-dialog title="新增项目"
               :visible.sync="addProjectModelDialog"
               width="45%"
               @close="addProjectModelDialogClose">
      <!-- 内容主体区域-->
      <el-form ref="addProjectModelFormRef"
               :model="addProjectModelBody"
               :rules="addProjectModelRulesForm"
               label-width="90px">
        <el-form-item label="项目名:"
                      prop="project_name">
          <el-input v-model="addProjectModelBody.project_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addProjectModelDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click.native="addProjectMethod()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增模块"
               :visible.sync="addModelDialog"
               width="45%"
               @close="addModelDialogClose">
      <!-- 内容主体区域-->
      <el-form ref="addModelFormRef"
               :model="addModelBody"
               :rules="addProjectModelRulesForm"
               label-width="90px">
        <el-form-item label="项目名:"
                      prop="project_name">
          <el-input v-model="addModelBody.project_name"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="模块名:"
                      prop="model_name">
          <el-input v-model="addModelBody.model_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addModelDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click.native="addModelMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceList'
  ],
  data () {
    return {
      projectName: '项目列表',
      page_num: 1,
      getProjectListBody: {
        page_num: 1
      },
      getModelListBody: {
        project_id: ''
      },
      getInterfaceListBody: {
        project_id: '',
        model_id: ''
      },
      projectList: [],
      modelList: [],
      childInterfaceList: [],
      addProjectModelDialog: false,
      addProjectModelBody: {
        project_name: ''
      },
      addProjectModelRulesForm: {
        project_name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        model_name: [{ required: true, message: '请输入模块名称', trigger: 'blur' }]
      },
      addModelDialog: false,
      addModelBody: {
        project_id: '',
        project_name: '',
        model_name: ''
      }
    }
  },
  created () {
    this.getProjectListMethod()
  },
  methods: {
    handleOpen (key) {
      // console.log(key)
      this.getModelListBody.project_id = Number(key)
      this.getInterfaceListBody.project_id = Number(key)
      this.getModelListMethod(key)
      this.getInterfaceListMethod()
    },
    handleClose () {
    },
    getInterfaceList (projectId, modelId) {
      this.getInterfaceListBody.project_id = projectId
      this.getInterfaceListBody.model_id = modelId
      this.getInterfaceListMethod()
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getProjectListBody.page_num = newPage
      this.getProjectListMethod()
    },
    addProjectModelDialogClose () {
      this.$refs.addProjectModelFormRef.resetFields()
    },
    addModelDialogClose () {
      this.$refs.addModelFormRef.resetFields()
    },
    // 获取所有项目列表
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data.map(item => {
        item.subList = []
        return item
      })
      // console.log(this.projectList)
    },
    // 获取所有模块列表
    async getModelListMethod (key) {
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      let index = this.projectList.findIndex(item => Number(item.project_id) === Number(key))
      // console.log(index, this.projectList, this.projectList[index])
      this.$set(this.projectList, index, { ...this.projectList[index], subList: responseBody.data })
      // console.log(this.projectList)
    },
    // 获取接口列表方法
    async getInterfaceListMethod () {
      if (this.getInterfaceListBody.project_id === '') {
        delete this.getInterfaceListBody.project_id
      }
      if (this.getInterfaceListBody.model_id === '') {
        delete this.getInterfaceListBody.model_id
      }
      window.sessionStorage.setItem('interFaceProjectId', this.getInterfaceListBody.project_id)
      window.sessionStorage.setItem('interFaceModelId', this.getInterfaceListBody.model_id)
      console.log(this.getInterfaceListBody)
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.childInterfaceList = responseBody.data
        this.$emit('listenChildInterfaceList', this.childInterfaceList)
      }
    },
    // 新建项目
    async addProjectMethod () {
      const { data: res } = await this.$api.project.addProject(
        this.addProjectModelBody
      )
      if (res.code === 1) {
        this.$message.success('添加项目成功！')
        this.addProjectModelDialog = false
        this.getProjectListMethod()
      } else { this.$message.error(res.msg) }
    },
    // 新建模块，前置方法
    addModelButton (projectId, projectName) {
      this.addModelDialog = true
      this.addModelBody.project_id = projectId
      this.addModelBody.project_name = projectName
    },
    // 新建模块
    async addModelMethod () {
      delete this.addModelBody.project_name
      const { data: createModelRes } = await this.$api.project.addModel(
        this.addModelBody
      )
      if (createModelRes.code === 1) {
        this.$message.success('添加模块成功！')
        this.addModelDialog = false
      } else {
        this.$message.error('添加模块失败！')
      }
      this.getModelListMethod(this.addModelBody.project_id)
    }
  }

}
</script>
<style lang="less" scoped>
.index-aside-one {
  height: 150px;
  background-color: #373d41;
  // display: inline-block;
  .index-aside-one-title {
    color: #fff;
  }
  .add-project-button {
    height: 25px;
    width: 95%;
    line-height: 0;
    padding: 3px;
  }
}
.index-aside-two {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 1px;
  .add-model-button {
    height: 25px;
    width: 90%;
    margin-left: 5%;
    margin-top: 5px;
    margin-bottom: 5px;
    line-height: 0;
    padding: 3px;
  }
}
.index-aside-Three {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 1px;
  .index-aside-Three-pagination {
    margin-top: 0px !important;
  }
}
.change-pagenum {
  height: 25px;
  width: 25%;
  margin-left: 5%;
  padding: 3px;
  margin-bottom: 15px;
}
.el-menu-item.is-active {
  border-right: 2px solid #409eff;
}
</style>
