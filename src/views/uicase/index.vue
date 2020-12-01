<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>UI管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 筛选组件 -->
      <ui-search-component />
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：添加case必须先选择平台、端！</span>
        <el-button
          class="add-model-button"
          type="primary"
          :disabled="buttonDisabled"
          @click="addUiCasedialogVisible=true"
        >
          新增 用例
        </el-button>
      </div>
    </el-card>
    <el-dialog
      title="新增用例"
      :visible.sync="addUiCasedialogVisible"
      width="35%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="addUiCaseRef" :model="addUiCaseBody" label-width="100px" :rules="addUiCaseRefForm">
        <el-form-item label="用例名称:" prop="case_name">
          <el-input v-model="addUiCaseBody.case_name" placeholder="请输入用例名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUiCasedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUiCaseMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UiSearchComponent from '@/components/UiSearchComponent/index'
export default {
  inject: ['reload'],
  components: {
    UiSearchComponent
  },
  data() {
    return {
      buttonDisabled: false,
      addUiCasedialogVisible: false,
      addUiCaseBody: {
        case_name: ''
      },
      addUiCaseRefForm: {
        case_name: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async addUiCaseMethod() {
      const { data: res } = await this.$api.myuicase.addUiCase(
        this.addUiCaseBody
      )
      if (res.code === 1) {
        this.$message.success('新增成功')
      } else {
        this.$message.error(res.msg)
      }
    },
    handleClose() {
      this.addUiCasedialogVisible = false
      this.$refs.addUiCaseRef.resetFields()
    }
  }
}

</script>
<style  lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    margin-right: 10px;
    float: right;
  }
}
</style>
