<template>
  <div>
    <index-header :loginname="loginname" />
    <div class="dashboard-editor-container">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </div>
    <index-bottom />
  </div>
</template>
<script>
import IndexHeader from './components/IndexHeader'
import IndexBottom from './components/IndexBottom'
import PanelGroup from './components/PanelGroup'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  components: {
    IndexHeader,
    IndexBottom,
    PanelGroup
  },
  data () {
    return {
      loginname: {
        name: ''
      },
      projectList: [],
      projectListBody: {
        page_num: 1
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  created () {
    this.projectListMethod()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.loginname.name = window.sessionStorage.getItem('loginName')
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    },
    saveNavState (activeName) {
      window.sessionStorage.setItem('activeName', activeName)
      this.activeName = activeName
    },
    // 获取所有项目列表
    async projectListMethod () {
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
.dashboard-editor-container {
  padding: 80px 100px 300px 100px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
