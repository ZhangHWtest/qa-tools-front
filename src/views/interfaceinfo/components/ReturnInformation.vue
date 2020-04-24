<template>
  <div class="show-return-interface"
       v-show="BasicInformation">
    <h2 class="interface-title-style">返回数据设置:</h2>
    <div class="interface-info">
      <el-tabs type="border-card">
        <el-tab-pane label="JSON">
          <div>
            <el-input class="interfaceinfo-response-json"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 6}"
                      placeholder='示例：{"test":1}'
                      :disabled="showBasicInformation"
                      v-model="interfaceInfo.response">
            </el-input>
            <span slot="footer"
                  v-show="editBasicInformation"
                  class="goProject-dialog-footer-info-param">
              <el-button type="success"
                         :disabled="editResponseButton"
                         size="small"
                         @click="editInterfaceResponse()"> 提 交</el-button>
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      editResponseButton: false,
      editResponse: {
        interface_id: '',
        response: ''
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
  },
  methods: {
    // 修改 返回信息
    async editInterfaceResponse () {
      this.editResponse.interface_id = this.interfaceInfo.interface_id
      this.editResponse.response = this.interfaceInfo.response
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceResponseMethod(
        this.editResponse
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改返回信息成功！')
        // 修改完成后如何刷新
        this.getInterfaceInfo()
      } else {
        this.$message.error('修改返回信息失败！')
      }
      this.editResponseButton = true
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
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.interfaceinfo-response-json {
  margin-bottom: 15px;
}
.goProject-dialog-footer-info-param {
  position: relative;
  top: 50%;
  left: 45%;
}
</style>
