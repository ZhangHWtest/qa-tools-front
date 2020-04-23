<template>
  <el-card>
    <el-tabs class="interface-info-tabs"
             v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :key="item.name"
                   v-for="(item) in editableTabs"
                   :label="item.title"
                   :name="item.name">
        <basic-information :key="activeName"
                           :interfaceInfo="interfaceInfo"
                           :activeName="activeName" />
        <param-information :key="activeName"
                           :interfaceInfo="interfaceInfo"
                           :activeName="activeName" />
        <return-information :key="activeName"
                            :interfaceInfo="interfaceInfo"
                            :activeName="activeName" />
        <run-information :key="activeName"
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
export default {
  components: {
    BasicInformation,
    ParamInformation,
    ReturnInformation,
    RunInformation
  },
  data () {
    return {
      activeName: '1',
      editableTabs: [{
        title: '预览',
        name: '1'
      }, {
        title: '编辑',
        name: '2'
      }, {
        title: '运行',
        name: '3'
      }, {
        title: 'CASE',
        name: '4'
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
      console.log('tab:' + this.activeName)
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
.interface-info-tabs {
  margin: 0 15px 15px;
}
</style>
