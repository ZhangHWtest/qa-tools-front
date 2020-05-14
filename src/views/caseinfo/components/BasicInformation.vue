<template>
  <div>
    <h2 class="interface-title-style">接口基本信息:</h2>
    <!-- 预览区域-->
    <div>
      <el-row :gutter="20"
              class="show-interface">
        <el-col :span="10">
          <span class="show-interface-colkey">接口名称：</span>
          <span class="show-interface-colname">{{interfaceInfo.interface_name}}</span>
        </el-col>
        <el-col :span="10">
          <span class="show-interface-colkey">请求类型：</span>
          <span class="show-interface-colname">{{interfaceInfo.interface_type}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="show-interface">
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
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo'
  ],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }

}
</script>
<style lang="less" scoped>
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
