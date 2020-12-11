<template>
  <div>

    <el-row :gutter="20">
      <el-col class="chart-introduce" :span="8">
        <h2 style="color: #333743">数据统计分析</h2>
        <h3 style="color: #333743">多维度数据分析</h3>
        <p style="color: #9297A3">数据自由刷选自由选择数据</p>
        <p style="color: #9297A3">发掘数据背后的更多秘密</p>
        <p style="color: #9297A3">多图表联动查看对多个图表数据联动查看</p>
        <p style="color: #9297A3">进行多维有效分析</p>
      </el-col>
      <el-col class="chart-img" :span="6">
        <img class="chart-image" src="@/assets/images/login-01.png">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <img class="project-image" src="@/assets/images/login-02.png">
      </el-col>
      <el-col class="project-introduce" :span="8">
        <h2 style="color: #333743">管理平台</h2>
        <h3 style="color: #333743">项目管理</h3>
        <p style="color: #9297A3">提供基本的项目分组，项目管理</p>
        <p style="color: #9297A3">接口管理</p>
        <p style="color: #9297A3">让多人协作成倍提升开发效率</p>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style >
.case-introduce {
  margin-left: 200px;
}
.case-image {
  height: 530px;
  width: 970px;
}
.chart-introduce {
  margin-left: 200px;
  height: 330px;
  width: 320px;
}
.project-introduce {
  margin-left: 530px;
  height: 330px;
  width: 320px;
}
.chart-image {
  height: 350px;
  width: 600px;
}
.project-image {
  margin-left: 200px;
  height: 350px;
  width: 600px;
}
</style>
