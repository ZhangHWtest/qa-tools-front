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
          <preview-interface-info :activeName="activeName"
                                  :interfaceInfo="interfaceInfo"></preview-interface-info>
          <edit-interface-info :activeName="activeName"
                               :interfaceInfo="interfaceInfo"></edit-interface-info>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import PreviewInterfaceInfo from './components/PreviewInterFaceInfo'
import EditInterfaceInfo from './components/EditInterfaceInfo'
export default {
  components: {
    PreviewInterfaceInfo,
    EditInterfaceInfo
  },
  data () {
    return {
      activeName: '预览',
      editableTabs: [{
        title: '预览',
        name: '预览'
      }, {
        title: '编辑',
        name: '编辑'
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
