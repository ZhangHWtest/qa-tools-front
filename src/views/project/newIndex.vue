<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="12">
        <el-card>
          <div class="div-project">
            <span class="title-project">项目列表</span>
            <el-button class="button-add-project" size="small" type="primary">新增 项目</el-button>
          </div>
          <el-divider class="divider-project" />
          <div>
            <el-tree :data="projectList" node-key="id" @node-click="handleNodeClick">
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button type="text" icon="el-icon-edit" @click="() => editProjectMethod(node, data)" />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button type="text" icon="el-icon-delete" @click="() => removeProjectMethod(node, data)" />
                  </el-tooltip>
                </span>
              </span>
            </el-tree>
            <el-pagination
              background
              :current-page="getProjectListBody.pageNum"
              layout="prev, pager, next"
              :total="pageTotal"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card />
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data() {
    return {
      getProjectListBody: {
        page_num: 1
      },
      pageTotal: 1,
      projectList: [],
      resList: []
    }
  },
  created() {
    this.getProjectListMethod()
  },
  methods: {
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.getProjectListBody.page_num = newPage
      this.getInterfaceListMethod()
    },
    handleNodeClick(data) {
      console.log(data.value)
    },
    // 获取所有项目列表
    async getProjectListMethod() {
      const { data: res } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (res.code === 1) {
        this.resList = res.data
        this.pageTotal = res.page_total_num * 10
        this.resList.forEach(item => {
          this.$set(this.projectList, item.project_id, { 'value': item.project_id, 'label': item.project_name })
        })
        console.log(this.projectList)
        this.$message.sucess('获取项目列表失败！')
      } else {
        this.$message.error('获取项目列表失败！')
      }
    }

  }

}
</script>

<style lang="less" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
}
.div-project{
  height: 32px;
  .title-project{
  line-height: 32px;
  flex: 1;
  font-weight: 500;
  color: rgba(0,0,0,.85);
  font-size: 16px;
  }
}
.divider-project{
  margin: 5px 5px;
}

.button-add-project{
  float:right;
  text-align: center;
  margin-right: 10px;
}

.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

</style>
