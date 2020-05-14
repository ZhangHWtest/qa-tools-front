<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>接口管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="interface-info-card">
      <el-tabs class="interface-info-tabs"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane :key="item.name"
                     v-for="item in editableTabs"
                     :label="item.title"
                     :name="item.name">
          <basic-information :key="activeName +'basic'"
                             :interfaceInfo="interfaceInfo"
                             :activeName="activeName" />
          <param-information :key="activeName +'param'"
                             :interfaceInfo="interfaceInfo"
                             :activeName="activeName" />
          <return-information :key="activeName +'return'"
                              :interfaceInfo="interfaceInfo"
                              :activeName="activeName" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import BasicInformation from './components/BasicInformation'
import ParamInformation from './components/ParamInformation'
import ReturnInformation from './components/ReturnInformation'
export default {
  components: {
    BasicInformation,
    ParamInformation,
    ReturnInformation
  },
  data () {
    return {
      activeName: 'Tab 1',
      editableTabs: [{
        title: '预览',
        name: 'Tab 1'
      }, {
        title: '编辑',
        name: 'Tab 2'
      }],
      getInterfaceInfo: {
        interface_id: ''
      },
      interfaceInfo: {}
    }
  },
  created () {
    this.getInterfaceInfo.interface_id = Number(this.$route.query.interfaceId)
    this.getInterfaceInfoMethod()
  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.name
    },
    // changeInterfaceInfo () {
    //   this.getInterfaceInfoMethod()
    // },
    async getInterfaceInfoMethod () {
      const { data: res } = await this.$api.myinterface.getInterfaceInfoMethod(
        this.getInterfaceInfo
      )
      if (res.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.interfaceInfo = res.data
    }
  }

}
</script>
<style lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.interface-info-card {
  margin: 15px;
}
.interface-info-tabs {
  margin: 0 15px 15px;
}
</style>
