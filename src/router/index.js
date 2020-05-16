import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/casechart',
    children: [
      {
        path: '/casechart',
        component: () => import('@/views/casechart/index.vue')
      },
      {
        path: '/caselist',
        component: () => import('@/views/case/index.vue')
      },
      {
        path: '/caseinfo',
        component: () => import('@/views/caseinfo/index.vue')
      },
      {
        path: '/caselog',
        component: () => import('@/views/caselog/index.vue')
      },
      {
        path: '/interface',
        component: () => import('@/views/interface/index.vue')
      },
      {
        path: '/interface/info',
        component: () => import('@/views/interfaceinfo/index.vue')
      },
      {
        path: '/project',
        component: () => import('@/views/project/index.vue')
      },
      {
        path: '/user/list',
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: '/environment/list',
        component: () => import('@/views/environment/index.vue'
        )
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径， from 代表从哪个路径跳转来的， next是一个函数， 表示放行
  // next()  放行， next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
