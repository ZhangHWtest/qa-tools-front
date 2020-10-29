<template>
  <div v-show="activeName=='编辑'?true:false">
    <h2 class="interface-title-style">基本信息:</h2>
    <div class="interface-info">
      <el-form ref="addFormRef"
               :model="editInterfaceInfo"
               :rules="addRulesForm"
               label-width="100px">
        <el-form-item label="接口名称:"
                      prop="interface_name">
          <el-input class="interface_name"
                    placeholder="请输接口名称"
                    v-model="editInterfaceInfo.interface_name"></el-input>
        </el-form-item>
        <el-form-item label="接口类型:"
                      prop="interface_type">
          <el-select v-model="editInterfaceInfo.interface_type"
                     placeholder="请选择接口类型">
            <el-option v-for="item in interface_type_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求类型:"
                      prop="method">
          <el-select v-model="editInterfaceInfo.method"
                     placeholder="请选择请求类型">
            <el-option v-for="item in method_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求路径:"
                      prop="path">
          <el-input class="project_name_input"
                    placeholder="请输入请求路径"
                    v-model="editInterfaceInfo.path"></el-input>
        </el-form-item>
        <el-form-item label="接口描述:">
          <el-input class="project_name_input"
                    type="textarea"
                    placeholder="请输入描述信息"
                    v-model="editInterfaceInfo.interface_desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 预留提交按钮-->
      <div class="interface-info-button">
        <el-button type="success"
                   size="mini"
                   @click="editInterfaceInfoMethod()">提 交</el-button>
      </div>
    </div>
    <!-- 请求参数区域 -->
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
                      placeholder="参数名称"></el-input>
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
                       icon="el-icon-delete"
                       circle
                       @click="delParams(item.param_name)"></el-button>
          </el-form>
        </div>
        <div class="addPrimarys">
          <el-button type="success"
                     size="mini"
                     @click="editParamsMethod()">提交</el-button>
        </div>
      </div>
      <!-- Query模块-->
      <!-- Headers模块-->
      <div v-show="headersIsShow">
        <el-input class="header_input"
                  type="textarea"
                  placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                  v-model="interfaceInfo.header"></el-input>
        <span slot="footer"
              class="goProject-dialog-footer-info-param">
          <el-button type="success"
                     size="small"
                     @click="editInterfaceHeader()"> 提 交</el-button>
        </span>
      </div>
    </div>
    <!-- 返回数据区域 -->
    <h2 class="interface-title-style">返回数据:</h2>
    <div class="editor-container">
      <json-editor :key="activeName"
                   v-model="editResponse.response" />
      <span slot="footer"
            class="goProject-dialog-footer-info-param">
        <el-button class="goProject-dialog-footer-info-button"
                   type="success"
                   size="small"
                   @click="editInterfaceResponse()"> 提 交</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import JsonEditor from '@/components/JsonEditor'
export default {
  props: [
    'interfaceInfo',
    'activeName'
  ],
  components: {
    JsonEditor
  },
  data () {
    return {
      tabPosition: 'Body',
      bodyIsShow: true,
      headersIsShow: false,
      editInterfaceInfo: {
        interface_id: '',
        interface_name: '',
        interface_type: '',
        method: '',
        path: '',
        interface_desc: ''
      },
      interface_type_options: [{
        value: 'http',
        label: 'http'
      }, {
        value: 'https',
        label: 'https'
      }],
      method_options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }],
      addRulesForm: {
        interface_name: [
          { required: true, message: '请输入接口名', trigger: 'blur' }
        ],
        interface_type: [
          { required: true, trigger: 'blur' }
        ],
        method: [
          { required: true, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ]
      },
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
      editResponse: {
        interface_id: '',
        response: {}
      }
    }
  },
  created () { },
  watch: {
    interfaceInfo (value, oldValue) {
      if (value.interface_id) {
        this.editInterfaceInfo.interface_id = this.interfaceInfo.interface_id
        this.editInterfaceInfo.interface_name = this.interfaceInfo.interface_name
        this.editInterfaceInfo.interface_type = this.interfaceInfo.interface_type
        this.editInterfaceInfo.method = this.interfaceInfo.method
        this.editInterfaceInfo.path = this.interfaceInfo.path
        this.editInterfaceInfo.interface_desc = this.interfaceInfo.interface_desc
        this.editResponse.response = JSON.parse(this.interfaceInfo.response)
        this.interfaceInfo.params.forEach((item, index) => this.params.push(item))
      }
    }
  },
  methods: {
    // 修改接口
    async editInterfaceInfoMethod () {
      const { data: serverResponse } = await this.$api.myinterface.editInterfaceMethod(
        this.editInterfaceInfo
      )
      if (serverResponse.code === 1) {
        this.$message.success('修改接口成功！')
      } else {
        this.$message.error('修改接口失败！')
      }
      this.editInterfaceInfoButton = true
    },
    changeRadioValue () {
      if (this.tabPosition === 'Body') {
        this.bodyIsShow = true
        this.headersIsShow = false
      } else if (this.tabPosition === 'Headers') {
        this.headersIsShow = true
        this.bodyIsShow = false
      }
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
    },
    async editInterfaceResponse () {
      this.editResponse.interface_id = this.interfaceInfo.interface_id
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceResponseMethod(
        { ...this.editResponse, response: JSON.stringify(JSON.parse(this.editResponse.response)) }
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改返回信息成功！')
        // 修改完成后如何刷新
        location.reload()
      } else {
        this.$message.error('修改返回信息失败！')
      }
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
  .interface-info-button {
    text-align: center;
  }
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
.editor-container {
  width: 78%;
  margin-left: 100px;
  background-color: #eee;
  position: relative;
  height: 100%;
}
</style>
