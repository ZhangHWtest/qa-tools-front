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
                         width="180px">
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
                         @click="editEqMethod(scope.row.eq_id)"></el-button>
            </el-tooltip>
            <!-- 切换设备状态-->
            <el-tooltip v-if="scope.row.eq_status === 1"
                        class="item"
                        effect="dark"
                        content="外借"
                        placement="top">
              <el-button type="success"
                         icon="el-icon-unlock"
                         size="mini"
                         circle
                         @click="switchEqMethod(scope.row.eq_id,scope.row.eq_status,scope.row.borrower)"></el-button>
            </el-tooltip>
            <el-tooltip v-else
                        class="item"
                        effect="dark"
                        content="回收"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-lock"
                         size="mini"
                         circle
                         @click="switchEqMethod(scope.row.eq_id,scope.row.eq_status,scope.row.borrower)"></el-button>
            </el-tooltip>
            <!-- 查看log-->
            <el-tooltip class="item"
                        effect="dark"
                        content="日志"
                        placement="top">
              <el-button type="warning"
                         icon="el-icon-tickets"
                         size="mini"
                         circle
                         @click="goEqLog(scope.row.eq_id)"></el-button>
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
                         @click="removeEqById(scope.row.eq_id)"></el-button>
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
    <el-dialog title="改变设备状态"
               :visible.sync="switchDialogVisible"
               width="40%"
               :close-on-click-modal="false"
               @close="switchHandleClose">
      <el-form ref="switchEqFormRef"
               :model="switchEqBody"
               :rules="switchEqForm"
               label-width="85px">
        <el-form-item label="状态"
                      prop="eq_status">
          <el-radio-group v-model="switchEqBody.eq_status"
                          @change="changeRadioStatus">
            <el-radio :label="1">外借</el-radio>
            <el-radio :label="2">回收</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="showBorrower"
                      label="借用人"
                      prop="borrower">
          <el-input v-model="switchEqBody.borrower"
                    placeholder="请输入设备名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini"
                   @click="switchDialogVisible = false">取 消</el-button>
        <el-button type="success"
                   size="mini"
                   @click="switchEquipmentMethod()">完成</el-button>
      </span>
    </el-dialog>
    <!-- 修改设备-->
    <el-dialog title="修改设备"
               :visible.sync="editDialogVisible"
               width="40%"
               :close-on-click-modal="false"
               @close="editHandleClose">
      <el-form ref="addFormRef"
               :model="editEqBody"
               :rules="addEqForm"
               label-width="85px">
        <el-form-item label="设备名称"
                      prop="eq_name">
          <el-input v-model="editEqBody.eq_name"
                    placeholder="请输入设备名"></el-input>
        </el-form-item>
        <el-form-item label="设备编码"
                      prop="eq_code">
          <el-input v-model="editEqBody.eq_code"
                    placeholder="请输入设备编码，不可重复"></el-input>
        </el-form-item>
        <el-form-item label="设备描述"
                      prop="eq_desc">
          <el-input v-model="editEqBody.eq_desc"
                    placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="设备类型"
                      prop="eq_type">
          <el-radio-group v-model="editEqBody.eq_type">
            <el-radio :label="1">手机</el-radio>
            <el-radio :label="2">pad</el-radio>
            <el-radio :label="0">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备系统"
                      prop="eq_sys">
          <el-radio-group v-model="editEqBody.eq_sys">
            <el-radio :label="1">IOS</el-radio>
            <el-radio :label="2">Android</el-radio>
            <el-radio :label="0">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统版本"
                      prop="eq_sys_ver">
          <el-input v-model="editEqBody.eq_sys_ver"
                    placeholder="请输入设备系统版本"></el-input>
        </el-form-item>
        <el-form-item label="管理者"
                      prop="eq_owner">
          <el-input v-model="editEqBody.eq_owner"
                    placeholder="请输入管理者"></el-input>
        </el-form-item>
        <el-form-item label="SIM"
                      prop="have_sim">
          <el-radio-group v-model="editEqBody.have_sim">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备厂商"
                      prop="mf_id">
          <el-select v-model="editEqBody.mf_id"
                     :placeholder="editEqBody.mf_name">
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
                   @click="editDialogVisible = false">取 消</el-button>
        <el-button type="success"
                   size="mini"
                   @click="editEquipmentMethod()">完成</el-button>
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
      switchDialogVisible: false,
      showBorrower: false,
      switchEqBody: {
        eq_id: '',
        borrower: '',
        eq_status: ''
      },
      switchEqForm: {
        eq_status: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        borrower: [
          { required: true, message: '请输入借用人', trigger: 'blur' }
        ]
      },
      delEqBody: {
        eq_id: ''
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
      },
      editEqBody: {},
      getEqInfoBody: {
        eq_id: ''
      },
      editDialogVisible: false
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
    switchHandleClose () {
      this.$refs.switchEqFormRef.resetFields()
      this.switchDialogVisible = false
    },
    openAddDialogVisible () {
      this.addDialogVisible = true
      this.getManufacturerListMethod()
    },
    editEqMethod (EqId) {
      this.editDialogVisible = true
      this.getEqInfoBody.eq_id = EqId
      this.getEqInfoMethod()
      this.getManufacturerListMethod()
    },
    async getEqInfoMethod () {
      const { data: res } = await this.$api.equipment.eqInfo(
        this.getEqInfoBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.editEqBody = res.data
    },
    async editEquipmentMethod () {
      const { data: res } = await this.$api.equipment.eqEdit(
        this.editEqBody
      )
      if (res.code !== 1) {
        return this.$message.error(res.msg)
      }
      this.equipmentList = res.data
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
    },

    // 打开修改设备状态弹窗
    switchEqMethod (EqId, eqStatus, borrower) {
      this.switchDialogVisible = true
      this.switchEqBody.eq_id = EqId
      this.switchEqBody.borrower = borrower
      this.switchEqBody.eq_status = eqStatus
      if (eqStatus === 1) {
        this.showBorrower = true
      } else {
        this.showBorrower = false
      }
    },
    // 监控单选框状态变化
    changeRadioStatus () {
      if (this.switchEqBody.eq_status === 1) {
        this.showBorrower = true
        // this.$set(this.switchEqForm, 'borrower', [{ required: true, message: '请输入借用人', trigger: 'blur' }])
      } else {
        this.showBorrower = false
        this.$delete(this.switchEqForm.borrower)
        // this.$delete(this.switchEqBody.borrower)
      }
    },
    // 修改设备状态
    async switchEquipmentMethod () {
      if (this.switchEqBody.eq_status === 1) {
        this.switchEqBody.eq_status = 2
      } else if (this.switchEqBody.eq_status === 2) {
        this.switchEqBody.eq_status = 1
        this.switchEqBody.borrower = ''
        // this.$delete(this.switchEqBody.borrower)
      }
      const { data: res } = await this.$api.equipment.eqSwitch(
        this.switchEqBody
      )
      if (res.code !== 1) {
        return this.$message.error('修改信息失败！')
      }
      // 提示信息
      this.$message.success('修改成功！')
      this.switchDialogVisible = false
      // 刷新数据
      this.getEquipmentListMethod()
    },

    // 进入log列表页面
    goEqLog (EqId) {
      this.$router.push({ path: '/equipment/log', query: { EqId: EqId } }).catch(err => {
        console.log('输出', err)
      })
    },

    // 删除设备
    async removeEqById (EqId) {
      this.delEqBody.eq_id = EqId
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该项目, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$api.equipment.eqDel(
        this.delEqBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.getEquipmentListMethod()
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
