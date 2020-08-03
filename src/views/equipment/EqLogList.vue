<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table class="equipment-table"
                :data="eqLogList"
                ref="multipleTableAll"
                style="width: 100%">
        <el-table-column width="70px"
                         label="ID"
                         prop="eq_log_id"></el-table-column>
        <el-table-column label="设备名称"
                         prop="eq_name">
        </el-table-column>
        <el-table-column label="设备管理者"
                         prop="eq_owner"></el-table-column>
        <el-table-column label="设备编码"
                         prop="eq_code">
        </el-table-column>
        <el-table-column label="设备系统版本"
                         prop="eq_sys_ver"></el-table-column>
        <el-table-column label="设备系统">
          <template slot-scope="scope">
            <span v-if="scope.row.eq_sys === 1">IOS
            </span>
            <span v-else-if="scope.row.eq_sys === 2">Android
            </span>
            <span v-else>其他
            </span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型">
          <template slot-scope="scope">
            <span v-if="scope.row.eq_type === 1">手机
            </span>
            <span v-else-if="scope.row.eq_type === 2">pad
            </span>
            <span v-else>其他
            </span>
          </template>
        </el-table-column>
        <el-table-column label="SIM">
          <template slot-scope="scope">
            <span v-if="scope.row.have_sim === 0">没有
            </span>
            <span v-else-if="scope.row.have_sim === 1">没
            </span>
          </template></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span class="show-interface-colname"
                  v-if="scope.row.eq_status === 1">可外借
            </span>
            <span class="show-interface-colname-warning"
                  v-else-if="scope.row.eq_status === 2">已外借
            </span>
            <span class="show-interface-colname-success"
                  v-else>停用
            </span>
          </template></el-table-column>
        <el-table-column label="设备借用者">
          <template slot-scope="scope">
            <span v-if="scope.row.borrower === ''">无
            </span>
            <span v-else>{{scope.row.borrower}}
            </span>
          </template></el-table-column>
        <el-table-column label="设备厂商"
                         prop="mf_name"></el-table-column>
      </el-table>
    </el-card>
  </div>

</template>
<script>
export default {
  data () {
    return {
      getEqLogListBody: {
        eq_id: '',
        page_num: 1
      },
      eqLogList: []
    }
  },
  created () {
    this.getEqLogListBody.eq_id = Number(this.$route.query.EqId)
    this.getEquipmentLogListMethod()
  },
  methods: {
    async getEquipmentLogListMethod () {
      const { data: res } = await this.$api.equipment.eqLog(
        this.getEqLogListBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.eqLogList = res.data
    }
  }
}
</script>
<style  lass="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
