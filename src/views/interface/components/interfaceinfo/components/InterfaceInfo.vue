<template>
  <div>
    <!-- 基本信息区域-->
    <el-card>
      <h2 class="interface-title-style">基本信息:</h2>
      <div class="interface-info">
        <!-- 表单区域-->
        <el-form ref="addFormRef"
                 :model="createInterfaceBody"
                 :rules="addRulesForm"
                 label-width="100px">
          <el-form-item label="项目名称:"
                        v-show="formProjectAndModel"
                        prop="project_name">
            <el-select v-model="projectList.project_id"
                       placeholder="请选择项目"
                       @change="addInterfaceGetModelList(projectList.project_id)">
              <el-option v-for="item in projectList"
                         :key="item.project_id"
                         :label="item.project_name"
                         :value="item.project_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称:"
                        v-show="formProjectAndModel"
                        prop="model_name">
            <el-select v-model="modelList.model_id"
                       placeholder="请选择模块">
              <el-option v-for="item in modelList.list"
                         :key="item.model_id"
                         :label="item.model_name"
                         :value="item.model_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口名称:"
                        prop="interface_name">
            <el-input class="interface_name"
                      placeholder="请输接口名称"
                      v-model="createInterfaceBody.interface_name"></el-input>
          </el-form-item>

          <el-form-item label="接口类型:"
                        prop="interface_type">
            <el-select v-model="createInterfaceBody.interface_type"
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
            <el-select v-model="createInterfaceBody.method"
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
                      v-model="createInterfaceBody.path"></el-input>
          </el-form-item>
          <el-form-item label="接口描述:">
            <el-input class="project_name_input"
                      type="textarea"
                      placeholder="请输入描述信息"
                      v-model="createInterfaceBody.interface_desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="goProject-dialog-footer-info-param">
          <el-tooltip class="item"
                      effect="dark"
                      content="提交"
                      placement="top">
            <el-button type="success"
                       icon="el-icon-plus"
                       size="small"
                       circle
                       v-show="createInterfaceButton"
                       @click="createInterface()"></el-button>
          </el-tooltip>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    createInterfaceBody: [],
    addRulesForm: {},
    formProjectAndModel: [],
    projectList: []
  },
  data () {
    return {}
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
</style>
