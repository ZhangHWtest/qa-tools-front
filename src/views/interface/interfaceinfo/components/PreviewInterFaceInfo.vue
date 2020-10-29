<template>
  <div v-show="activeName=='预览'?true:false">
    <h2 class="interface-title-style">基本信息:</h2>
    <!-- 预览区域-->
    <div>
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
          <template>
            <span class="show-interface-colname"
                  v-if="interfaceInfo.method === 'GET'">
              <el-tag>{{interfaceInfo.method}}</el-tag>
            </span>
            <span class="show-interface-colname"
                  v-else-if="interfaceInfo.method === 'POST'">
              <el-tag type="success">{{interfaceInfo.method}}</el-tag>
            </span>
            <span class="show-interface-colname"
                  v-else>
              <el-tag type="warning">{{interfaceInfo.method}}</el-tag>
            </span>
          </template>
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
          <span class="show-interface-colname">{{interfaceInfo.interface_desc}}</span>
        </el-col>
      </el-row>
    </div>
    <h2 class="interface-title-style">请求信息:</h2>
    <div class="interface-info-body">
      <h3>Hearders:</h3>
      <el-input type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="interfaceInfo.header">
      </el-input>
      <h3>Body:</h3>
      <el-table :data="interfaceInfo.params"
                class="interface-info-body-table"
                size="mini"
                border>
        <el-table-column prop="param_name"
                         label="参数名称">
        </el-table-column>
        <el-table-column prop="is_necessary"
                         label="是否必填">
        </el-table-column>
        <el-table-column prop="param_desc"
                         label="描述">
        </el-table-column>
        <el-table-column prop="default"
                         label="备注">
        </el-table-column>
      </el-table>
    </div>
    <h2 class="interface-title-style">返回数据:</h2>
    <div class="interface-info-response">
      <aside>注：数据必须符合Json格式，预览下修改数据无效。</aside>
      <json-editor ref="jsonEditor"
                   :key="activeName"
                   :read-only="editBasicInforma"
                   v-model="response" />
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
      editBasicInforma: true,
      response: {},
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
      }]
    }
  },
  created () {
    // this.response = JSON.parse(this.interfaceInfo.response)
  },
  watch: {
    interfaceInfo (value, oldValue) {
      if (value.interface_id) {
        this.response = JSON.parse(this.interfaceInfo.response)
      }
    }
  },
  methods: {
  }

}
</script>
<style lang="less" scoped>
.interface-info-body {
  width: 75%;
  margin-left: 70px;
  .interface-info-body-table {
    border-radius: 5px;
  }
}
.interface-info-response {
  width: 75%;
  margin-left: 70px;
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
