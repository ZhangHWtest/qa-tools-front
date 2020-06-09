<template>
  <div>
    <el-form label-position="left"
             :model=resultInfo
             inline
             class="demo-table-expand">
      <el-form-item class="show-interface-colkey"
                    label="task名称：">
        <span class="show-interface-colname">{{resultInfo.task_name }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="日志下载：">
        <a href="http://192.168.70.72:5001/upload/testlog/task000059_20200608190251.log"
           download>{{resultInfo.test_log }}</a>
        <!-- <span class="show-interface-colname">{{resultInfo.test_log }}</span> -->
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="测试报告预览：">
        <a href="http://192.168.70.72:5001/upload/testlog/task000059_20200608190251.html"
           download>{{resultInfo.test_report }}</a>
        <!-- <span class="show-interface-colname">{{resultInfo.test_report }}</span> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: [
    'taskResultId',
    'showResultInfo'
  ],
  data () {
    return {
      getTaskResultInfo: {
        task_result_id: ''
      },
      resultInfo: {}
    }
  },
  created () {
    this.getTaskResultInfo.task_result_id = Number(this.taskResultId)
    if (this.showResultInfo) {
      this.getTaskResultInfoMethod()
    }
  },
  methods: {
    async getTaskResultInfoMethod () {
      const { data: responseBody } = await this.$api.task.resultInfoTask(
        this.getTaskResultInfo
      )
      if (responseBody.code === 1) {
        this.resultInfo = responseBody.data
      } else {
        this.$message.error('日志详情失败！')
      }
    },
    downloadDemo () {
      location.href = '/Users/zhwtest/Desktop/MyBook/testlog/task000059_20200608190251.html'
    }
  }

}
</script>
<style lang="less" scoped>
.show-interface-colkey {
  width: 90%;
  font-size: 15px;
  color: rgba(13, 27, 62, 0.85);
  margin: 0;
  text-align: left;
  padding-left: 10px;
}
.show-interface-colname {
  padding-left: 16px;
  font-size: 14px;
  color: rgba(13, 27, 62, 0.65);
  margin: 0;
  width: 100px;
}
</style>
