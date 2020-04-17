<template>
  <!-- 基本信息区域-->
  <el-card>
    <h2 class="case-title-style">请求参数:</h2>
    <div class="interface-info">
      <el-tabs type="border-card">
        <el-tab-pane label="param">
          <div>
            <el-input class="header_input"
                      type="textarea"
                      placeholder="示例：{'a':'aa','s':'ss'}"
                      v-model="createCaseBody.params"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="header">
          <div>
            <el-input class="header_input"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="createCaseBody.header"></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
export default {
  props: [
    'createCaseBody'
  ],
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.interface-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.case-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.case-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.caseInfo-select {
  width: 120px;
  margin-left: 5px;
}
</style>
