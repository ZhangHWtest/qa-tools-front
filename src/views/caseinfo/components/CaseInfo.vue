<template>
  <div>
    <!-- 内容主体区域-->
    <el-form ref="addFormRef"
             :model="addCaseBody"
             :rules="addRulesForm"
             label-width="120px">
      <h2 class="interface-title-style">基本信息:</h2>
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
      <el-form-item label="路径："
                    prop="method">
        <el-select v-model="addCaseBody.method"
                   class="env-select-method"
                   placeholder="方法">
          <el-option label="GET"
                     value="GET"></el-option>
          <el-option label="POST"
                     value="POST"></el-option>
        </el-select>
        <el-select v-model="addCaseBody.case_type"
                   class="env-select-method"
                   placeholder="请求">
          <el-option label="HTTP"
                     value="HTTP"></el-option>
          <el-option label="HTTPS"
                     value="HTTPS"></el-option>
        </el-select>

        <el-input class="run-input-interface-path"
                  placeholder="/path"
                  v-model="addCaseBody.path"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="addCaseBody.case_desc"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <h2 class="interface-title-style">请求参数:</h2>
      <div class="interface-info">
        <el-tabs type="border-card">
          <el-tab-pane label="param">
            <el-input class="header_input"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="addCaseBody.param"></el-input>
          </el-tab-pane>
          <el-tab-pane label="header">
            <el-input class="header_input"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="addCaseBody.header"></el-input>
          </el-tab-pane>
        </el-tabs>
      </div>
      <h2 class="interface-title-style">响应:</h2>
      <el-form-item label="结果断言:"
                    prop="res_assert">
        <el-input v-model="addCaseBody.res_assert"
                  placeholder="示例：{'code':200}"
                  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="执行结果:"
                    prop="save_result">
        <el-radio v-model="addCaseBody.save_result"
                  :label="1">保存</el-radio>
        <el-radio v-model="addCaseBody.save_result"
                  :label="0">不保存</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="addCaseMethod ()">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo'
  ]

}
</script>
<style scoped>
</style>
