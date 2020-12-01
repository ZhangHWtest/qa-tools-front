<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>环境管理</el-breadcrumb-item>
      <el-breadcrumb-item>环境列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="env-list-main">
      <!-- 卡片视图区域-->
      <el-card>
        <div>
          <search-env @listenToChildShowDialog="showAddDialog" />
          <env-table
            :env-list="envList"
            :page-num="getenvBody.page_num"
            :page-total="pageTotal"
            @listenToChildRemoveEnv="removeEnvById"
            @listenToChildShowDialog="showEditDialog"
            @listenToChildGetEnvinfo="getEnvInfo"
            @listenToChildPageNum="newPage"
          />
          <dialog-form
            title="新增环境："
            :show-form="addDialogVisible"
            @listenToChildShowDialog="showAddDialog"
            @listenToChildSaveEnvMethod="addEnvMethod"
          />
          <dialog-form
            title="编辑环境："
            :show-form="editialogVisible"
            :model="editEnvData"
            @listenToChildShowDialog="showEditDialog"
            @listenToChildSaveEnvMethod="editEnvMethod"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import SearchEnv from './components/SearchEnv'
import EnvTable from './components/EnvTable'
import DialogForm from './components/DialogForm'
export default {
  components: {
    EnvTable,
    SearchEnv,
    DialogForm
  },
  data() {
    return {
      addDialogVisible: false,
      editialogVisible: false,
      addEnvData: {},
      editEnvData: {},
      getEnvInfoData: {
        env_id: ''
      },
      pageTotal: 1,
      getenvBody: {
        page_num: 1
      },
      envList: [],
      envbody: {
        env_id: ''
      }
    }
  },
  created() {
    this.envListMethod()
  },
  methods: {
    showAddDialog(value) {
      this.addDialogVisible = value
    },
    showEditDialog(value) {
      this.editialogVisible = value
    },
    getEnvInfo(id) {
      this.getEnvInfoData.env_id = id
      this.getEnvInfoMethod()
    },
    newPage(newPage) {
      this.getenvBody.page_num = newPage
      this.envListMethod()
    },
    // 创建env
    async addEnvMethod(createEnvBody) {
      this.addEnvData = createEnvBody
      const { data: responseBody } = await this.$api.environment.addEnv(
        this.addEnvData
      )
      if (responseBody.code === 1) {
        this.$message.success('添加成功！')
        this.addDialogVisible = false
      } else {
        this.$message.error('添加失败！')
      }
      this.envListMethod()
    },
    // 修改
    async editEnvMethod(editEnvBody) {
      delete editEnvBody.create_user
      this.editEnvData = editEnvBody
      const { data: responseBody } = await this.$api.environment.editEnv(
        this.editEnvData
      )
      if (responseBody.code === 1) {
        this.$message.success('修改成功！')
        this.editialogVisible = false
      } else {
        this.$message.error('修改失败！')
      }
      this.envListMethod()
    },
    async envListMethod() {
      const { data: responseBody } = await this.$api.environment.getEnvironmentList(
        this.getenvBody
      )
      if (responseBody.code === 1) {
        this.envList = responseBody.data
        this.pageTotal = responseBody.page_total_num * 10
      } else {
        this.$message.error('请求环境信息失败！')
      }
    },
    async getEnvInfoMethod() {
      const { data: responseBody } = await this.$api.environment.infoEnv(
        this.getEnvInfoData
      )
      if (responseBody.code === 1) {
        this.editEnvData = responseBody.data
      }
    },
    async removeEnvById(id) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      this.envbody.env_id = id
      const { data: responseBody } = await this.$api.environment.removeEnv(
        this.envbody
      )
      if (responseBody.code === 1) {
        this.$message.success('删除成功！')
        this.envListMethod()
      } else {
        this.$message.error('删除失败！')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.env-list-main {
  margin: 15px;
}
</style>
