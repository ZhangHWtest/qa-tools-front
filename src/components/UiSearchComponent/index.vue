<template>
  <div class="top-select">
    <span class="top-select-name">系统：</span>
    <el-select class="top-system-select"
               v-model="systemValue"
               placeholder="请选择"
               @change="changeSessionValue">
      <el-option v-for="item in systemList"
                 :key="item.id"
                 :label="item.sys_name"
                 :value="item.id">
      </el-option>
    </el-select>
    <span class="top-select-name">所属端：</span>
    <el-select class="top-system-select"
               v-model="platformValue"
               placeholder="请选择"
               @change="changeSessionValue">
      <el-option v-for="item in platformList"
                 :key="item.id"
                 :label="item.platform"
                 :value="item.id">
      </el-option>
    </el-select>
    <span class="top-select-name">用例名称：</span>
    <el-input class="top-input-name"
              v-model="inputCaseName"
              @change="changeSessionValue"
              placeholder="请输入"></el-input>
    <el-button class="top-select-button"
               type="primary"
               plain
               @click="changeChildValue()">查询</el-button>
    <el-button plain
               @click="clearProjectAndModel()">重置</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      systemValue: '',
      systemList: [],
      platformValue: '',
      platformList: [
        { id: 1, platform: "web" },
        { id: 2, platform: "android" },
        { id: 3, platform: "ios" }
      ],
      getSystemListbody: {},
      // getPlatformListbody: {}
      inputCaseName: '',
      // sessionValue: {
      //   systemID: '',
      //   systemName: '',
      //   platformId: '',
      //   platformName: '',
      //   inputCaseName: ''
      // }
    }
  },
  created () {
    this.getSystemListMethod()
    if (sessionStorage.getItem('uiSearchValue')) {
      let uiSearchValue = JSON.parse(sessionStorage.getItem('uiSearchValue'))
      console.log(uiSearchValue)
      this.systemValue = uiSearchValue.systemId
      console.log(this.systemValue)
      this.platformValue = uiSearchValue.platformId
      this.inputCaseName = uiSearchValue.inputCaseName

      // this.uiSearchValue.forEach(item => {
      //   console.log(item)
      // })
    }
    // this.getPlatformListMethod()
  },
  methods: {
    changeSessionValue () {
      let uiSearchValue = { "systemId": 1, "systemName": '', }
      sessionStorage.setItem('uiSearchValue', JSON.stringify(uiSearchValue))


    },
    async getSystemListMethod () {
      const { data: res } = await this.$api.system.getSystemList(
        this.getSystemListbody
      )
      if (res.code === 1) {
        this.systemList = res.data
      } else {
        return this.$message.error(res.msg)
      }
    },
    // 暂时写死
    // async getPlatformListMethod () {
    //   const { data: res } = await this.$api.system.getPlatformList(
    //   )
    //   if (res.code === 1) {
    //     this.platformList = res.data
    //   } else {
    //     return this.$message.error(res.mes)
    //   }
    // }
  }

}
</script>
<style lang="less"scoped>
.top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .top-input-name {
    width: 170px;
  }
  .top-select-name {
    margin-left: 10px;
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .top-select-button {
    margin-left: 10px;
  }
}
</style>
