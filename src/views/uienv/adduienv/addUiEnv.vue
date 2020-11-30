<template>
  <div class="main-div-style">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>UI管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增环境</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="main-card">
      <h2 class="title-style">
        基本信息:
      </h2>
      <div class="card-div">
        <el-form
          ref="addPublicFormRef"
          :model="addEnvBody"
          :rules="addEnvRulesForm"
          label-width="100px"
        >
          <el-form-item label="系统名称:" prop="sys_name">
            <el-input v-model="addEnvBody.sys_name" placeholder="请输入系统名称" />
          </el-form-item>
          <el-form-item label="执行机器IP:" prop="remote">
            <el-input v-model="addEnvBody.remote" placeholder="请输入执行机器ip" />
          </el-form-item>
          <el-form-item label="端信息:" prop="platform_id">
            <el-radio v-model="addEnvBody.platform_id" :label="1">web</el-radio>
            <el-radio v-model="addEnvBody.platform_id" :label="2">android</el-radio>
            <el-radio v-model="addEnvBody.platform_id" :label="3">ios</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <h2 class="title-style">
        配置详情:
      </h2>
      <div class="card-div">
        <!-- addWebEnvBody-->
        <el-form
          v-show="addEnvBody.platform_id == 1 ? true:false"
          ref="addWebFormRef"
          :model="addEnvBody"
          :rules="addEnvRulesForm"
          label-width="100px"
        >
          <el-form-item label="浏览器:" prop="browser_id">
            <el-radio v-model="addEnvBody.browser_id" :label="1">chrome</el-radio>
            <el-radio v-model="addEnvBody.browser_id" :label="2">firefox</el-radio>
          </el-form-item>
          <el-form-item label="访问地址:" prop="url">
            <el-input v-model="addEnvBody.url" placeholder="请输入访问地址" />
          </el-form-item>
        </el-form>
        <!-- addEnvAndroidBody-->
        <el-form
          v-show="addEnvBody.platform_id == 2 ? true:false"
          ref="addAndroidFormRef"
          :model="addEnvBody"
          :rules="addEnvRulesForm"
          label-width="100px"
        >
          <el-form-item label="设备名称:" prop="device_name">
            <el-input v-model="addEnvBody.device_name" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="包名:" prop="app_package">
            <el-input v-model="addEnvBody.app_package" placeholder="请输入包名" />
          </el-form-item>
          <el-form-item label="activity名:" prop="app_activity">
            <el-input v-model="addEnvBody.app_activity" placeholder="请输入activity名" />
          </el-form-item>
          <el-form-item label="授权：" prop="auto_grant_permissions">
            <el-radio v-model="addEnvBody.auto_grant_permissions" :label="0">不自动授权</el-radio>
            <el-radio v-model="addEnvBody.auto_grant_permissions" :label="1">自动授权</el-radio>
          </el-form-item>
          <el-form-item label="输入法：" prop="unicode_keyboard">
            <el-radio v-model="addEnvBody.unicode_keyboard" :label="0">不切换</el-radio>
            <el-radio v-model="addEnvBody.unicode_keyboard" :label="1">切换</el-radio>
          </el-form-item>
          <el-form-item label="恢复输入法：" prop="reset_kyeboard">
            <el-radio v-model="addEnvBody.reset_kyeboard" :label="0">不恢复</el-radio>
            <el-radio v-model="addEnvBody.reset_kyeboard" :label="1">恢复</el-radio>
          </el-form-item>
          <el-form-item label="清除数据：" prop="noreset">
            <el-radio v-model="addEnvBody.noreset" :label="0">清除</el-radio>
            <el-radio v-model="addEnvBody.noreset" :label="1">不清除</el-radio>
          </el-form-item>
          <el-form-item label="chromedriver:" prop="chrome_driver_executable_dir">
            <el-input v-model="addEnvBody.chrome_driver_executable_dir" placeholder="请输入chromedriver路径" />
          </el-form-item>
          <el-form-item label="等待activity:" prop="app_wait_activity">
            <el-input v-model="addEnvBody.app_wait_activity" placeholder="请输入等待activity" />
          </el-form-item>
        </el-form>
        <!--addEnvIosBody -->
        <el-form
          v-show="addEnvBody.platform_id == 3 ? true:false"
          ref="addIosFormRef"
          :model="addEnvBody"
          :rules="addEnvRulesForm"
          label-width="100px"
        >
          <el-form-item label="系统版本:" prop="platform_version">
            <el-input v-model="addEnvBody.platform_version" placeholder="请输入系统版本" />
          </el-form-item>
          <el-form-item label="apk位置:" prop="app">
            <el-input v-model="addEnvBody.app" placeholder="请输入apk位置" />
          </el-form-item>
          <el-form-item label="测试包名:" prop="bundle_id">
            <el-input v-model="addEnvBody.bundle_id" placeholder="请输入测试包名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="footer-card">
      <div class="footer-button">
        <el-button @click="goEnvList()">
          取 消
        </el-button>
        <el-button
          type="success"
          @click="addEnvMethod()"
        >
          提 交
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addEnvBody: {
        sys_name: '',
        remote: '',
        platform_id: 1,
        // ios
        platform_version: '',
        app: '',
        automation_name: '',
        udid: '',
        xcode_orgid: '',
        xcode_signing_id: '',
        bundle_id: '',
        // android
        device_name: '',
        app_package: '',
        app_activity: '',
        auto_grant_permissions: 1,
        unicode_keyboard: 1,
        reset_kyeboard: 1,
        noreset: 1,
        chrome_driver_executable_dir: '',
        app_wait_activity: '',
        // web
        browser_id: 1,
        url: ''
      },
      addEnvRulesForm: {
        sys_name: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ],
        platform_id: [
          { required: true, message: '请选择端信息' }
        ],
        remote: [
          { required: true, message: '请输入执行机器ip', trigger: 'blur' }
        ],
        // web
        browser_id: [
          { required: true, message: '请选择端信息' }
        ],
        url: [
          { required: true, message: '请输入访问地址', trigger: 'blur' }
        ],
        // android
        device_name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        app_package: [
          { required: true, message: '请输包名', trigger: 'blur' }
        ],
        // ios
        platform_version: [
          { required: true, message: '请输入系统版本', trigger: 'blur' }
        ],
        app: [
          { required: true, message: '请输入apk位置', trigger: 'blur' }
        ],
        bundle_id: [
          { required: true, message: '请输入测试包名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkForm() {
      this.$refs.addPublicFormRef.validate((valid) => {
        return valid
      })
    },
    addEnvMethod() {
      this.$refs.addPublicFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$api.testcase.editCase(
            this.addEnvBody
          )
          if (res.code === 1) {
            this.$message.success('新增成功')
            this.goEnvList()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    goEnvList() {
      this.$router.push({ path: '/uienv/list' })
    }
  }

}
</script>
<style lang="less" scoped>
.main-div-style {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.title-style {
  font-size: 20px;
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.card-div {
  width: 75%;
  margin-left: 50px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 80px;
  background-color: #eee;
}
.card-radio-group{
  width: 230px;
  margin: 0 auto;
}
.el-radio {
    margin-right: 10px;
}
.el-form-item {
    margin-bottom: 18px;
}
.footer-card {
  background-color: #373d41;
  position: fixed;
  z-index: 100;
  bottom: 5px;
  width: 83%;
  height: 50px;
}
.footer-button {
  position: absolute;
  left: 50%;
  transform: translate(-90%, -15%);
}
</style>
