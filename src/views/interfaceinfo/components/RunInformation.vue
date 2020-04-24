<template>
  <div v-show="RunBasicInformation">
    <h2 class="interface-title-style">接口:</h2>
    <div class="run-input-interface">
      <el-select v-model="runEnv"
                 class="env-select"
                 slot="prepend"
                 placeholder="请选择环境：">
        <el-option v-for="item in envList"
                   :key="item.env_id"
                   :label="item.url"
                   :value="item.url"></el-option>
      </el-select>
      <el-select v-model="interfaceInfo.method"
                 class="env-select-method"
                 disabled
                 slot="prepend"
                 placeholder="请选择">
        <el-option label="GET"
                   value="GET"></el-option>
        <el-option label="POST"
                   value="POST"></el-option>
      </el-select>

      <el-input class="run-input-interface-path"
                v-model="interfaceInfo.path"
                :disabled="true"></el-input>
      <el-tooltip class="item"
                  effect="dark"
                  content="保存"
                  placement="top">
        <el-button type="primary"
                   size="mini"
                   icon="el-icon-plus">保 存</el-button>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="测试"
                  placement="top">
        <el-button type="success"
                   size="mini"
                   icon="el-icon-position">发 送</el-button>
      </el-tooltip>

    </div>
    <h2 class="interface-title-style">Response:</h2>
    <div class="interface-info">
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="10">
          <span class="show-interface-colkey">Headers</span>
          <el-input class="interfaceinfo-response-json"
                    :disabled="true"
                    type="textarea"
                    :autosize="{ minRows: 12, maxRows: 16}"
                    placeholder='示例：{"test":1}'
                    v-model="interfaceInfo.header">
          </el-input>
        </el-col>
        <el-col :span="10">
          <span class="show-interface-colkey">Body</span>
          <el-input class="interfaceinfo-response-json"
                    type="textarea"
                    :autosize="{ minRows: 12, maxRows: 16}"
                    placeholder='示例：{"test":1}'
                    :disabled="true"
                    v-model="interfaceInfo.response">
          </el-input>
        </el-col>
      </el-row>
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
      RunBasicInformation: false,
      envList: [],
      getEnvBody: {
      },
      runEnv: ''
    }
  },
  created () {
    if (this.activeName === 'Tab 3') {
      this.RunBasicInformation = true
      this.getEnvListMethod()
    }
  },
  methods: {
    async getEnvListMethod () {
      const { data: responseBody } = await this.$api.environment.getEnvironmentList(
        this.getEnvBody
      )
      if (responseBody.code === 1) {
        this.envList = responseBody.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    }
  }

}
</script>
<style lang="less" scoped>
.el-select {
  width: 90px;
  margin-right: 5px;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.interface-info {
  width: 85%;
  margin-left: 50px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.run-input-interface {
  margin-left: 50px;
  .run-input-interface-path {
    width: 150px;
    margin-right: 0px;
  }
  .env-select {
    width: 380px;
    margin-right: 0px;
  }
  .env-select-method {
    margin-right: 0px;
  }
  .run-input-interface-path {
    margin-right: 10px;
  }
}
</style>
