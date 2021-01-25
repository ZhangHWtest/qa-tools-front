<template>
  <div class="main-today-live-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>QA工具</el-breadcrumb-item>
      <el-breadcrumb-item>今日直播</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="todayLiveList"
        style="width: 100%"
      >
        <el-table-column
          label="编号"
          type="index"
          width="80"
        />
        <el-table-column
          prop="course_name"
          label="课程名称"
          width="180"
        />
        <el-table-column
          prop="content_title"
          label="直播名称"
          width="180"
        />
        <el-table-column
          prop="course_type"
          label="课程类型"
        />
        <el-table-column
          prop="push_type"
          label="直播类型"
        />
        <el-table-column
          prop="callback_key"
          label="live_id"
        />
        <el-table-column
          prop="start_time"
          label="开始时间"
        />
        <el-table-column
          prop="school_name"
          label="学院"
        />
        <el-table-column label="操作" width="60px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-tickets"
                size="mini"
                circle
                @click="goLiveInfo(scope.row.callback_key)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getTodayLiveListBody: {
        pageNum: 1,
        pageSize: 100
      },
      todayLiveList: []
    }
  },
  created() {
    this.getTodayLiveListMethod()
  },
  methods: {
    async getTodayLiveListMethod() {
      const { data: res } = await this.$api.live.getTodayLiveList(
        this.getTodayLiveListBody
      )
      if (res.code === 1) {
        this.todayLiveList = res.data
      } else {
        return this.$message.error(res.msg)
      }
    },
    goLiveInfo(live_id) {
      this.$router.push({ path: '/qatools/liveinfo', query: { liveId: live_id }}).catch(err => {
        console.log('输出', err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main-today-live-list {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

</style>
