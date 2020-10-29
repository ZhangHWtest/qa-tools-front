<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="showForm"
               width="50%"
               :close-on-click-modal='false'
               @close="closeDialogMethod()">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="createEnvBody"
               :rules="addRulesForm"
               label-width="120px">
        <el-form-item label="环境名："
                      prop="env_name">
          <el-input v-model="createEnvBody.env_name"></el-input>
        </el-form-item>
        <el-form-item label="地址："
                      prop="url">
          <el-input v-model="createEnvBody.url"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="createEnvBody.desc"></el-input>
        </el-form-item>
        <el-form-item label="启用db："
                      prop="use_db">
          <template>
            <el-radio v-model="createEnvBody.use_db"
                      :label="0">禁用</el-radio>
            <el-radio v-model="createEnvBody.use_db"
                      :label="1">启用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="host："
                      v-show="createEnvBody.use_db==1?true:false">
          <el-input v-model="createEnvBody.db_host"></el-input>
        </el-form-item>
        <el-form-item label="端口："
                      v-show="createEnvBody.use_db==1?true:false">
          <el-input v-model="createEnvBody.db_port"></el-input>
        </el-form-item>
        <el-form-item label="用户名："
                      v-show="createEnvBody.use_db==1?true:false">
          <el-input v-model="createEnvBody.db_user"></el-input>
        </el-form-item>
        <el-form-item label="密码："
                      v-show="createEnvBody.use_db==1?true:false">
          <el-input v-model="createEnvBody.db_pass"></el-input>
        </el-form-item>
        <el-form-item label="数据库名称："
                      v-show="createEnvBody.use_db==1?true:false">
          <el-input v-model="createEnvBody.database"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeDialogMethod()">取 消</el-button>
        <el-button type="primary"
                   @click="addEnv()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    model: {
      type: Object,
      default: null
    },
    showForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getEnvInfoData: {
        env_id: ''
      },
      createEnvBody: {
        env_name: '',
        desc: '',
        url: '',
        use_db: 0,
        db_host: '',
        db_port: '',
        db_user: '',
        db_pass: '',
        database: ''
      },
      addRulesForm: {
        env_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        url: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        use_db: [{ required: true }]

      }
    }
  },
  watch: {
    // 监听 编辑时回显表单
    model (editEnvData) {
      this.createEnvBody = { ...editEnvData } // 简单的浅克隆
    }
  },
  methods: {
    addEnv () {
      this.$emit('listenToChildSaveEnvMethod', this.createEnvBody)
    },
    closeDialogMethod () {
      this.$emit('listenToChildShowDialog', false)
    }
  }
}
</script>
