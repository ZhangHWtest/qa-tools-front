<template>
  <div v-show="BasicInformation">
    <h2 class="interface-title-style">基本信息:</h2>
    <!-- 预览区域-->
    <div v-show="showBasicInformation">
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="10">
          <span class="show-interface-colkey">接口名称：</span>
          <span class="show-interface-colname">{{interfaceInfo.interface_name}}</span>
        </el-col>
        <el-col :span="10">
          <span class="show-interface-colkey">创建人：</span>
          <span class="show-interface-colname">{{interfaceInfo.create_user}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="10">
          <span class="show-interface-colkey">请求类型：</span>
          <span class="show-interface-colname">{{interfaceInfo.interface_type}}</span>
        </el-col>
        <el-col :span="10">
          <span class="show-interface-colkey">请求方法：</span>
          <span class="show-interface-colname">{{interfaceInfo.method}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="10">
          <span class="show-interface-colkey">请求路径：</span>
          <span class="show-interface-colname">{{interfaceInfo.path}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="15">
          <span class="show-interface-colkey">描述：</span>
          <text class="show-interface-colname">{{interfaceInfo.interface_desc}}</text>
        </el-col>
      </el-row>
    </div>
    <!-- 编辑区域-->
    <div class="interface-info"
         v-show="editBasicInformation">
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
                   :disabled="editInterfaceInfoButton"
                   @click="editInterfaceInfoMethod()">提 交</el-button>
      </div>

    </div>
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
      showBasicInformation: false,
      editBasicInformation: false,
      BasicInformation: true,
      editInterfaceInfoButton: false,
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
      }
    }
  },
  created () {
    if (this.activeName === 'Tab 1') {
      this.showBasicInformation = true
    } else if (this.activeName === 'Tab 2') {
      this.editBasicInformation = true
    } else {
      this.BasicInformation = false
    }
    this.editInterfaceInfo.interface_id = this.interfaceInfo.interface_id
    this.editInterfaceInfo.interface_name = this.interfaceInfo.interface_name
    this.editInterfaceInfo.interface_type = this.interfaceInfo.interface_type
    this.editInterfaceInfo.method = this.interfaceInfo.method
    this.editInterfaceInfo.path = this.interfaceInfo.path
    this.editInterfaceInfo.interface_desc = this.interfaceInfo.interface_desc
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
    }
  }

}
</script>
<style lang="less" scoped>
.interface-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
  .interface-info-button {
    text-align: center;
  }
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.show-interface {
  margin-left: 100px !important;
  margin-right: 100px !important;
  margin-bottom: 20px;
  .show-interface-colkey {
    font-size: 15px;
    color: rgba(13, 27, 62, 0.85);
    margin: 0;
    text-align: left;
    width: 100px;
    padding-left: 10px;
  }
  .show-interface-colname {
    padding-left: 16px;
    font-size: 14px;
    color: rgba(13, 27, 62, 0.65);
    margin: 0;
    width: 100px;
  }
}
</style>
