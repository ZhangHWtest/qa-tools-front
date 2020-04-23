<template>
  <div v-show="showCaseList">case</div>
</template>
<script>
export default {
  props: [
    'interfaceInfo',
    'activeName'
  ],
  data () {
    return {
      showCaseList: false
    }
  },
  created () {
    if (this.activeName === '4') {
      this.showCaseList = true
    }
  }

}
</script>
<style lang="less" scoped>
</style>
