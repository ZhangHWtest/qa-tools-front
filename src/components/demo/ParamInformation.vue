<template>
  <div v-show="BasicInformation">
    <h2 class="interface-title-style">请求参数:</h2>
    <div class="interface-info">
      <div class="tabPositionDiv">
        <el-radio-group v-model="tabPosition"
                        size="small"
                        class="tabPositionRadio"
                        @change="changeRadioValue">
          <el-radio-button label="Body">Body</el-radio-button>
          <!-- <el-radio-button label="Query">Query</el-radio-button> -->
          <el-radio-button label="Headers">Headers</el-radio-button>
        </el-radio-group>
      </div>
      <!-- Body模块-->
      <div v-show="bodyIsShow">
        <div>
          <el-button type="primary"
                     v-show="editBasicInformation"
                     size="mini"
                     @click="addParams()">添加参数</el-button>
        </div>
        <div>
          <el-form v-for="item in params"
                   :key="item.index"
                   :value="item.value">
            <el-input style="width: 20%;"
                      v-model="item.param_name"
                      size="mini"
                      placeholder="name"></el-input>
            <el-select style="width: 20%;"
                       v-model="item.is_necessary"
                       size="mini"
                       placeholder="是否必填">
              <el-option v-for="itemin in isNecessaryOptions"
                         :key="itemin.value"
                         :label="itemin.label"
                         :value="itemin.value">
              </el-option>
            </el-select>
            <el-input style="width: 25%;"
                      v-model="item.param_desc"
                      size="mini"
                      type="textarea"
                      autosize
                      placeholder="参数示例"></el-input>
            <el-input style="width: 30%;"
                      v-model="item.default"
                      size="mini"
                      type="textarea"
                      autosize
                      placeholder="备注"></el-input>

            <el-button size="small"
                       v-show="editBasicInformation"
                       icon="el-icon-delete"
                       circle
                       @click="delParams(item.param_name)"></el-button>

          </el-form>

        </div>
        <div class="addPrimarys">
          <el-button v-show="editBasicInformation"
                     type="success"
                     size="mini"
                     @click="editParamsMethod()">提交</el-button>
        </div>
      </div>
      <!-- Query模块-->
      <!-- Headers模块-->
      <div v-show="headersIsShow">
        <el-input class="header_input"
                  :disabled="showBasicInformation"
                  type="textarea"
                  placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                  v-model="interfaceInfo.header"></el-input>
        <span slot="footer"
              v-show="editBasicInformation"
              class="goProject-dialog-footer-info-param">
          <el-button type="success"
                     :disabled="editInterfaceHeaderButton"
                     size="small"
                     @click="editInterfaceHeader()"> 提 交</el-button>
        </span>
      </div>
    </div>
    <!-- 添加Params对话框-->
    <!-- <el-dialog title="添加接口参数"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">

      <el-form ref="addFormRef"
               :model="createParams"
               label-width="70px">
        <el-form-item label="参数名称">
          <el-input v-model="createParams.param_name"></el-input>
        </el-form-item>
        <el-form-item label="是否必需">
          <template>
            <el-radio v-model="createParams.is_necessary"
                      label="0">必需</el-radio>
            <el-radio v-model="createParams.is_necessary"
                      label="1">非必需</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="参数描述">
          <el-input v-model="createParams.param_desc"></el-input>
        </el-form-item>

        <el-form-item label="参数示例">
          <el-input v-model="createParams.default"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="createInterfaceParam ()">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 编辑接口对话框-->
    <!-- <el-dialog title="添加接口参数"
               :visible.sync="editDialogVisible"
               width="50%">
      <el-form ref="addFormRef"
               :model="editParams"
               label-width="70px">
        <el-form-item label="参数名称">
          <el-input v-model="editParams.param_name"></el-input>
        </el-form-item>
        <el-form-item label="是否必需">
          <template>
            <el-radio v-model="editParams.is_necessary"
                      label="0">必需</el-radio>
            <el-radio v-model="editParams.is_necessary"
                      label="1">非必需</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="参数描述">
          <el-input v-model="editParams.param_desc"></el-input>
        </el-form-item>

        <el-form-item label="参数示例">
          <el-input v-model="editParams.default"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editInterfaceParam ()">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo',
    'activeName'
  ],
  data () {
    return {
      tabPosition: 'Body',
      bodyIsShow: true,
      headersIsShow: false,
      showBasicInformation: false,
      editBasicInformation: false,
      BasicInformation: true,
      addDialogVisible: false,
      editDialogVisible: false,
      editInterfaceHeaderButton: false,
      // params: [{
      //   param_name: '',
      //   param_desc: '',
      //   is_necessary: '',
      //   default: ''
      // }],
      params: [],
      isNecessaryOptions: [{
        value: 0,
        label: '必需'
      }, {
        value: 1,
        label: '非必需'
      }],
      header: '',
      createParams: {
        interface_id: '',
        params: []
      },
      editHeader: {
        interface_id: '',
        header: ''
      },
      editParams: {
      }
    }
  },
  created () {
    this.interfaceInfo.params.forEach((item, index) => this.params.push(item))
    if (this.activeName === 'Tab 1') {
      this.showBasicInformation = true
    } else if (this.activeName === 'Tab 2') {
      this.editBasicInformation = true
    } else {
      this.BasicInformation = false
    }
  },
  methods: {
    changeRadioValue () {
      if (this.tabPosition === 'Body') {
        this.bodyIsShow = true
        this.headersIsShow = false
      } else if (this.tabPosition === 'Headers') {
        this.headersIsShow = true
        this.bodyIsShow = false
      }
      // console.log(this.tabPosition)
    },
    showCreateInterfaceParamDialog () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮增加一行表单
    addParams () {
      let newParamList = {
        param_name: this.param_name,
        param_desc: this.param_desc,
        is_necessary: this.is_necessary,
        default: this.default
      }
      this.params.push(newParamList)
    },
    // 删除一行
    delParams (parameName) {
      // console.log(parameName)
      this.params.forEach((item, index) => {
        if (item.param_name === parameName) {
          this.params.splice(index, 1)
        }
      })
    },
    // 创建Params
    async editParamsMethod () {
      this.createParams.interface_id = Number(this.interfaceInfo.interface_id)
      this.createParams.params = this.params
      const { data: createModelRes } = await this.$api.myinterface.editInterfaceParamMethod(
        this.createParams
      )
      if (createModelRes.code === 1) {
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        // 创建成功怎么刷新
        location.reload()
      } else {
        this.$message.error('添加参数失败！')
      }
    },
    showEditInterfaceParamDialog (paramInfo) {
      console.log(paramInfo)
      this.editDialogVisible = true
      this.editParams = paramInfo
      this.editParams.is_necessary = paramInfo.is_necessary + ''
      this.editParams.interface_id = this.interfaceInfo.interface_id
    },
    // 修改 请求头
    async editInterfaceHeader () {
      this.editHeader.interface_id = this.interfaceInfo.interface_id
      this.editHeader.header = this.interfaceInfo.header
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceHeaderMethod(
        this.editHeader
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改请求头成功！')
        // this.getInterfaceInfo()
        location.reload()
      } else {
        this.$message.error('修改请求头失败！')
      }
      this.editInterfaceHeaderButton = true
    }
  }
}
</script>
<style lang="less" scoped>
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.interface-info {
  width: 75%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eee;
}
.addPrimarys {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.tabPositionRadio {
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
}
.header_input {
  margin-bottom: 15px;
}
.goProject-dialog-footer {
  position: relative;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -100px;
}
.goProject-dialog-footer-info-param {
  position: relative;
  top: 50%;
  left: 45%;
}
</style>
