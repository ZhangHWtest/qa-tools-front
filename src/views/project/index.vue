<template>
  <el-card class="interface-info-card">
    <el-tabs class="interface-info-tabs"
             v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :key="item.name"
                   v-for="item in editableTabs"
                   :label="item.title"
                   :name="item.name">
        <project-list :key="activeName +'project'"
                      :activeName="activeName"
                      @listenChildGoModel="changeActiveName" />
        <!-- <model-list :key="activeName +'model'"
                    :activeName="activeName"
                    :projectId="project_id" /> -->
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import ProjectList from './components/ProjectList'
import ModelList from './components/ModelList'
export default {
  components: {
    ProjectList,
    ModelList
  },
  data () {
    return {
      activeName: 'Tab 1',
      editableTabs: [{
        title: '项目',
        name: 'Tab 1'
      }, {
        title: '模块',
        name: 'Tab 2'
      }],
      project_id: ''
    }
  },
  created () {
  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.name
    },
    changeActiveName (projectId) {
      this.activeName = 'Tab 2'
      this.project_id = projectId
    }
  }

}
</script>
<style lang="less" scoped>
</style>
