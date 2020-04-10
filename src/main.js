import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/styles/index.css'
import '@/assets/icon/iconfont.css'
import api from './api'
import moment from 'moment'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.use(api)
Vue.prototype.$video = Video
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
