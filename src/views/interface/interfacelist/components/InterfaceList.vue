<template>
  <div>
    <div>
      <search-component
        :sub-arr="['inputName','proModCascader','seachButton']"
        @changeChildValueMethod="changeChildValueMethod"
      />
    </div>
    <div class="interface-top-addbutton">
      <span class="interface-top-addannotation">注：添加接口必须先选择项目或模块！</span>
      <el-button
        class="add-model-button"
        type="primary"
        :disabled="buttonDisabled"
        @click="addInterfaceDialog=true"
      >
        新增 接口
      </el-button>
      <el-upload
        class="add-model-button"
        action="/upload/"
      >
        <el-button
          class="add-model-button"
          type="primary"
          plain
          :disabled="buttonDisabled"
        >
          导入接口
        </el-button>
      </el-upload>
    </div>
    <el-table
      class="interface-table"
      :data="interfaceList"
      stripe
    >
      <el-table-column
        width="70px"
        label="id"
        prop="interface_id"
      />
      <el-table-column label="接口名称">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="goInterfaceInfo(scope.row.interface_id)"
          >
            {{ scope.row.interface_name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="接口类型"
        prop="interface_type"
      />
      <el-table-column
        label="方法"
        prop="method"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.method === 'GET'"
            class="show-interface-colname"
          >
            <el-tag>{{ scope.row.method }}</el-tag>
          </span>
          <span
            v-else-if="scope.row.method === 'POST'"
            class="show-interface-colname"
          >
            <el-tag type="success">{{ scope.row.method }}</el-tag>
          </span>
          <span
            v-else
            class="show-interface-colname"
          >
            <el-tag type="warning">{{ scope.row.method }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="路径"
        prop="path"
      />
      <el-table-column
        label="创建人"
        prop="create_user"
      />
      <el-table-column
        label="操作"
        width="150px"
      >
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="修改"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="goInterfaceInfo(scope.row.interface_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="移动"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-right"
              size="mini"
              ricon="el-icon-right"
              circle
              @click="openInterfaceMoveDialog(scope.row.interface_id)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="removeInterfaceById(scope.row.interface_id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="getInterfaceListBody.page_num"
      layout="prev, pager, next"
      :total="interfaceListTotal"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      class="addInterface-dialog"
      title="新增接口"
      :visible.sync="addInterfaceDialog"
      width="40%"
      :close-on-click-modal="false"
      @close="addInterfaceDialogClose"
    >
      <!-- 内容主体区域-->
      <el-form
        ref="addInterfaceFormRef"
        :model="addInterfaceBody"
        :rules="addInterfaceRulesForm"
        label-width="90px"
      >
        <el-form-item
          label="接口名:"
          prop="interface_name"
        >
          <el-input v-model="addInterfaceBody.interface_name" />
        </el-form-item>
        <el-form-item
          label="接口路径:"
          prop="path"
        >
          <el-input
            v-model="addInterfaceBody.path"
            placeholder="/path"
          >
            <el-select
              slot="prepend"
              v-model="addInterfaceBody.interface_type"
              class="addinterface-dialog-select"
              placeholder="请选择"
            >
              <el-option
                label="http"
                value="http"
              />
              <el-option
                label="https"
                value="https"
              />
            </el-select>
            <el-select
              slot="prepend"
              v-model="addInterfaceBody.method"
              class="addinterface-dialog-select"
              placeholder="请选择"
            >
              <el-option
                label="GET"
                value="GET"
              />
              <el-option
                label="POST"
                value="POST"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item
          label="接口描述:"
          prop="interface_desc"
        >
          <el-input v-model="addInterfaceBody.interface_desc" />
        </el-form-item>
        <el-form-item
          label="注:"
          prop="interface_name"
        >
          <p class="add-interface-desc">
            详细的接口数据可以在编辑页面中添加
          </p>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addInterfaceDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="addInterfaceMethod()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="moveInterface-dialog"
      title="移动接口"
      :visible.sync="openIMDialog"
      width="40%"
      :close-on-click-modal="false"
      @close="openIMDialogClose"
    >
      <!-- 内容主体区域-->
      <el-form
        ref="moveInterfaceFormRef"
        :model="interfaceMoveBody"
        :rules="interfaceMoveBodyForm"
      >
        <el-form-item>
          <SearchComponent :parent-is-show-seach-button="parentIsShowSeachButton" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="openIMDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="interfaceMoveMethod()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent/index'
export default {
  inject: ['reload'],
  components: {
    SearchComponent
  },
  data() {
    return {
      inputName: '接口',
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
        interface_name: '',
        page_num: 1
      },
      interfaceList: [],
      interfaceListTotal: 1,
      delInterfaceBody: {
        interface_id: ''
      },
      buttonDisabled: true,
      interfaceMoveBody: {
        project_id: '',
        model_id: '',
        interface_id: ''
      },
      interfaceMoveBodyForm: {
        // project_id: [{ required: true }]
      },
      openIMDialog: false,
      parentIsShowSeachButton: false
    }
  },
  created() {
    this.getInterfaceListMethod()
  },
  methods: {
    changeChildValueMethod() {
      this.getInterfaceListMethod()
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.getInterfaceListBody.page_num = newPage
      this.getInterfaceListMethod()
    },
    addInterfaceDialogClose() {
      this.$refs.addInterfaceFormRef.resetFields()
    },
    openInterfaceMoveDialog(val) {
      this.openIMDialog = true
      this.interfaceMoveBody.interface_id = val
    },
    openIMDialogClose() {
      this.$refs.moveInterfaceFormRef.resetFields()
    },
    // 获取接口列表方法
    async getInterfaceListMethod() {
      if (sessionStorage.getItem('inputKey') === this.inputName) {
        this.getInterfaceListBody.interface_name = sessionStorage.getItem('inputName')
      } else {
        delete this.getInterfaceListBody.interface_name
      }
      if (!sessionStorage.getItem('projectId')) {
        delete this.getInterfaceListBody.project_id
        this.buttonDisabled = true
      } else {
        this.getInterfaceListBody.project_id = Number(sessionStorage.getItem('projectId'))
        this.buttonDisabled = false
      }
      if (!sessionStorage.getItem('modelId')) {
        delete this.getInterfaceListBody.model_id
      } else {
        this.getInterfaceListBody.model_id = Number(sessionStorage.getItem('modelId'))
      }
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
        this.interfaceListTotal = responseBody.page_total_num * 10
      }
    },
    // 创建接口
    async addInterfaceMethod() {
      if (!sessionStorage.getItem('modelId')) {
        delete this.addInterfaceBody.model_id
      } else {
        this.addInterfaceBody.model_id = Number(sessionStorage.getItem('modelId'))
      }
      this.addInterfaceBody.project_id = Number(sessionStorage.getItem('projectId'))
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceMethod(
        this.addInterfaceBody
      )
      if (createModelRes.code === 1) {
        this.addInterfaceDialog = false
        this.$message.success('添加接口成功！')
        this.getInterfaceListMethod()
      } else {
        this.$message.error('添加接口失败！')
      }
    },
    // 根据id删除
    async removeInterfaceById(_id) {
      this.delInterfaceBody.interface_id = _id
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
      const { data: res } = await this.$api.myinterface.delInterfaceMethod(
        this.delInterfaceBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.reload()
    },
    // 创建接口
    async interfaceMoveMethod() {
      if (!sessionStorage.getItem('projectId')) {
        delete this.interfaceMoveBody.project_id
      } else {
        this.interfaceMoveBody.project_id = Number(sessionStorage.getItem('projectId'))
      }
      if (!sessionStorage.getItem('modelId')) {
        delete this.interfaceMoveBody.model_id
      } else {
        this.interfaceMoveBody.model_id = Number(sessionStorage.getItem('modelId'))
      }
      const { data: interMovelRes } = await this.$api.myinterface.getInterfaceMoveMethod(
        this.interfaceMoveBody
      )
      if (interMovelRes.code === 1) {
        this.openIMDialog = false
        this.$message.success('移动接口成功！')
        this.reload()
      } else {
        this.$message.error('移动接口失败！')
      }
    },
    goInterfaceInfo(intfId) {
      this.$router.push({ path: '/interface/info', query: { interfaceId: intfId }}).catch(err => {
        console.log('输出', err)
      })
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
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    float: right;
    margin-left: 10px;
  }
}
.addinterface-dialog-select {
  width: 90px;
  margin-right: 5px;
}
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
