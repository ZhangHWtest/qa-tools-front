<template>
  <el-row :gutter="20">
    <!-- <el-col :span="4">
      <index-aside ref="childAside"
                   @listenChildInterfaceList="changeInterfaceList" />
    </el-col> -->
    <el-col :span="20">
      <interface-list :interfaceList="interfaceList"
                      @listenChildAddInterface="changeAddInterfaceList" />
    </el-col>
  </el-row>
</template>
<script>
// import IndexAside from './IndexAside'
import InterfaceList from './InterfaceList'
export default {
  components: {
    // IndexAside,
    InterfaceList
  },
  data () {
    return {
      interfaceList: []
    }
  },
  methods: {
    changeInterfaceList (info) {
      this.interfaceList = info
    },
    changeAddInterfaceList () {
      this.$refs.childAside.getInterfaceListMethod()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
