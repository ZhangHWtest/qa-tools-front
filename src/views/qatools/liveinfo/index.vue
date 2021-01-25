<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>QA工具</el-breadcrumb-item>
      <el-breadcrumb-item>直播信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="top-select">
        <span class="top-select-name">直播教室ID：</span>
        <el-input
          v-model="getLivemsgBody.live_id"
          class="top-input_name"
          placeholder="请输入live_id"
        />
        <el-button
          class="top-select-button"
          type="primary"
          plain
          @click="getMsgAndshowInfo()"
        >
          查询
        </el-button>
        <el-button
          plain
          @click="chearInput()"
        >
          重置
        </el-button>
      </div>
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：点击查询后显示详情！</span>
      </div>
      <div v-show="isShowLivemsg">
        <h2 class="interface-title-style">
          基础信息：
        </h2>
        <!-- 预览区域-->
        <div>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">课程名称：</span>
              <span class="show-interface-colname">{{ livemsg.course_name }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">课程类型：</span>
              <span class="show-interface-colname">{{ livemsg.course_type }}</span>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">直播名称：</span>
              <span class="show-interface-colname">{{ livemsg.content_title }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">直播状态：</span>
              <template>
                <span
                  v-if="livemsg.status === '未开始'"
                  class="show-interface-colname"
                >
                  <el-tag size="mini">{{ livemsg.status }}</el-tag>
                </span>
                <span
                  v-else-if="livemsg.status === '直播中'"
                  class="show-interface-colname"
                >
                  <el-tag
                    type="success"
                    size="mini"
                  >{{ livemsg.status }}</el-tag>
                </span>
                <span
                  v-else
                  class="show-interface-colname"
                >
                  <el-tag
                    type="warning"
                    size="mini"
                  >{{ livemsg.status }}</el-tag>
                </span>
              </template>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">计划开始时间：</span>
              <span class="show-interface-colname">{{ livemsg.start_time }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">计划结束时间：</span>
              <span class="show-interface-colname">{{ livemsg.end_time }}</span>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">实际开始时间：</span>
              <span class="show-interface-colname">{{ livemsg.real_start_time }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">实际结束时间：</span>
              <span class="show-interface-colname">{{ livemsg.real_end_time }}</span>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">直播类型：</span>
              <span class="show-interface-colname">{{ livemsg.live_vendor }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">教室类型：</span>
              <span class="show-interface-colname">{{ livemsg.disabled }}</span>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="show-interface"
          >
            <el-col :span="10">
              <span class="show-interface-colkey">教室ID：</span>
              <span class="show-interface-colname">{{ livemsg.live_id }}</span>
            </el-col>
            <el-col :span="10">
              <span class="show-interface-colkey">callback_key：</span>
              <span class="show-interface-colname">{{ livemsg.callback_key }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-show="isShowLivemsg">
        <h2 class="interface-title-style">
          讲师信息：
        </h2>
        <div class="interface-info-body">
          <el-table
            :data="livemsg.teacher_info"
            class="interface-info-body-table"
            size="mini"
            border
          >
            <el-table-column
              prop="uid"
              label="ID"
            />
            <el-table-column
              prop="realname"
              label="真实姓名"
            />
            <el-table-column
              prop="nickname"
              label="昵称"
            />
            <el-table-column
              prop="mobile"
              label="电话"
            />
            <el-table-column
              prop="role"
              label="角色"
            />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data() {
    return {
      isShowLivemsg: false,
      getLivemsgBody: {
        live_id: ''
      },
      livemsg: ''
    }
  },
  // watch: {
  //   $router(to, from) {
  //     this.chearInput()
  //   }
  // },
  created() {
    if (this.$route.query.liveId) {
      this.getLivemsgBody.live_id = this.$route.query.liveId
      this.getLivemsgMethod()
    }
  },
  methods: {
    getMsgAndshowInfo() {
      this.getLivemsgMethod()
    },
    chearInput() {
      this.getLivemsgBody.live_id = ''
      this.isShowLivemsg = false
      this.reload()
    },
    async getLivemsgMethod() {
      const { data: res } = await this.$api.live.getLiveMsg(
        this.getLivemsgBody
      )
      if (res.code === 1) {
        this.livemsg = res.data
        this.isShowLivemsg = true
      } else {
        return this.$message.error(res.msg)
      }
    }
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
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .top-input_name {
    width: 270px;
  }
  .top-select-button {
    margin-left: 10px;
  }
}
.interface-top-addbutton {
  background-color: #eee;
  height: 25px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 25px;
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
  font-size: 16px;
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
