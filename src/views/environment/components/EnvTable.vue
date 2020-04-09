<template>
  <div>
    <!-- 模块列表区域-->
    <el-table class="model_table"
              border
              :data="envList">
      <el-table-column width="70px"
                       label="id"
                       prop="env_id"></el-table-column>
      <el-table-column label="项目名称"
                       prop="env_name"></el-table-column>
      <el-table-column label="模块名称"
                       prop="url"></el-table-column>
      <el-table-column label="接口名称"
                       prop="create_user"></el-table-column>
      <el-table-column label="操作"
                       width="120px">
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
                       @click="editCaseById(scope.row.env_id)"></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip class="item"
                      effect="dark"
                      content="删除"
                      placement="top">
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       ricon="el-icon-edit"
                       circle
                       @click="removeEnvById(scope.row.env_id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: [
    'envList'
  ],
  methods: {
    removeEnvById (id) {
      this.$emit('listenToChildRemoveEnv', id)
    },
    editCaseById (id) {
      this.$emit('listenToChildShowDialog', true)
      window.sessionStorage.setItem('env_id', id)
    }
  }

}
</script>

<style scoped>
</style>
