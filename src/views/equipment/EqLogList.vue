<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        ref="multipleTableAll"
        class="equipment-table"
        :data="eqLogList"
        style="width: 100%"
      >
        <el-table-column
          width="70px"
          label="ID"
          prop="eq_log_id"
        />
        <el-table-column
          label="设备名称"
          prop="eq_name"
        />
        <el-table-column
          label="设备管理者"
          prop="eq_owner"
        />
        <el-table-column
          label="设备编码"
          prop="eq_code"
        />
        <el-table-column
          label="设备系统版本"
          prop="eq_sys_ver"
        />
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
          </template>
        </el-table-column>
        <el-table-column
          label="设备描述"
          prop="eq_desc"
        />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              v-if="scope.row.eq_log_status === 1"
              class="show-interface-colname"
            >启用
            </span>
            <span
              v-else-if="scope.row.eq_log_status === 2"
              class="show-interface-colname-warning"
            >编辑
            </span>
            <span
              v-else-if="scope.row.eq_log_status === 3"
              class="show-interface-colname-warning"
            >归还
            </span>
            <span
              v-else-if="scope.row.eq_log_status === 4"
              class="show-interface-colname-warning"
            >外借
            </span>
            <span
              v-else
              class="show-interface-colname-error"
            >停用
            </span>
          </template>
        </el-table-column>
        <el-table-column label="设备借用者">
          <template slot-scope="scope">
            <span v-if="scope.row.borrower === ''">无
            </span>
            <span v-else>{{ scope.row.borrower }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="设备厂商"
          prop="mf_name"
        />
        <el-table-column
          label="操作人"
          prop="c_user"
        />
      </el-table>
      <el-pagination
        background
        :current-page="getEqLogListBody.page_num"
        layout="prev, pager, next"
        :total="500"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getEqLogListBody: {
        eq_id: '',
        page_num: 1
      },
      eqLogList: []
    }
  },
  created() {
    this.getEqLogListBody.eq_id = Number(this.$route.query.EqId)
    this.getEquipmentLogListMethod()
  },
  methods: {
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.getEqLogListBody.page_num = newPage
      this.getEquipmentLogListMethod()
    },
    async getEquipmentLogListMethod() {
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
.show-interface-colname {
  color: #67c23a;
}
.show-interface-colname-error {
  color: #f56c6c;
}
.show-interface-colname-warning {
  color: #e6a23c;
}
</style>
