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
                    label="日志地址：">
        <span class="show-interface-colname">{{resultInfo.test_log }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="返回下载地址：">
        <span class="show-interface-colname">{{resultInfo.test_report }}</span>
      </el-form-item>
      <button @click="downloadPDf">downloadPDf</button>
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
    downloadPDf () {
      this.$api.post('E:\python\flask_api_test/app/upload\task000006_20200513183103.log', {
        responseType: 'blob' // 重要
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        let fname = 'report.log'
        link.href = url
        link.setAttribute('download', fname)
        document.body.appendChild(link)
        link.click()
      })
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
