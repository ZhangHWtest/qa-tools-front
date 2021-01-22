<template>
  <div class="dashboard-editor-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>QA工具</el-breadcrumb-item>
      <el-breadcrumb-item>项目统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="report-top-seach">
        <div>
          <span class="report-select-name">产品：</span>
          <el-cascader
            v-model="productAmodule"
            class="report-cascader"
            :options="productList"
            :props="defaultParams"
            clearable
            @change="cascaderHandleChange"
          />
        </div>
        <div>
          <span class="report-select-name">开始时间区间：</span>
          <el-date-picker
            v-model="dayTime"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="datePickerHandleChange"
          />
        </div>
        <div>
          <el-button
            class="top-select-button"
            type="primary"
            plain
            :disabled="buttonStatus"
            @click="getReportListMethod()"
          >查询</el-button>
          <!-- <el-button plain @click="clearAllValue()">重置</el-button> -->
        </div>
      </div>
      <div class="report-top-addbutton">
        <span class="report-top-addannotation">注：选择产品或时间后才可查询！</span>
        <el-button class="add-report-button" type="primary" @click="openAddReportDialog()">
          新增 项目
        </el-button>
      </div>
      <el-table
        v-loading="updateLoading"
        element-loading-text="数据量有点大，请稍等~"
        class="report-table"
        :data="reportList"
        stripe
      >
        <el-table-column width="70px" label="id" prop="id" />
        <el-table-column label="项目ID" prop="product_id" />
        <el-table-column label="项目名称" prop="product_name" />
        <el-table-column label="模块ID" prop="module_id" />
        <el-table-column label="模块名称" prop="module_name" />
        <el-table-column label="统计起止时间" width="200px">
          <template slot-scope="scope">
            {{ scope.row.start_day }} ~ {{ scope.row.end_day }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="更新"
              placement="top"
            >
              <el-button
                type="success"
                icon="el-icon-refresh-right"
                size="mini"
                circle
                @click="updateReportMethod(scope.row.product_id,scope.row.module_id)"
              />
            </el-tooltip> -->
            <el-tooltip
              class="item"
              effect="dark"
              content="报表"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-tickets"
                size="mini"
                circle
                @click="goReportInfo(scope.row.product_id,scope.row.module_id,scope.row.start_day,scope.row.end_day)"
              />
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="getReportListBody.page_num"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, prev, pager, next, sizes"
        :total="report_total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      title="新增产品统计"
      :visible.sync="addReportDialog"
      width="40%"
      :close-on-click-modal="false"
      @close="addReportDialogClose"
    >
      <el-form
        ref="addReportFormRef"
        :model="addReportBody"
        :rules="addReportForm"
        label-width="85px"
      >
        <el-form-item label="产品ID：" prop="product_id">
          <el-input v-model="addReportBody.product_id" />
        </el-form-item>
        <el-form-item label="产品名：" prop="product_name">
          <el-input v-model="addReportBody.product_name" />
        </el-form-item>
        <el-form-item label="模块ID：" prop="module_id">
          <el-input v-model="addReportBody.module_id" />
        </el-form-item>
        <el-form-item label="模块名：" prop="module_name">
          <el-input v-model="addReportBody.module_name" />
        </el-form-item>
        <el-form-item label="时间区间：">
          <el-date-picker
            v-model="createDayTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            unlink-panels
            @change="addReportDayChange"
          />
        </el-form-item>
        <span class="add_report-addannotation">注：开始时间默认：2020-06-01/结束时间默认：当天</span>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addReportDialog = false">取 消</el-button>
        <el-button type="primary" @click="addReportMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productAmodule: [],
      productList: [],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'module_list'
      },
      dayTime: [],
      buttonStatus: true,
      getReportListBody: {
        product_id: '',
        module_id: '',
        start_day: '',
        end_day: '',
        page_num: 1,
        page_size: 10
      },
      reportList: [],
      report_total: 0,
      addReportDialog: false,
      addReportBody: {
        product_id: '',
        module_id: '',
        product_name: '',
        module_name: '',
        start_day: '',
        end_day: ''
      },
      addReportForm: {
        product_id: [{ required: true, message: '请输入产品id', trigger: 'blur' }],
        module_id: [{ required: true, message: '请输入模块id', trigger: 'blur' }],
        product_name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        module_name: [{ required: true, message: '请输入模块名称', trigger: 'blur' }]
      },
      createDayTime: [],
      updateReportBody: {
        product_id: '',
        module_id: ''
      },
      updateLoading: false
    }
  },
  created() {
    this.getReportListMethod()
    this.getReportProductListMethod()
  },
  methods: {
    // 监听 页值改变的事件
    handleCurrentChange(newPage) {
      this.getReportListBody.page_num = newPage
      this.getReportListMethod()
    },
    // 监听 页码改变的事件
    handleSizeChange(newPageSize) {
      this.getReportListBody.page_size = newPageSize
      this.getReportListMethod()
    },
    // 监听 产品联级选择器改变的事件
    cascaderHandleChange(value) {
      this.buttonStatus = true
      this.getReportListBody.product_id = ''
      this.getReportListBody.module_id = ''
      if (value.length !== 0) {
        this.getReportListBody.product_id = value[0]
        this.getReportListBody.module_id = value[1]
        this.buttonStatus = false
      }
    },
    // 监听 时间改变的事件
    datePickerHandleChange(value) {
      this.buttonStatus = true
      this.getReportListBody.start_day = ''
      this.getReportListBody.end_day = ''
      console.log(value)
      if (value !== null) {
        this.buttonStatus = false
        this.getReportListBody.start_day = value[0]
        this.getReportListBody.end_day = value[1]
      }
    },
    // 监听 创建时时间
    addReportDayChange(value) {
      this.addReportBody.start_day = ''
      this.addReportBody.end_day = ''
      if (value !== null) {
        this.buttonStatus = false
        this.addReportBody.start_day = value[0]
        this.addReportBody.end_day = value[1]
      }
    },
    // 获取列表
    async getReportListMethod() {
      const { data: responseBody } = await this.$api.report.reportList(
        this.getReportListBody
      )
      if (responseBody.code === 1) {
        this.reportList = responseBody.data
        this.report_total = responseBody.total
      } else {
        return this.$message.error(responseBody.msg)
      }
    },
    openAddReportDialog() {
      this.addReportDialog = true
    },
    addReportDialogClose() {
      this.$refs.addReportFormRef.resetFields()
    },
    // 产品列表
    async getReportProductListMethod() {
      const { data: res } = await this.$api.report.reportProductList()
      if (res.code === 1) {
        this.productList = res.data
      } else {
        return this.$message.error(res.msg)
      }
    },
    // 新增
    addReportMethod() {
      this.$refs.addReportFormRef.validate(async valid => {
        if (!valid);
        const { data: res } = await this.$api.report.updatereport(this.addReportBody)
        if (res.code === 1) {
          this.addReportDialog = false
          this.getReportListMethod()
          return this.$message.success('新增成功！')
        } else {
          return this.$message.error(res.msg)
        }
      })
    },
    // 更新
    async updateReportMethod(productId, moduleId) {
      this.updateLoading = true
      this.updateReportBody.product_id = productId
      this.updateReportBody.module_id = moduleId
      const { data: responseBody } = await this.$api.report.updatereport(
        this.updateReportBody
      )
      if (responseBody.code === 1) {
        this.getReportListMethod()
        this.updateLoading = false
        // this.updateLoading = true
        return this.$message.success('更新成功！')
      } else {
        return this.$message.error(responseBody.msg)
      }
    },
    goReportInfo(productId, moduleId, startDay, endDay) {
      this.$router.push({ path: '/qatools/reportinfo', query: { productId: productId, moduleId: moduleId, st: startDay, et: endDay }}).catch(err => {
        console.log('输出', err)
      })
    }
  }

}
</script>
<style>
body{
   margin: 0;
}
</style>
<style  lang="less" scoped>
.report-top-seach{
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  display:flex;
  .report-select-name {
    margin-left: 10px;
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .report-cascader{
    width: 270px;
  }
  .top-select-button{
    margin-left: 10px;
  }
}
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.report-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  // display: flex;
  .report-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
    &:before{
    content: '* ';
    color: red;
    }
  }

  .add-report-button {
    margin-right: 10px;
    float: right;
  }
}
.add_report-addannotation{
  color: #909399;
  &:before{
    content: '* ';
    color: red;
    }
}

</style>
