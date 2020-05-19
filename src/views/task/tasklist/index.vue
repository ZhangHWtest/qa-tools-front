<template>
  <div class="main-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="interface-top-select">
        <span class="interface-top-select-name">选择项目：</span>
        <el-select class="interfacelist-top-select"
                   v-model="projectSelectValue"
                   placeholder="请选择项目">
          <el-option v-for="item in projectList"
                     :key="item.project_id"
                     :label="item.project_name"
                     :value="item.project_id">
          </el-option>
        </el-select>

        <el-button type="primary"
                   plain
                   @click="getTaskListMethod()">查询</el-button>
      </div>
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation"></span>
        <el-button class="add-model-button"
                   type="primary"
                   :disabled="buttonDisabled"
                   @click="goAddCaseInfo()">新增 任务</el-button>

      </div>
      <el-table class="interface-table"
                :data="taskList">
        <el-table-column width="70px"
                         label="id"
                         prop="task_id"></el-table-column>
        <el-table-column label="任务名称"
                         prop="task_name"></el-table-column>
        <el-table-column label="项目名称"
                         prop="project_name"></el-table-column>
        <el-table-column label="case数量"
                         prop="case_num"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span class="show-interface-colname"
                  v-if="scope.row.run_status === 1">通过
            </span>
            <span class="show-interface-colname-success"
                  v-else-if="scope.row.run_status === 0">失败
            </span>
            <span class="show-interface-colname-warning"
                  v-else>异常
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人"
                         prop="create_user"></el-table-column>
        <el-table-column label="操作"
                         width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="修改"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="goEditCaseInfo(scope.row.case_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="运行"
                        placement="top">
              <el-button type="success"
                         icon="el-icon-caret-right"
                         size="mini"
                         circle
                         @click="runSingleCaseMethod(scope.row.case_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="日志"
                        placement="top">
              <el-button type="warning"
                         icon="el-icon-tickets"
                         size="mini"
                         circle
                         @click="goCaseLog(scope.row.case_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="removeCaseById(scope.row.case_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      projectSelectValue: '',
      getProjectListBody: {},
      projectList: [],
      taskList: [],
      getTaskListBody: {
        project_id: '',
        page_num: 1
      },
      buttonDisabled: true
    }
  },
  created () {
    this.getProjectListMethod()
    this.getTaskListMethod()
  },
  methods: {
    // 获取所有项目列表
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code === 1) {
        this.projectList = projectRes.data
      } else {
        this.$message.error('获取项目列表失败！')
      }
    },
    // 获取接口列表方法
    async getTaskListMethod () {
      if (this.projectSelectValue !== '') {
        this.getTaskListBody.project_id = this.projectSelectValue
        this.buttonDisabled = false
      } else {
        delete this.getTaskListBody.project_id
      }
      const { data: responseBody } = await this.$api.task.getTaskList(
        this.getTaskListBody
      )
      if (responseBody.code === 1) {
        this.taskList = responseBody.data
      } else {
        this.$message.error('获取任务列表失败！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.show-interface-colname {
  color: #67c23a;
}
.show-interface-colname-success {
  color: #f56c6c;
}
.show-interface-colname-warning {
  color: #e6a23c;
}
.main-breadcrumb {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.interface-top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .interface-top-select-name {
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .interfacelist-top-select {
    padding-right: 15px;
    width: 190px;
  }
}
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
</style>
