<template>
  <div>
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
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="addCaseMethod ()">确 定</el-button>
    </span>
  </div>
</template>
