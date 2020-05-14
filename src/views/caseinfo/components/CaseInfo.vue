<template>
  <div>
    <!-- 内容主体区域-->
    <el-form ref="addFormRef"
             :model="addCaseBody"
             :rules="addRulesForm"
             label-width="120px">
      <h2 class="interface-title-style">case基本信息:</h2>
      <el-form-item label="选择环境："
                    class="addcase-form-envid"
                    prop="env_id">
        <el-select v-model="addCaseBody.env_id"
                   placeholder="请选择环境：">
          <el-option v-for="item in envList"
                     :key="item.env_id"
                     :label="item.url"
                     :value="item.env_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称："
                    prop="case_name">
        <el-input v-model="addCaseBody.case_name"
                  placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="addCaseBody.case_desc"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo'
  ],
  data () {
    return {
      addCaseBody: {}
    }
  }

}
</script>
<style lang="less" scoped>
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>
