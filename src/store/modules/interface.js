// 数据仓库
const state = {
  projectList: [{
    test: 111
  }]
}
// 操作state数据的方法的集合  commit，
const mutations = {
  SUBMIT_PROJECT: (state, arrProject) => {
    state.projectList.test = arrProject
    console.log(arrProject)
  },
  test (state, arrProject) {
    state.projectList.test = arrProject
  }

}
// 需要异步触发mutations去修改数据的时候，用actions
// dispath 触发action
// 直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行异步操作，最终提交mutation方法。
const actions = {
  submitProject ({ commit }, size) {
    commit('SUBMIT_PROJECT', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
