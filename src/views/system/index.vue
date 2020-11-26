<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>UI管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="interface-info-card">
      <div class="interface-top-addbutton">
        <el-button class="add-button"
                   type="primary"
                   @click="addSystemDialog=true">新增 系统</el-button>
      </div>
      <el-table :data="systemList"
                ref="multipleTableAll"
                style="width: 100%">
        <el-table-column width="70px"
                         label="id"
                         prop="id"></el-table-column>
        <el-table-column label="系统名称"
                         prop="sys_name"></el-table-column>
        <el-table-column label="系统别名"
                         prop="nick_name"></el-table-column>
        <el-table-column label="操作"
                         width="120px">
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
                         @click="showeditSysDialog(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         ricon="el-icon-edit"
                         circle
                         @click="removeSystemById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="getSystemListBody.page_num"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="systemListTotal">
      </el-pagination>
    </el-card>
    <!-- 新增项目对话框-->
    <el-dialog title="新增系统"
               :visible.sync="addSystemDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="addSystemDialogClosed">
      <el-form ref="addFormRef"
               :model="addSystemBody"
               :rules="addRulesForm"
               label-width="95px">
        <el-form-item label="系统名称："
                      prop="sys_name">
          <el-input v-model="addSystemBody.sys_name"
                    placeholder="请输入系统名"></el-input>
        </el-form-item>
        <el-form-item label="系统别名："
                      prop="nick_name">
          <el-input v-model="addSystemBody.nick_name"
                    placeholder="请输入系统名别名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addSystemDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSystemMethod()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改系统"
               :visible.sync="editSystemDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="editSystemDialogClosed">
      <el-form ref="addFormRef"
               :model="editSystemBody"
               :rules="addRulesForm"
               label-width="95px">
        <el-form-item label="系统名称："
                      prop="sys_name">
          <el-input v-model="editSystemBody.sys_name"
                    placeholder="请输入系统名"></el-input>
        </el-form-item>
        <el-form-item label="系统别名："
                      prop="nick_name">
          <el-input v-model="editSystemBody.nick_name"
                    placeholder="请输入系统名别名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editSystemDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSystemMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      getSystemListBody: {
        page_num: 1
      },
      systemList: [],
      systemListTotal: 1,
      addSystemDialog: false,
      addSystemBody: {
        sys_name: '',
        nick_name: ''
      },
      addRulesForm: {
        sys_name: [
          { required: true, message: '请输入系统名', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入别名', trigger: 'blur' },
        ]
      },
      editSystemDialog: false,
      editSystemBody: {
        id: '',
        sys_name: '',
        nick_name: ''
      },
      delSystemBody: {
        id: ''
      }
    }
  },
  created () {
    this.getSystemListMethod()
  },
  methods: {
    // 获取所有系统列表
    async getSystemListMethod () {
      const { data: res } = await this.$api.system.getSystemList(
        this.getSystemListBody
      )
      if (res.code !== 1) {
        return this.$message.error('获取系统列表失败！')
      }
      this.systemList = res.data
      this.systemListTotal = res.page_total_num
    },
    // 关闭弹窗清空 必填项校验
    addSystemDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击”确认“提交前的预校验
    addSystemMethod () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.system.addSystem(
            this.addSystemBody
          )
          if (res.code === 1) {
            this.$message.success('添加系统成功！')
            this.addSystemDialog = false
            this.reload()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    editProjectDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    showeditSysDialog (val) {
      this.editSystemBody.id = val.id
      this.editSystemBody.sys_name = val.sys_name
      this.editSystemBody.nick_name = val.nick_name
      this.editSystemDialog = true
    },
    editSystemMethod () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.system.editSystem(
            this.editSystemBody
          )
          if (res.code === 1) {
            this.$message.success('添加项目成功！')
            this.editSystemDialog = false
            this.reload()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    // 根据id删除
    async removeSystemById (_id) {
      this.delSystemBody.id = _id
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该系统, 是否继续?',
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
      const { data: res } = await this.$api.system.delSystem(
        this.delSystemBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-button {
    font-size: 13px;
    float: right;
  }
}
.project-list-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  .project-list-col-tittle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    border-radius: 4px;
    .project-list-col-tittle-name {
      margin-left: 10px;
      font-size: 15px;
      color: rgba(39, 56, 72, 0.85);
    }
    .project-list-col-tittle-button {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
.project-list-col-two {
  height: 650px;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
