<template>
  <el-row :gutter="40"
          class="panel-group">
    <el-col :xs="8"
            :sm="6"
            :lg="3"
            class="card-panel-col">
      <div class="card-panel"
           @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper workfile_line">
          <i class="iconfont icon-icon_workfile_line"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 45px;
}
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 120px;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .workfile_line {
        background: #40c9c6;
      }
    }

    .workfile_line {
      color: #40c9c6;
      font-size: 35px !important;
    }

    .card-panel-icon-wrapper {
      height: 45px;
      width: 45px;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      padding: 16px;
      border-radius: 50%;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      position: absolute;
      margin: 90px 0 0 30px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
}
</style>
