<template>
  <div v-show="modelListTable">
    <el-button class="add-model-button"
               type="primary"
               @click="addModelDialog=true">新增 模块</el-button>
    <el-table class="model_table"
              stripe
              :data="modelList">
      <el-table-column width="70px"
                       label="id"
                       prop="model_id"></el-table-column>
      <el-table-column label="模块名称">
        <template slot-scope="scope">
          <el-link type="primary"
                   @click="goInterfaceList(scope.row.model_id)">{{scope.row.model_name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
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
                       @click="showEditProjectDialog(scope.row.project_id,scope.row.project_name)"></el-button>
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
                       @click="removeProjectById(scope.row.project_id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  props: [
    'activeName',
    'projectId'
  ],
  data () {
    return {
      modelListTable: false,
      getModelListBody: {
        project_id: ''
      },
      modelList: []
    }
  },
  created () {
    if (this.activeName === 'Tab 2') {
      this.modelListTable = true
      this.getModelListMethod()
    }
  },
  methods: {
    // 获取所有模块列表
    async getModelListMethod () {
      this.getModelListBody.project_id = this.projectId
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.modelList = responseBody.data
    }
  }

}
</script>
<style lang="less" scoped>
</style>
