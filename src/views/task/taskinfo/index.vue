<template>
  <div class="main-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div v-show="showBasic">
        <h2 class="title-style">
          基本信息:
        </h2>
        <div class="dev-info">
          <el-form
            ref="addFormRef"
            :model="editTaskBody"
            :rules="addRulesForm"
            label-width="100px"
          >
            <el-form-item
              label="任务名称:"
              prop="task_name"
            >
              <el-input
                v-model="editTaskBody.task_name"
                class="interface_name"
                placeholder="请输接口名称"
              />
            </el-form-item>
            <el-form-item
              label="执行策略"
              prop="task_type"
            >
              <el-radio-group
                v-model="editTaskBody.task_type"
                @change="selectRunTimeType()"
              >
                <el-radio :label="0">
                  立即执行
                </el-radio>
                <el-radio :label="1">
                  间隔秒
                </el-radio>
                <el-radio :label="2">
                  日期执行
                </el-radio>
                <el-radio :label="3">
                  cron表达式
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-show="runTimeInput"
              label="执行时间"
            >
              <el-input
                v-model="editTaskBody.run_time"
                placeholder="单位 秒"
              />
            </el-form-item>
            <el-form-item
              v-show="runTimePicker"
              label="执行时间"
              prop="run_time"
            >
              <el-date-picker
                v-model="editTaskBody.run_time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
            <el-form-item
              v-show="runTimeCron"
              label="执行时间"
            >
              <el-input
                v-model="editTaskBody.run_time"
                placeholder="示例：每隔5秒执行一次：*/5 * * * * ？"
              />
            </el-form-item>
          </el-form>
          <div class="interface-info-button">
            <el-button
              size="mini"
              @click="backTaskList()"
            >
              取 消
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="editTaskInfoMethod()"
            >
              下一步
            </el-button>
          </div>
        </div>
      </div>
      <div v-show="showTaskAndCase">
        <h2 class="title-style">
          绑定用例:
        </h2>
        <div class="dev-info">
          <el-form
            ref="updateFormRef"
            :model="updateCaseBody"
            :rules="updateCaseForm"
            label-width="100px"
          >
            <el-form-item
              label="绑定用例："
              prop="case_list"
            >
              <el-input
                v-model="my_case_list"
                placeholder="请输入绑定用例ID 示例:[1,2]"
              />
            </el-form-item>
          </el-form>
          <div class="interface-info-button">
            <el-button
              size="mini"
              @click="backTaskList()"
            >
              取 消
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="updateTaskAndCaseMethod()"
            >
              完成
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getTaskInfoBody: {
        task_id: ''
      },
      taskInfo: '',
      editTaskBody: {
        task_id: '',
        task_name: '',
        task_type: '',
        run_time: ''
      },
      addRulesForm: {
        task_name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        task_type: [
          { required: true, trigger: 'blur' }
        ]
      },
      runTimeInput: false,
      runTimePicker: false,
      runTimeCron: false,
      showBasic: true,
      showTaskAndCase: false,
      updateCaseBody: {
        task_id: '',
        case_list: []
      },
      my_case_list: '',
      updateCaseForm: {
        case_list: [
          { required: true, message: '请输入绑定case id', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTaskInfoBody.task_id = Number(this.$route.query.taskId)
    this.updateCaseBody.task_id = Number(this.$route.query.taskId)
    this.getTaskInfoMethod()
  },
  methods: {
    selectRunTimeType() {
      if (this.editTaskBody.task_type === 1) {
        this.runTimeInput = true
        this.runTimePicker = false
        this.runTimeCron = false
      } else if (this.editTaskBody.task_type === 2) {
        this.runTimeInput = false
        this.runTimePicker = true
        this.runTimeCron = false
      } else if (this.editTaskBody.task_type === 3) {
        this.runTimeInput = false
        this.runTimePicker = false
        this.runTimeCron = true
      } else {
        this.runTimeInput = false
        this.runTimePicker = false
        this.runTimeCron = false
      }
    },
    async getTaskInfoMethod() {
      const { data: res } = await this.$api.task.getTaskInfo(
        this.getTaskInfoBody
      )
      if (res.code !== 1) {
        return this.$message.error('获取详情失败！')
      }
      this.editTaskBody.task_id = res.data.task_id
      this.editTaskBody.task_name = res.data.task_name
      this.editTaskBody.task_type = res.data.task_type
      this.editTaskBody.run_time = res.data.run_time
      var arrObject = []
      res.data.case_list.forEach(function(item) {
        arrObject.push(item.case_id)
      })
      this.my_case_list = JSON.stringify(arrObject)
      if (res.data.task_type === 1) {
        this.runTimeInput = true
      } else if (res.data.task_type === 2) {
        this.runTimePicker = true
      } else if (res.data.task_type === 3) {
        this.runTimeCron = true
      }
    },
    // 修改task
    async editTaskInfoMethod() {
      if (this.editTaskBody.task_type === 0) {
        this.editTaskBody.run_time = ''
      }
      const { data: serverResponse } = await this.$api.task.editTask(
        this.editTaskBody
      )
      if (serverResponse.code === 1) {
        this.$message.success('修改接口成功！')
        this.showBasic = false
        this.showTaskAndCase = true
      } else {
        this.$message.error('修改接口失败！')
      }
    },
    async updateTaskAndCaseMethod() {
      var arrObject = []
      JSON.parse(this.my_case_list).forEach(function(item) {
        arrObject.push(item)
      })
      this.updateCaseBody.case_list = arrObject
      const { data: res } = await this.$api.task.updateTaskCase(
        this.updateCaseBody
      )
      if (res.code === 1) {
        this.$message.success('修改接口成功！')
        this.$router.push({ path: '/tasklist' }).catch(err => {
          console.log('输出', err)
        })
      } else {
        this.$message.error('修改接口失败！')
      }
    },
    backTaskList() {
      this.$router.push({ path: '/tasklist' }).catch(err => {
        console.log('输出', err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main-breadcrumb {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.dev-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
  .interface-info-button {
    text-align: center;
  }
}
</style>
