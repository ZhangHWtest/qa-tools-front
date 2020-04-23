<template>
  <div class="main-projectlist">
    <interface-list />
  </div>
</template>
<script>
import InterfaceList from './components/InterfaceList'
export default {
  components: {
    InterfaceList
  },
  data () {
    return {
      // interfaceList: []
    }
  },
  methods: {
    // changeAddInterfaceList () {
    //   this.$refs.childAside.getInterfaceListMethod()
    // }
  }
}
</script>
<style lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
