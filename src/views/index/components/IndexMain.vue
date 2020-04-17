<template>
  <el-col class="index-main">
    <el-tabs v-model="activeName">
      <el-tab-pane label="接口列表"
                   name="first">
        <el-col class="index-main-inteface-table">
          <el-table :data="interfaceList">
            <el-table-column width="70px"
                             label="id"
                             prop="interface_id"></el-table-column>
            <el-table-column label="接口名称"
                             prop="interface_name"></el-table-column>
            <el-table-column label="接口类型"
                             prop="interface_type"></el-table-column>
            <el-table-column label="方法"
                             prop="method"></el-table-column>
            <el-table-column label="路径"
                             prop="path"></el-table-column>
            <el-table-column label="创建人"
                             prop="create_user"></el-table-column>
            <el-table-column label="操作"
                             width="120px">
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
                <!-- 删除按钮 -->
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
                         :current-page="page_num"
                         @current-change="handleCurrentChange"
                         layout="prev, pager, next"
                         :total="1000">
          </el-pagination>
        </el-col>

      </el-tab-pane>

    </el-tabs>
  </el-col>
</template>

<script>
export default {
  props: [
    'interfaceList'
  ],
  data () {
    return {
      activeName: 'first',
      page_num: 1
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.$emit('listenChildPageNum', newPage)
    }
  }
}
</script>

<style lang="less" scoped>
.index-main {
  background-color: #fff;
  .index-main-inteface-table {
    background-color: #eceef1;
    margin-bottom: 15px;
  }
}
</style>
