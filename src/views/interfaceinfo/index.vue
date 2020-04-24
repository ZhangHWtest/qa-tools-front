<template>
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
                           :activeName="activeName"
                           @listenChildChange="changeInterfaceInfo" />
        <return-information :key="activeName +'return'"
                            :interfaceInfo="interfaceInfo"
                            :activeName="activeName" />
        <run-information :key="activeName +'run'"
                         :interfaceInfo="interfaceInfo"
                         :activeName="activeName" />
        <case-list :key="activeName +'case'"
                   :interfaceInfo="interfaceInfo"
                   :activeName="activeName" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import BasicInformation from './components/BasicInformation'
import ParamInformation from './components/ParamInformation'
import ReturnInformation from './components/ReturnInformation'
import RunInformation from './components/RunInformation'
import CaseList from './components/CaesList'
export default {
  components: {
    BasicInformation,
    ParamInformation,
    ReturnInformation,
    RunInformation,
    CaseList
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
      }, {
        title: '运行',
        name: 'Tab 3'
      }, {
        title: 'CASE',
        name: 'Tab 4'
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
      console.log(this.activeName)
    },
    changeInterfaceInfo () {
      this.getInterfaceInfoMethod()
    },
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
.interface-info-card {
  margin: 15px;
}
.interface-info-tabs {
  margin: 0 15px 15px;
}
</style>
