<template>
  <div>
    <div class="interface-top-select">
      <span class="interface-top-select-name">选择项目/模块：</span>
      <!-- <el-cascader v-model="newProjectValue"
                   class="interfacelist-top-select"
                   :options="options"
                   :props="{ checkStrictly: true }"
                   @change="handleChange"></el-cascader> -->
      <el-cascader v-model="newProjectValue"
                   class="interfacelist-top-select"
                   :options="options"
                   @change="handleChange"
                   :props="{ checkStrictly: true }"
                   @expand-change="expandChange"></el-cascader>
      <el-button type="primary"
                 plain
                 @click="getInterfaceListMethod()">查询</el-button>
    </div>
    <div class="interface-top-addbutton">
      <span class="interface-top-addannotation">注：添加接口必须先选择项目或模块！</span>
      <el-button class="add-model-button"
                 type="primary"
                 :disabled="buttonDisabled"
                 @click="addInterfaceDialog=true">新增 接口</el-button>
      <el-upload class="add-model-button"
                 action="/upload/">
        <el-button class="add-model-button"
                   type="primary"
                   :disabled="buttonDisabled">点击上传</el-button>
      </el-upload>
    </div>
    <el-table class="interface-table"
              :data="interfaceList"
              stripe>
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
                       prop="method">
        <template slot-scope="scope">
          <span class="show-interface-colname"
                v-if="scope.row.method === 'GET'">
            <el-tag>{{scope.row.method}}</el-tag>
          </span>
          <span class="show-interface-colname"
                v-else-if="scope.row.method === 'POST'">
            <el-tag type="success">{{scope.row.method}}</el-tag>
          </span>
          <span class="show-interface-colname"
                v-else>
            <el-tag type="warning">{{scope.row.method}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="路径"
                       prop="path"></el-table-column>
      <el-table-column label="创建人"
                       prop="create_user"></el-table-column>
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
                   :current-page="getInterfaceListBody.page_num"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="1000">
    </el-pagination>

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
            <el-select class="addinterface-dialog-select"
                       v-model="addInterfaceBody.interface_type"
                       slot="prepend"
                       placeholder="请选择">
              <el-option label="http"
                         value="http"></el-option>
              <el-option label="https"
                         value="https"></el-option>
            </el-select>
            <el-select class="addinterface-dialog-select"
                       v-model="addInterfaceBody.method"
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
      fileList: [{
        name: '', url: ''
      }],
      newProjectValue: '',
      options: [],
      getProjectListBody: {},
      projectList: [],
      projectValue: '',
      getModelListBody: {
        project_id: ''
      },
      modelList: [],
      modelValue: '',
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
      interfaceList: [],
      delInterfaceBody: {
        interface_id: ''
      },
      buttonDisabled: true
    }
  },
  created () {
    this.getProjectListMethod()
    this.getInterfaceListMethod()
  },
  mounted () {
    // 点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
    // 这种比较耗性能，暂时想不到其他的，能实现效果了。
    setInterval(function () {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  watch: {
    projectValue: 'getModelListMethod'
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
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
    // 获取所有项目列表
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data

      this.projectList.forEach(item => {
        this.$set(this.options, item.project_id, { 'value': item.project_id, 'label': item.project_name, 'children': [] })
      })
    },
    handleChange (value) {
      this.getInterfaceListBody.project_id = Number(value[0])
      this.addInterfaceBody.project_id = Number(value[0])
      if (value.length === 1) {
        this.getModelListBody.project_id = Number(value[0])
        this.getModelListMethodTwo(value)
      } else {
        this.getInterfaceListBody.model_id = Number(value[1])
        this.addInterfaceBody.model_id = Number(value[1])
      }
    },
    expandChange (value) {
      this.getInterfaceListBody.project_id = Number(value[0])
      this.addInterfaceBody.project_id = Number(value[0])
      this.getModelListBody.project_id = Number(value[0])
      this.getModelListMethodTwo(value)
    },
    // 获取所有模块列表
    async getModelListMethodTwo (value) {
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.modelList = responseBody.data
      let children = []
      this.modelList.forEach(item => {
        // console.log(this.options[value])
        children.push({
          value: item.model_id, label: item.model_name
        })
      })
      this.$set(this.options, value, { ...this.options[value], children })
    },
    // 获取所有模块列表
    async getModelListMethod () {
      if (!this.projectValue) {
      } else {
        this.modelValue = ''
        this.getModelListBody.project_id = this.projectValue
        const { data: responseBody } = await this.$api.project.getModelList(
          this.getModelListBody
        )
        if (responseBody.code !== 1) {
          return this.$message.error('获取用户列表失败！')
        }
        this.modelList = responseBody.data
      }
    },
    // 获取接口列表方法
    async getInterfaceListMethod () {
      console.log(this.getInterfaceListBody.project_id)
      if (!this.getInterfaceListBody.project_id) {
        delete this.getInterfaceListBody.project_id
        this.buttonDisabled = true
      } else {
        this.buttonDisabled = false
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
      if (this.addInterfaceBody.model_id === '') {
        delete this.addInterfaceBody.model_id
      }
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
    async removeInterfaceById (_id) {
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
      this.getInterfaceListMethod()
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
.interface-top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .interface-top-select-name {
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .interfacelist-top-select {
    padding-right: 15px;
    width: 300px;
  }
}
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
