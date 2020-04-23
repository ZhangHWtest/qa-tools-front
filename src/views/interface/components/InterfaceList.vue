<template>
  <div>
    <el-col class="index-main">
      <h2 class="interface-title-style">当前项目:</h2>
      <el-tooltip class="item"
                  effect="dark"
                  content="新增接口"
                  placement="top">
        <el-button class="add-model-button"
                   type="primary"
                   icon="el-icon-plus"
                   plain
                   @click="addInterfaceDialog=true">新增 接口</el-button>
      </el-tooltip>
      <el-table class="interface-table"
                :data="interfaceList"
                border>
        <el-table-column width="70px"
                         label="id"
                         prop="interface_id"></el-table-column>
        <el-table-column label="接口名称">
          <template slot-scope="scope">
            <el-link type="primary"
                     @click="goInterfaceInfo(scope.row.interface_id)">{{scope.row.interface_name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="接口类型"
                         prop="interface_type"></el-table-column>
        <el-table-column label="方法"
                         prop="method"></el-table-column>
        <el-table-column label="路径"
                         prop="path"></el-table-column>
        <el-table-column label="创建人"
                         prop="create_user"></el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="getInterfaceListBody.page_num"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-col>
    <el-dialog class="addInterface-dialog"
               title="新增接口"
               :visible.sync="addInterfaceDialog"
               width="40%"
               :close-on-click-modal="false"
               @close="addInterfaceDialogClose">
      <!-- 内容主体区域-->
      <el-form ref="addInterfaceFormRef"
               :model="addInterfaceBody"
               :rules="addInterfaceRulesForm"
               label-width="90px">
        <el-form-item label="接口名:"
                      prop="interface_name">
          <el-input v-model="addInterfaceBody.interface_name"></el-input>
        </el-form-item>
        <el-form-item label="接口路径:"
                      prop="path">
          <el-input v-model="addInterfaceBody.path"
                    placeholder="/path">
            <el-select v-model="addInterfaceBody.interface_type"
                       slot="prepend"
                       placeholder="请选择">
              <el-option label="http"
                         value="http"></el-option>
              <el-option label="https"
                         value="https"></el-option>
            </el-select>
            <el-select v-model="addInterfaceBody.method"
                       slot="prepend"
                       placeholder="请选择">
              <el-option label="GET"
                         value="GET"></el-option>
              <el-option label="POST"
                         value="POST"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="接口描述:"
                      prop="interface_desc">
          <el-input v-model="addInterfaceBody.interface_desc"></el-input>
        </el-form-item>
        <el-form-item label="注:"
                      prop="interface_name">
          <p class="add-interface-desc">详细的接口数据可以在编辑页面中添加</p>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addInterfaceDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click.native="addInterfaceMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addInterfaceDialog: false,
      addInterfaceBody: {
        project_id: '',
        model_id: '',
        interface_name: '',
        interface_desc: '',
        interface_type: '',
        method: '',
        path: ''
      },
      addInterfaceRulesForm: {
        interface_name: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }]
      },
      getInterfaceListBody: {
        project_id: '',
        model_id: '',
        page_num: 1
      },
      interfaceList: []
    }
  },
  created () {
    this.getInterfaceListBody.project_id = Number(this.$route.query.projectId)
    this.getInterfaceListBody.model_id = Number(this.$route.query.modelId)
    this.getInterfaceListMethod()
  },
  watch: {
    '$route': 'getInterfaceListMethod'
  },
  methods: {
    handleClick (tab, event) {
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getInterfaceListBody.page_num = newPage
      this.getInterfaceListMethod()
    },
    addInterfaceDialogClose () {
      this.$refs.addInterfaceFormRef.resetFields()
    },
    // 获取接口列表方法
    async getInterfaceListMethod () {
      this.getInterfaceListBody.project_id = Number(this.$route.query.projectId)
      this.getInterfaceListBody.model_id = Number(this.$route.query.modelId)
      if (this.getInterfaceListBody.project_id === '') {
        delete this.getInterfaceListBody.project_id
      }
      if (this.getInterfaceListBody.model_id === '') {
        delete this.getInterfaceListBody.model_id
      }
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
      }
    },
    // 创建接口
    async addInterfaceMethod () {
      this.addInterfaceBody.project_id = Number(window.sessionStorage.getItem('interFaceProjectId'))
      this.addInterfaceBody.model_id = Number(window.sessionStorage.getItem('interFaceModelId'))
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceMethod(
        this.addInterfaceBody
      )
      if (createModelRes.code === 1) {
        this.addInterfaceDialog = false
        this.$message.success('添加接口成功！')
        this.$emit('listenChildAddInterface')
      } else {
        this.$message.error('添加接口失败！')
      }
    },
    goInterfaceInfo (intfId) {
      this.$router.push({ path: '/interface/info', query: { interfaceId: intfId } }).catch(err => {
        console.log('输出', err)
      })
    }

  }
}

</script>

<style lang="less" scoped>
.index-main {
  background-color: #fff;
  .index-main-inteface-table {
    margin-bottom: 15px;
  }
  .el-select {
    width: 90px;
    margin-right: 5px;
  }
}
// .dialog-divider {
//   margin: 10px;
// }
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.add-interface-desc {
  margin: 0px;
  color: #9297a3;
}
</style>
