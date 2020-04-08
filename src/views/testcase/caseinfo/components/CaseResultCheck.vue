<template>
  <!-- 基本信息区域-->
  <el-card>
    <h2 class="case-title-style">依赖:</h2>
    <div class="interface-info">
      <el-form ref="addFormRef"
               :model="createCaseBody"
               :rules="addRulesForm"
               label-width="100px">
        <el-form-item label="是否存在依赖:">
          <el-radio v-model="createCaseBody.has_rely"
                    label="1">存在</el-radio>
          <el-radio v-model="createCaseBody.has_rely"
                    label="0">不存在</el-radio>
        </el-form-item>
        <el-form-item label="依赖用例:">
          <el-input v-model="createCaseBody.rely_info"
                    placeholder="示例：[{'rely_case_id':4,'rely_param':'zz'}]"></el-input>
        </el-form-item>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="SQL">
          <div>
            <el-input class="header_input"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="createCaseBody.res_assert"></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
export default {
  props: [
    'createCaseBody',
    'addRulesForm'
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
</style>
