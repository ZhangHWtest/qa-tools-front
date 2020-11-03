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
                    label="请求头：">
        <span class="show-interface-colname">{{resultInfo.header }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="请求参数：">
        <span class="show-interface-colname">{{resultInfo.params }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="返回参数：">
        <pre>{{JSON.parse(resultInfo.response,null, 4)}}</pre>
        <!-- <span class="show-interface-colname">{{resultInfo.response }}</span> -->
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="断言：">
        <span class="show-interface-colname">{{resultInfo.res_assert }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="错误信息：">
        <span class="show-interface-colname">{{resultInfo.diff_res }}</span>
      </el-form-item>
      <el-form-item class="show-interface-colkey"
                    label="执行耗时：">
        <span class="show-interface-colname">{{resultInfo.duration }}秒</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: [
    'caseResultId',
    'showResultInfo'
  ],
  data () {
    return {
      getCaseResultInfo: {
        case_result_id: ''
      },
      resultInfo: {}
    }
  },
  created () {
    this.getCaseResultInfo.case_result_id = Number(this.caseResultId)
    if (this.showResultInfo) {
      this.getCaseResultInfoMethod()
    }
  },
  methods: {
    async getCaseResultInfoMethod () {
      const { data: responseBody } = await this.$api.testcase.getResultInfo(
        this.getCaseResultInfo
      )
      if (responseBody.code === 1) {
        this.resultInfo = responseBody.data
      } else {
        this.$message.error('日志详情失败！')
      }
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
