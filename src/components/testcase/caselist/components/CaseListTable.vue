<template>
  <div>
    <!-- 模块列表区域-->
    <el-table class="model_table"
              border
              :data="caseList">
      <el-table-column width="70px"
                       label="id"
                       prop="case_id"></el-table-column>
      <el-table-column label="用例名称"
                       prop="case_name"></el-table-column>
      <el-table-column label="所属项目名称"
                       prop="project_name"></el-table-column>
      <el-table-column label="所属接口名称"
                       prop="interface_name"></el-table-column>
      <el-table-column label="所属模块名称"
                       prop="model_name"></el-table-column>
      <el-table-column label="用例类型"
                       prop="case_type"></el-table-column>
      <el-table-column label="方法"
                       prop="method"></el-table-column>
      <el-table-column label="路径"
                       prop="path"></el-table-column>
      <el-table-column label="URL地址"
                       prop="url"></el-table-column>
      <el-table-column label="创建人"
                       prop="create_user"></el-table-column>
      <el-table-column label="操作"
                       width="150px">
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      content="运行"
                      placement="top">
            <el-button type="success"
                       icon="el-icon-caret-right"
                       size="mini"
                       ricon="el-icon-edit"
                       circle
                       @click="runCaseById(scope.row.case_id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="修改"
                      placement="top">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       ricon="el-icon-edit"
                       circle
                       @click="editCaseById(scope.row.case_id)"></el-button>
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
                       @click="removeCaseById(scope.row.case_id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: [
    'caseList'
  ],
  data () {
    return {}
  },
  methods: {
    removeCaseById (id) {
      this.$emit('listenToChildRemoveCase', id)
    },
    runCaseById (id) {
      this.$emit('listenToChildRunCase', id)
    },
    editCaseById (id) {
      this.$router.push({ path: '/case/info' })
      window.sessionStorage.setItem('case_id', id)
    }
  }

}
</script>

<style  lang="less" scoped>
</style>
