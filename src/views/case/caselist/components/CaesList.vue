<template>
  <div>
    <div>
      <search-component
        :parent-input-name="inputName"
        :parent-is-show-interface-select="parentIsShowInterfaceSelect"
        @changeChildValueMethod="changeChildValueMethod"
      />
    </div>
    <div class="interface-top-addbutton">
      <span class="interface-top-addannotation">注：添加、批量运行case必须先选择接口！</span>
      <el-button class="add-model-button" type="success" :disabled="RunButtonDisabled" @click="runMultipleCaseMethod()">
        批量 运行
      </el-button>
      <el-button
        class="add-model-button"
        type="primary"
        :disabled="buttonDisabled"
        @click="goAddCaseInfo()"
      >
        新增 用例
      </el-button>
    </div>
    <el-table
      class="interface-table"
      :data="caseList"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55px"
      />
      <el-table-column
        width="70px"
        label="id"
        prop="case_id"
      />
      <el-table-column
        label="用例名称"
        prop="case_name"
      />
      <el-table-column
        label="接口类型"
        prop="case_type"
      />
      <el-table-column
        label="接口方法"
        prop="method"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.method === 'GET'"
            class="show-interface-colname"
          >
            <el-tag>{{ scope.row.method }}</el-tag>
          </span>
          <span
            v-else-if="scope.row.method === 'POST'"
            class="show-interface-colname"
          >
            <el-tag type="success">{{ scope.row.method }}</el-tag>
          </span>
          <span
            v-else
            class="show-interface-colname"
          >
            <el-tag type="warning">{{ scope.row.method }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="接口路径"
        prop="path"
      />
      <el-table-column
        label="创建人"
        prop="create_user"
      />
      <el-table-column
        label="操作"
        width="200px"
      >
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="修改"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="goEditCaseInfo(scope.row.case_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="运行"
            placement="top"
          >
            <el-button
              type="success"
              icon="el-icon-caret-right"
              size="mini"
              circle
              @click="runSingleCaseMethod(scope.row.case_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="日志"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-tickets"
              size="mini"
              circle
              @click="goCaseLog(scope.row.case_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="复制"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-copy-document"
              size="mini"
              circle
              @click="copyCaseMethod(scope.row.case_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="removeCaseById(scope.row.case_id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="getcaseListBody.page_num"
      layout="prev, pager, next"
      :total="caseListTotal"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import SearchComponent from '@/components/SearchComponent/index'
export default {
  inject: ['reload'],
  components: {
    SearchComponent
  },
  data() {
    return {
      inputName: '用例',
      parentIsShowInterfaceSelect: true,
      RunButtonDisabled: true,
      buttonDisabled: true,
      getcaseListBody: {
        case_name: '',
        project_id: '',
        model_id: '',
        interface_id: '',
        page_num: 1
      },
      caseList: [],
      caseListTotal: 1,
      multipleSelection: {
        project_id: '',
        case_list: []
      },
      runCaseList: {
        case_id: ''
      },
      romeCaseBody: {
        case_id: ''
      },
      copyCaseBody: {
        case_id: ''
      },
      envList: [],
      getEnvBody: {
      }
    }
  },
  created() {
    // this.getInterfaceListMethod()
    this.caseListMethod()
    // }
  },
  methods: {
    changeChildValueMethod() {
      this.caseListMethod()
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.getcaseListBody.page_num = newPage
      this.caseListMethod()
    },
    // table 复选框选中值
    handleSelectionChange(val) {
      var arrObject = []
      val.forEach(function(item, index) {
        arrObject.push(item.case_id)
      })
      this.multipleSelection.case_list = arrObject
    },
    // 获取接口列表方法
    async getInterfaceListMethod() {
      if (!sessionStorage.getItem('projectId')) {
        delete this.getInterfaceListBody.project_id
      } else {
        this.getInterfaceListBody.project_id = Number(sessionStorage.getItem('projectId'))
      }
      if (!sessionStorage.getItem('modelId')) {
        delete this.getInterfaceListBody.model_id
      } else {
        this.getInterfaceListBody.model_id = Number(sessionStorage.getItem('modelId'))
      }
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
      }
    },
    // 获取所有case
    async caseListMethod() {
      if (sessionStorage.getItem('inputKey') === this.inputName) {
        this.getcaseListBody.case_name = sessionStorage.getItem('inputName')
      } else {
        delete this.getcaseListBody.case_name
      }
      if (!sessionStorage.getItem('projectId')) {
        console.log('projectId', sessionStorage.getItem('projectId'))
        delete this.getcaseListBody.project_id
        this.RunButtonDisabled = true
      } else {
        this.getcaseListBody.project_id = Number(sessionStorage.getItem('projectId'))
        this.RunButtonDisabled = false
      }
      if (!sessionStorage.getItem('modelId')) {
        console.log('modelId', sessionStorage.getItem('modelId'))
        delete this.getcaseListBody.model_id
      } else {
        this.getcaseListBody.model_id = Number(sessionStorage.getItem('modelId'))
        this.RunButtonDisabled = false
      }
      if (!sessionStorage.getItem('interId')) {
        console.log('interId', sessionStorage.getItem('interId'))
        delete this.getcaseListBody.interface_id
        this.buttonDisabled = true
      } else {
        console.log('true', sessionStorage.getItem('interId'))
        this.getcaseListBody.interface_id = Number(sessionStorage.getItem('interId'))
        this.buttonDisabled = false
      }
      const { data: responseBody } = await this.$api.testcase.getCaseList(
        this.getcaseListBody
      )
      if (responseBody.code === 1) {
        this.caseList = responseBody.data
        this.caseListTotal = responseBody.page_total_num * 10
      } else {
        this.$message.error('请求用例信息失败！')
      }
    },
    // 运行单个case
    async runSingleCaseMethod(id) {
      this.runCaseList.case_id = id
      const { data: responseBody } = await this.$api.testcase.runCase(
        this.runCaseList
      )
      if (responseBody.code === 1) {
        this.$message.success(responseBody.msg)
        this.caseListMethod()
      } else {
        this.$message.error(responseBody.msg)
      }
    },
    // 批量运行case
    async runMultipleCaseMethod() {
      this.multipleSelection.project_id = Number(sessionStorage.getItem('projectId'))
      const { data: res } = await this.$api.testcase.runMultipleCase(
        this.multipleSelection
      )
      if (res.code === 1) {
        this.$message.success('运行成功！')
        this.caseListMethod()
      } else {
        this.$message.error(res.msg)
      }
    },
    // 复制case
    async copyCaseMethod(val) {
      this.copyCaseBody.case_id = val
      const { data: responseBody } = await this.$api.testcase.duplicateCase(
        this.copyCaseBody
      )
      if (responseBody.code === 1) {
        this.$message.success('复制成功！')
        this.reload()
      } else {
        this.$message.error('复制失败！')
      }
    },
    // 删除case
    async removeCaseById(caseId) {
      this.romeCaseBody.case_id = caseId
      const confirmResult = await this.$confirm(
        '此操作将永久删除该项目, 是否继续?',
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
      const { data: responseBody } = await this.$api.testcase.removeCase(
        this.romeCaseBody
      )
      if (responseBody.code === 1) {
        this.$message.success('删除成功！')
        this.reload()
      } else {
        this.$message.error('删除失败！')
      }
    },
    async getEnvListMethod() {
      const { data: responseBody } = await this.$api.environment.getEnvironmentList(
        this.getEnvBody
      )
      if (responseBody.code === 1) {
        this.envList = responseBody.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    },
    // 获取所有项目列表
    async getProjectListMethod() {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    // 获取所有模块列表
    async getModelListMethod() {
      if (this.projectValue) {
        this.getModelListBody.project_id = Number(sessionStorage.getItem('projectId'))
      }
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList = responseBody.data
    },
    goAddCaseInfo() {
      this.$router.push({ path: '/caseinfo', query: { interId: Number(sessionStorage.getItem('interId')) }}).catch(err => {
        console.log('输出', err)
      })
    },
    goEditCaseInfo(caseId) {
      this.$router.push({ path: '/caseinfo', query: { caseId: caseId }}).catch(err => {
        console.log('输出', err)
      })
    },
    goCaseLog(caseId) {
      this.$router.push({ path: '/caselog', query: { caseId: caseId }}).catch(err => {
        console.log('输出', err)
      })
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
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    margin-right: 10px;
    float: right;
  }
}
.el-input {
  width: 350px;
}
.addcase-form-envid {
  width: 500px;
  .el-select {
    width: 350px;
  }
}
.env-select-method {
  margin-right: 0px;
  width: 120px;
}
.run-input-interface-path {
  width: 150px;
  margin-right: 0px;
}
.run-input-interface-path {
  width: 300px;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>
