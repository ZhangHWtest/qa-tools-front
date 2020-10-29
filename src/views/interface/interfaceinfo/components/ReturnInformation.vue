<template>
  <div>
    <h2 class="interface-title-style">返回数据:</h2>
    <div class="interface-info">
      <pre v-show="activeName=='预览'?true:false">{{JSON.stringify(response,null, 4)}}</pre>
      <div class="editor-container"
           v-show="activeName=='编辑'?true:false">
        <json-editor ref="jsonEditor"
                     :key="keys"
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
      keys: '',
      editResponse: {
        interface_id: '',
        response: {}
      },
      response: {}
    }
  },
  created () {
    console.log('11111')
  },
  watch: {
    interfaceInfo (value) {
      if (value.interface_id) {
        this.keys = value.interface_id
        this.response = JSON.parse(this.interfaceInfo.response)
        this.editResponse.response = JSON.parse(this.interfaceInfo.response)
        console.log('-----', value.response)
      }
    },
    activeName (value, oldValue) {
      if (value === '编辑') {
        this.keys = value
      }
    }
  },
  methods: {
    // 修改 返回信息
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
      this.editResponseButton = true
    }
  }

}
</script>
<style lang="less" scoped>
.editor-container {
  position: relative;
  height: 100%;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.interface-info {
  width: 75%;
  margin-left: 75px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #eee;
}
.interfaceinfo-response-json {
  margin-bottom: 15px;
}
.goProject-dialog-footer-info-param {
  position: relative;
  top: 50%;
  left: 45%;
  .goProject-dialog-footer-info-button {
    margin-top: 15px;
  }
}
</style>
