<template>
  <div class="main-div-style">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>UI管理</el-breadcrumb-item>
      <el-breadcrumb-item>环境列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="interface-info-card">
      <div class="interface-top-addbutton">
        <el-button class="add-button" type="primary" @click="goAddenv()">
          新增 环境
        </el-button>
      </div>
      <el-table ref="multipleTableAll" :data="envList" style="width: 100%">
        <el-table-column width="70px" label="id" prop="id" />
        <el-table-column label="环境名称" prop="env_name" />
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                ricon="el-icon-edit"
                circle
                @click="showeditEnvDialog(scope.row)"
              />
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                ricon="el-icon-edit"
                circle
                @click="removeEnvById(scope.row.id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="getEnvListBody.page_num"
        layout="prev, pager, next"
        :total="envListTotal"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      getEnvListBody: {
        page_num: 1
      },
      envList: [],
      envListTotal: 1
    }
  },
  created() {
  },
  methods: {
    goAddenv() {
      this.$router.push({ path: '/uienv/add' }).catch(err => {
        console.log('输出', err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-button {
    font-size: 13px;
    float: right;
  }
}
.project-list-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  .project-list-col-tittle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    border-radius: 4px;
    .project-list-col-tittle-name {
      margin-left: 10px;
      font-size: 15px;
      color: rgba(39, 56, 72, 0.85);
    }
    .project-list-col-tittle-button {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
.project-list-col-two {
  height: 650px;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.main-div-style {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
