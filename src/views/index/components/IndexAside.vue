<template>
  <el-tree 
  :data="data"
           :props="defaultProps"
           accordion
           @node-click="handleNodeClick">
  </el-tree>
</template>
<script>
export default {
  data () {
    return {
      projectListBody: {
        page_num: 1
      },
      projectList: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // 获取所有项目列表
    async projectList () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    }
  }

}
</script>
<style lang="less" scoped>
</style>
