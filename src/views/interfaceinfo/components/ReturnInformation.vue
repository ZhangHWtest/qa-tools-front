<template>
  <div class="show-return-interface">
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
          </div>
          <!-- <div v-show="editBasicInformation">
            <el-input class="interfaceinfo-response-json"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 6}"
                      placeholder='示例：{"test":1}'
                      v-model="interfaceInfo.response">
            </el-input>
          </div> -->
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
      editBasicInformation: false
    }
  },
  created () {
    if (this.activeName === '1') {
      this.showBasicInformation = true
    } else if (this.activeName === '2') {
      this.editBasicInformation = true
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
</style>
