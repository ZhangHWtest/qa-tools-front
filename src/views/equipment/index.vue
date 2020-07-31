<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table class="equipment-table"
                :data="equipmentList"
                ref="multipleTableAll"
                style="width: 100%"
                @expand-change="expandChange">
        <el-table-column type="expand">
          <eq-info :eqId="eqId"
                   :showEqInfo="showEqInfo" />
        </el-table-column>
        <el-table-column width="70px"
                         label="ID"
                         prop="eq_id"></el-table-column>
        <el-table-column label="设备名称"
                         prop="eq_name">
        </el-table-column>
        <el-table-column label="设备管理者"
                         prop="eq_owner"></el-table-column>
        <el-table-column label="设备编码"
                         prop="eq_code">
        </el-table-column>
        <el-table-column label="设备系统"
                         prop="eq_sys"></el-table-column>
        <el-table-column label="设备系统版本"
                         prop="eq_sys_ver"></el-table-column>
        <el-table-column label="设备类型"
                         prop="eq_type"></el-table-column>
        <el-table-column label="SIM"
                         prop="have_sim"></el-table-column>
        <el-table-column label="设备厂商ID"
                         prop="mf_name"></el-table-column>
        <el-table-column label="操作"
                         width="150px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="修改"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="goInterfaceInfo(scope.row.interface_id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="removeInterfaceById(scope.row.interface_id)"></el-button>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="getEquipmentListBody.page_num"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="500">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import EqInfo from './components/EqInfo'
export default {
  components: {
    EqInfo
  },
  data () {
    return {
      getEquipmentListBody: {
        page_num: 1
      },
      equipmentList: [],
      eqId: '',
      showEqInfo: false
    }
  },
  created () {
    this.getEquipmentListMethod()
  },
  methods: {
    expandChange (row, expandedRows) {
      this.expandedRows = expandedRows
      if (expandedRows.length > 1) {
        this.$refs.multipleTableAll.toggleRowExpansion(this.expandedRows[0])
        console.log(this.$refs.multipleTableAll)
      }
      if (this.expandedRows.length > 0) {
        this.eqId = row.eq_id
        this.showEqInfo = true
      }
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getEquipmentListBody.page_num = newPage
      this.getEquipmentListMethod()
    },
    async getEquipmentListMethod () {
      const { data: res } = await this.$api.equipment.eqList(
        this.getEquipmentListBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.equipmentList = res.data
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
</style>
