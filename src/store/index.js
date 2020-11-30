import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    interface_id: ''

  },
  mutations: {
    setInterfaceId(state, id) {
      Vue.set(state, 'interface_id', id)
    },
    deleteInterfaceId(state, id) {
      Vue.delete(state, 'interface_id')
    }
  },
  actions: {},
  getters: {}
})

export default store
