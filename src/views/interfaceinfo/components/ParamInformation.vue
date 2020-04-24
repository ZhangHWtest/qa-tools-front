<template>
  <div v-show="BasicInformation">
    <h2 class="interface-title-style">请求参数:</h2>
    <div class="interface-info">
      <el-tabs type="border-card">
        <el-tab-pane label="param">
          <div>
            <el-table border
                      :data="interfaceInfo.params">
              <el-table-column label="参数id"
                               prop="param_id"></el-table-column>
              <el-table-column label="参数名称"
                               prop="param_name"></el-table-column>
              <el-table-column label="是否必填"
                               prop="is_necessary">
                <template slot-scope="scope">
                  <font v-if="scope.row.is_necessary === 0"
                        color="#67C23A">必需</font>
                  <font v-else
                        color="#F56C6C">非必需</font>
                </template>
              </el-table-column>
              <el-table-column label="参数示例"
                               prop="default"></el-table-column>
              <el-table-column label="备注"
                               prop="param_desc"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-tooltip class="item"
                              effect="dark"
                              content="修改"
                              placement="top">
                    <el-button type="primary"
                               v-show="editBasicInformation"
                               icon="el-icon-edit"
                               size="mini"
                               ricon="el-icon-edit"
                               circle
                               @click="showEditInterfaceParamDialog(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item"
                              effect="dark"
                              content="删除"
                              placement="top">
                    <el-button type="danger"
                               v-show="editBasicInformation"
                               icon="el-icon-delete"
                               size="mini"
                               ricon="el-icon-edit"
                               circle
                               @click="removeInterfaceParamById(scope.row.param_id)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer"
                  v-show="editBasicInformation"
                  class="goProject-dialog-footer-info-param">
              <el-tooltip class="item"
                          effect="dark"
                          content="提交"
                          placement="top">
                <el-button type="success"
                           icon="el-icon-plus"
                           size="small"
                           circle
                           @click="showCreateInterfaceParamDialog()"></el-button>
              </el-tooltip>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="header">
          <div>
            <el-input class="header_input"
                      :disabled="showBasicInformation"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="interfaceInfo.header"></el-input>
            <span slot="footer"
                  v-show="editBasicInformation"
                  class="goProject-dialog-footer-info-param">
              <el-tooltip class="item"
                          effect="dark"
                          content="提交"
                          placement="top">
                <el-button type="success"
                           icon="el-icon-plus"
                           size="small"
                           circle
                           @click="createInterfaceHeader()"></el-button>
              </el-tooltip>
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
      BasicInformation: true
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
</style>
