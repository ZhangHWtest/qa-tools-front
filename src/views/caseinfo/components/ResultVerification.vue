<template>
  <div>
    <h2 class="interface-title-style">响应校验:</h2>
    <div class="interface-info">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="addCaseBody"
               :rules="addRulesForm"
               label-width="120px">
        <el-form-item label="匹配字段："
                      prop="res_assert">
          <el-input v-model="addCaseBody.res_assert"
                    placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="是否存在依赖：">
          <el-radio v-model="addCaseBody.has_rely"
                    :label="0">无</el-radio>
          <el-radio v-model="addCaseBody.has_rely"
                    :label="1">存在</el-radio>
        </el-form-item>
        <el-form-item label="依赖case：">
          <el-input v-model="addCaseBody.rely_info"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="是否使用sql：">
          <el-radio v-model="addCaseBody.use_db"
                    :label="0">不用</el-radio>
          <el-radio v-model="addCaseBody.use_db"
                    :label="1">使用</el-radio>
        </el-form-item>
        <el-form-item label="sql：">
          <el-input v-model="addCaseBody.sql"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="sql比对值：">
          <el-input v-model="addCaseBody.field_value"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="保存结果：">
          <el-switch class="interface-info-switch"
                     style="display: block"
                     v-model="addCaseBody.save_result"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addCaseBody: {
        res_assert: "{'zz':'zzzz','xx':'xxxx'}", // 结果匹配字段校验  必填
        has_rely: 0, // 是否有依赖 默认0
        rely_info: "[{'rely_case_id':4,'rely_param':'zz'},{'rely_case_id':5,'rely_param':'xx'}]", // 依赖用例详情
        save_result: 0, // 保存结果 默认0 不
        use_db: 0, // 是否使用sql校验 默认0
        sql: '',
        field_value: '' // sql校验的至
      },
      addRulesForm: {
        res_assert: [
          { required: true, message: '请填写校验内容', trigger: 'blur' }
        ]
      }
    }
  }

}
</script>
<style lang="less" scoped>
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 10px;
  margin-left: 15px;
}
.interface-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 45px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.interface-info-switch {
  line-height: 40px;
}
</style>
