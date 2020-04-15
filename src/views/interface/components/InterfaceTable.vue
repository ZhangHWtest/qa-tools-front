<template>
  <div class="interface-table-div">
    <!-- 模块列表区域-->
    <el-table class="model_table"
              border
              :data="interfaceList">
      <el-table-column width="70px"
                       label="id"
                       prop="interface_id"></el-table-column>
      <!-- <el-table-column label="项目名称"
                       prop="project_name"></el-table-column>
      <el-table-column label="模块名称"
                       prop="model_name"></el-table-column> -->
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
  </div>
</template>
<script>
export default {
  props: [
    'interfaceList'
  ],
  data () {
    return {
      removeinterface: {
        interface_id: ''
      },
      page_num: 1
    }
  },
  methods: {
    async removeInterfaceById (id) {
      this.removeinterface.interface_id = id
      const { data: responseBody } = await this.$api.myinterface.delInterfaceMethod(
        this.removeinterface
      )
      if (responseBody.code === 1) {
        this.$message.success('操作成功！')
        this.$emit('listenChildRemove')
      }
    },
    // 点击跳转至InterfaceInfo页面
    goInterfaceInfo (_id) {
      this.$router.push({ path: '/interface/info' })
      window.sessionStorage.setItem('interface_id', _id)
      // this.$store.commit('setInterfaceId', _id)
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.$emit('listenChildPageNum', newPage)
    }
  }
}
</script>
<style lang="less" scoped>
.interface-table-div {
  margin-top: 15px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  background-color: #eee;
}
.seachName {
  font-size: 14px;
  color: #606266;
}
</style>
