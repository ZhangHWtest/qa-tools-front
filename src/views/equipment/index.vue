<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="notes-top-addbutton">
        <!-- <span class="notes-top-addannotation">注：</span> -->
        <el-button class="add-model-button"
                   type="primary"
                   @click="openAddDialogVisible()">新增 设备</el-button>
      </div>
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
    <el-dialog title="新增设备"
               :visible.sync="addDialogVisible"
               width="40%"
               :close-on-click-modal="false"
               @close="handleClose">
      <el-form ref="addFormRef"
               :model="addEqBody"
               :rules="addEqForm"
               label-width="85px">
        <el-form-item label="设备名称"
                      prop="eq_name">
          <el-input v-model="addEqBody.eq_name"
                    placeholder="请输入设备名"></el-input>
        </el-form-item>
        <el-form-item label="设备编码"
                      prop="eq_code">
          <el-input v-model="addEqBody.eq_code"
                    placeholder="请输入设备编码，不可重复"></el-input>
        </el-form-item>
        <el-form-item label="设备描述"
                      prop="eq_desc">
          <el-input v-model="addEqBody.eq_desc"
                    placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="设备类型"
                      prop="eq_type">
          <el-radio-group v-model="addEqBody.eq_type">
            <el-radio :label="1">手机</el-radio>
            <el-radio :label="2">pad</el-radio>
            <el-radio :label="0">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备系统"
                      prop="eq_sys">
          <el-radio-group v-model="addEqBody.eq_sys">
            <el-radio :label="1">IOS</el-radio>
            <el-radio :label="2">Android</el-radio>
            <el-radio :label="0">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统版本"
                      prop="eq_sys_ver">
          <el-input v-model="addEqBody.eq_sys_ver"
                    placeholder="请输入设备系统版本"></el-input>
        </el-form-item>
        <el-form-item label="管理者"
                      prop="eq_owner">
          <el-input v-model="addEqBody.eq_owner"
                    placeholder="请输入管理者"></el-input>
        </el-form-item>
        <el-form-item label="SIM"
                      prop="have_sim">
          <el-radio-group v-model="addEqBody.have_sim">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备厂商"
                      prop="mf_id">
          <el-select v-model="addEqBody.mf_id"
                     placeholder="请选择">
            <el-option v-for="item in mfList"
                       :key="item.mf_id"
                       :label="item.mf_name"
                       :value="item.mf_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini"
                   @click="addDialogVisible = false">取 消</el-button>
        <el-button type="success"
                   size="mini"
                   @click="addEquipmentMethod()">完成</el-button>
      </span>
    </el-dialog>
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
      mfList: [],
      eqId: '',
      showEqInfo: false,
      addDialogVisible: false,
      getManufacturerListBody: {
        // page_num: 1
      },
      addEqBody: {
        eq_name: '',
        eq_code: '',
        eq_type: 1,
        eq_sys: 2,
        eq_sys_ver: '',
        eq_owner: '',
        have_sim: 0,
        eq_desc: '',
        mf_id: ''

      },
      addEqForm: {
        eq_name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        eq_code: [
          { required: true, message: '请输入设备编码', trigger: 'blur' }
        ],
        eq_type: [
          { required: true, message: '请输入选择' }
        ],
        eq_sys: [
          { required: true, message: '请输入选择' }
        ],
        eq_sys_ver: [
          { required: true, message: '请输入系统版本', trigger: 'blur' }
        ],
        eq_owner: [
          { required: true, message: '请输入设备管理者', trigger: 'blur' }
        ],
        have_sim: [
          { required: true, message: '请输入选择' }
        ],
        eq_desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        mf_id: [
          { required: true, message: '请输入选择' }
        ]
      }
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
    handleClose () {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    openAddDialogVisible () {
      this.addDialogVisible = true
      this.getManufacturerListMethod()
    },
    async getEquipmentListMethod () {
      const { data: res } = await this.$api.equipment.eqList(
        this.getEquipmentListBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.equipmentList = res.data
    },
    async getManufacturerListMethod () {
      const { data: res } = await this.$api.equipment.mfList(
        this.getManufacturerListBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.mfList = res.data
    },
    async addEquipmentMethod () {
      const { data: res } = await this.$api.equipment.eqAdd(
        this.addEqBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.$message.success('添加设备成功！')
      this.addDialogVisible = false
    }

  }
}
</script>
<style lang="less" scoped>
.el-radio {
  padding-right: 10px;
}

.show-interface-colname {
  color: #67c23a;
}
.show-interface-colname-success {
  color: #f56c6c;
}
.show-interface-colname-warning {
  color: #e6a23c;
}
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.notes-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .notes-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    margin-right: 10px;
    float: right;
  }
}
</style>
