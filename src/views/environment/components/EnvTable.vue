<template>
  <div>
    <!-- 模块列表区域-->
    <el-table class="model_table"
              border
              :data="interfaceList">
      <el-table-column width="70px"
                       label="id"
                       prop="interface_id"></el-table-column>
      <el-table-column label="项目名称"
                       prop="project_name"></el-table-column>
      <el-table-column label="模块名称"
                       prop="model_name"></el-table-column>
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
                   :current-page="InterfaceBody.page_num"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="1000">
    </el-pagination>
  </div>
</template>
<script>
export default {

}
</script>

<style scoped>
</style>
