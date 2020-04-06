<template>
  <div>
    <el-table :data="projectList"
              style="width: 100%;margin-bottom: 20px;"
              row-key="project_id"
              border
              default-expand-all
              :tree-props="{children: 'modelList', hasChildren: 'hasModelList'}">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      projectList: [{
        project_id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        modelList: [{
          project_id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          project_id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }],
      projectListResList: [],
      projectListBody: {},
      modelBody: {
        project_id: 1
      }
    }
  },
  created () {
    this.getProjectList()
    this.getModelList()
  },
  methods: {
    projectListMethod () {

    },
    // 获取所有项目列表
    async getProjectList () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.$store.commit('submitProjectList', projectRes.data)
    },
    // 获取所有模块列表
    async getModelList () {
      let id = this.modelBody.project_id
      const { data: responseBody } = await this.$api.project.getModelList(
        this.modelBody
      )

      this.$store.commit('submitmodelList', { project_id: id, modelList: responseBody.data })
    }
  }
}
</script>
