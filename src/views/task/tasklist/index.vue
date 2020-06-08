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
                   clearable
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
        <span class="interface-top-addannotation">注：任务基于项目</span>
        <el-button class="add-model-button"
                   type="primary"
                   :disabled="buttonDisabled"
                   @click="goAddTaskDialog()">新增 任务</el-button>
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
                         width="90px"
                         prop="case_num"></el-table-column>
        <el-table-column label="状态"
                         width="70px">
          <template slot-scope="scope">
            <span class="show-interface-colname"
                  v-if="scope.row.run_status === 1">运行中
            </span>
            <span class="show-interface-colname-success"
                  v-else-if="scope.row.run_status === 0">未运行
            </span>
            <span class="show-interface-colname-warning"
                  v-else>暂停中
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人"
                         width="90px"
                         prop="create_user"></el-table-column>
        <el-table-column label="操作"
                         width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="修改"
                        placement="top"
                        v-if="scope.row.run_status !== 1">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="goTaskInfo(scope.row.task_id)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.run_status === 1"
                        class="item"
                        effect="dark"
                        content="暂停"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-switch-button"
                         size="mini"
                         circle
                         @click="stopTaskMethod(scope.row.task_id)"></el-button>
            </el-tooltip>
            <el-tooltip v-else
                        class="item"
                        effect="dark"
                        content="执行"
                        placement="top">
              <el-button type="success"
                         icon="el-icon-caret-right"
                         size="mini"
                         circle
                         @click="runTaskMethod(scope.row.task_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="日志"
                        placement="top">
              <el-button type="warning"
                         icon="el-icon-tickets"
                         size="mini"
                         circle
                         @click="goTaskLog(scope.row.task_id)"></el-button>
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
                         @click="removeTaskById(scope.row.task_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="getTaskListBody.page_num"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="500">
      </el-pagination>
    </el-card>
    <el-dialog title="新增Task"
               :visible.sync="dialogVisible"
               width="40%"
               :close-on-click-modal="false"
               @close="handleClose">
      <el-form ref="addFormRef"
               :model="addTaskBody"
               :rules="addTaskForm"
               label-width="85px"
               v-show="showBasic">
        <el-form-item label="任务名称"
                      prop="task_name">
          <el-input v-model="addTaskBody.task_name"
                    placeholder="请输入任务名"></el-input>
        </el-form-item>
        <el-form-item label="执行策略"
                      prop="task_type">
          <el-radio-group v-model="addTaskBody.task_type"
                          @change="selectRunTimeType()">
            <el-radio :label="0">立即执行</el-radio>
            <el-radio :label="1">间隔秒</el-radio>
            <el-radio :label="2">日期执行</el-radio>
            <el-radio :label="3">cron表达式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="执行时间"
                      prop="run_time"
                      v-show="runTimeInput">
          <el-input v-model="addTaskBody.run_time"
                    placeholder="单位 秒"></el-input>
        </el-form-item>
        <el-form-item label="执行时间"
                      prop="run_time"
                      v-show="runTimePicker">
          <el-date-picker v-model="addTaskBody.run_time"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行时间"
                      v-show="runTimeCron">
          <el-input v-model="addTaskBody.run_time"
                    placeholder="示例：每隔5秒执行一次：*/5 * * * * ？"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="updateFormRef"
               :model="updateCaseBody"
               :rules="updateCaseForm"
               label-width="95px"
               v-show="showTaskAndCase">
        <el-form-item label="绑定用例："
                      prop="case_list">
          <el-input v-model="my_case_list"
                    placeholder="请输入绑定用例ID 示例:[1,2]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini"
                   @click="dialogVisible = false">取 消</el-button>
        <el-button type="success"
                   size="mini"
                   v-show="showBasic"
                   @click="addTaskMethod()">下一步</el-button>
        <el-button type="success"
                   size="mini"
                   v-show="showTaskAndCase"
                   @click="updateTaskAndCaseMethod()">完成</el-button>
      </span>

    </el-dialog>
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
      buttonDisabled: true,
      dialogVisible: false,
      addTaskBody: {
        project_id: '',
        task_name: '',
        task_type: 0,
        run_time: ''
      },
      addTaskForm: {
        task_name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        task_type: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      runTimeInput: false,
      runTimePicker: false,
      runTimeCron: false,
      delTaskBody: {
        task_id: ''
      },
      startTaskBody: {
        task_id: ''
      },
      stopTaskBody: {
        task_id: ''
      },
      showBasic: true,
      showTaskAndCase: false,
      updateCaseBody: {
        task_id: '',
        case_list: []
      },
      updateCaseForm: {
        case_list: [
          { required: true, message: '请输入绑定caseId', trigger: 'blur' }
        ]
      },
      my_case_list: ''
    }
  },
  created () {
    this.getProjectListMethod()
    this.getTaskListMethod()
  },
  methods: {
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getTaskListBody.page_num = newPage
      this.getTaskListMethod()
    },
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
    // 获取task列表方法
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
    },
    goAddTaskDialog () {
      this.dialogVisible = true
    },
    handleClose () {
      this.$refs.addFormRef.resetFields()
      this.runTimeInput = false
      this.runTimePicker = false
      this.runTimeCron = false
    },
    selectRunTimeType () {
      if (this.addTaskBody.task_type === 1) {
        this.runTimeInput = true
        this.runTimePicker = false
        this.runTimeCron = false
      } else if (this.addTaskBody.task_type === 2) {
        this.runTimeInput = false
        this.runTimePicker = true
        this.runTimeCron = false
      } else if (this.addTaskBody.task_type === 3) {
        this.runTimeInput = false
        this.runTimePicker = false
        this.runTimeCron = true
      } else {
        this.runTimeInput = false
        this.runTimePicker = false
        this.runTimeCron = false
      }
    },
    // 创建task方法
    addTaskMethod () {
      if (this.addTaskBody.task_type === 0) {
        delete this.addTaskBody.task_time
      }
      this.addTaskBody.project_id = this.getTaskListBody.project_id
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const { data: responseBody } = await this.$api.task.addTask(
            this.addTaskBody
          )
          if (responseBody.code === 1) {
            this.$message.success('添加成功！')
            this.updateCaseBody.task_id = responseBody.data.task_id
            this.showBasic = false
            this.showTaskAndCase = true
          } else {
            this.$message.error('添加失败！')
          }
        }
      })
    },
    // 创建完task紧接着调用此方法，添加caseList
    updateTaskAndCaseMethod () {
      var arrObject = []
      JSON.parse(this.my_case_list).forEach(function (item) {
        arrObject.push(item)
      })
      this.updateCaseBody.case_list = arrObject
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$api.task.updateTaskCase(
            this.updateCaseBody
          )
          if (res.code === 1) {
            this.$message.success('修改成功！')
            this.dialogVisible = false
            this.getTaskListMethod()
          } else {
            this.$message.error('修改失败！')
          }
        }
      })
    },
    // 根据id删除
    async removeTaskById (_id) {
      this.delTaskBody.task_id = _id
      // 弹窗询问是否删除
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
      const { data: res } = await this.$api.task.delTask(
        this.delTaskBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.getTaskListMethod()
    },
    goTaskInfo (taskId) {
      this.$router.push({ path: '/taskinfo', query: { taskId: taskId } }).catch(err => {
        console.log('输出', err)
      })
    },
    goTaskLog (taskId) {
      this.$router.push({ path: '/tasklog', query: { taskId: taskId } }).catch(err => {
        console.log('输出', err)
      })
      window.sessionStorage.setItem('activePath', '/tasklog')
    },
    async stopTaskMethod (taskId) {
      this.stopTaskBody.task_id = taskId
      const { data: res } = await this.$api.task.stopTask(
        this.stopTaskBody
      )
      if (res.code !== 1) {
        return this.$message.error('暂停失败！')
      }
      // 提示信息
      this.$message.success('暂停成功！')
      // 刷新数据
      this.getTaskListMethod()
    },
    async runTaskMethod (taskId) {
      this.startTaskBody.task_id = taskId
      const { data: res } = await this.$api.task.startTask(
        this.startTaskBody
      )
      if (res.code !== 1) {
        return this.$message.error('运行失败！')
      }
      // 提示信息
      this.$message.success('运行成功！')
      // 刷新数据
      this.getTaskListMethod()
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
.dialog-footer {
  position: relative;
}
</style>
