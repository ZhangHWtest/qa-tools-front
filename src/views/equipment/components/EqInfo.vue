<template>
  <div>
    <el-form
      label-position="left"
      :model="eqInfo"
      inline
      class="demo-table-expand"
    >
      <el-form-item
        class="show-interface-colkey"
        label="设备名称："
      >
        <span class="show-interface-colname">{{ eqInfo.eq_name }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: [
    'eqId',
    'showEqInfo'
  ],
  data() {
    return {
      getEqInfo: {
        eq_id: ''
      },
      eqInfo: {}
    }
  },
  created() {
    this.getEqInfo.eq_id = Number(this.eqId)
    if (this.showEqInfo) {
      this.getEqInfoMethod()
    }
  },
  methods: {
    async getEqInfoMethod() {
      const { data: responseBody } = await this.$api.equipment.eqInfo(
        this.getEqInfo
      )
      if (responseBody.code === 1) {
        this.eqInfo = responseBody.data
      } else {
        this.$message.error(responseBody.msg)
      }
    }
  }

}
</script>
<style lang="less" scoped>
.show-interface-colkey {
  width: 90%;
  font-size: 15px;
  color: rgba(13, 27, 62, 0.85);
  margin: 0;
  text-align: left;
  padding-left: 10px;
}
.show-interface-colname {
  padding-left: 16px;
  font-size: 14px;
  color: rgba(13, 27, 62, 0.65);
  margin: 0;
  width: 100px;
}
</style>
