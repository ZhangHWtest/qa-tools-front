<template>
  <div v-show="showCaseList">
    <el-tooltip class="item"
                effect="dark"
                content="新增用例"
                placement="top">
      <el-button class="add-model-button"
                 type="primary"
                 icon="el-icon-plus"
                 @click="addInterfaceDialog=true">新增 用例</el-button>
    </el-tooltip>
    <el-table class="interface-table"
              :data="caseList"
              stripe>
      <el-table-column width="70px"
                       label="id"
                       prop="case_id"></el-table-column>
      <el-table-column label="用例名称"
                       prop="case_name"></el-table-column>
      <el-table-column label="接口类型"
                       prop="case_type"></el-table-column>
      <el-table-column label="接口方法"
                       prop="method"></el-table-column>
      <el-table-column label="接口路径"
                       prop="path"></el-table-column>
      <el-table-column label="创建人"
                       prop="create_user"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip class="item"
                      effect="dark"
                      content="修改"
                      placement="top">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       ricon="el-icon-edit"
                       circle
                       @click="showEditInterfaceParamDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="删除"
                      placement="top">
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       ricon="el-icon-edit"
                       circle
                       @click="removeInterfaceParamById(scope.row.param_id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   :current-page="getcaseListBody.page_num"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="500">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo',
    'activeName'
  ],
  data () {
    return {
      showCaseList: false,
      getcaseListBody: {
        interface_id: '',
        page_num: 1
      },
      caseList: []
    }
  },
  created () {
    if (this.activeName === 'Tab 4') {
      this.showCaseList = true
      this.getcaseListBody.interface_id = this.interfaceInfo.interface_id
      this.caseListMethod()
    }
  },
  methods: {
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getcaseListBody.page_num = newPage
      this.caseListMethod()
    },
    async caseListMethod () {
      const { data: responseBody } = await this.$api.testcase.getCaseList(
        this.getcaseListBody
      )
      if (responseBody.code === 1) {
        this.caseList = responseBody.data
      } else {
        this.$message.error('请求用例信息失败！')
      }
    }
  }

}
</script>
<style lang="less" scoped>
</style>
