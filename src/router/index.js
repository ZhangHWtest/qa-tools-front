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
    redirect: '/interface',
    children: [
      {
        path: '/casechart',
        component: () => import('@/views/casechart/index.vue')
      },
      {
        path: '/interface',
        component: () => import('@/views/interface/index.vue')
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
  // {
  //   path: '/home',
  //   component: Home,
  //   redirect: '/case/chart',
  //   children: [
  //     {
  //       path: '/project/list',
  //       component: () => import('@/views/project/ProjectList.vue'
  //       )
  //     },
  //     {
  //       path: '/project/info',
  //       component: () => import('@/views/project/components/AddProject.vue'
  //       )
  //     },
  //     {
  //       path: '/interface/list',
  //       component: () => import('@/views/interface/index.vue'
  //       )
  //     },
  //     {
  //       path: '/case/list',
  //       component: () => import('@/views/testcase/caselist/index.vue'
  //       )
  //     },
  //     {
  //       path: '/case/info',
  //       component: () => import('@/views/testcase/caseinfo/index.vue'
  //       )
  //     },
  //     {
  //       path: '/case/chart',
  //       component: () => import('@/views/testcase/casechart/index.vue'
  //       )
  //     }
  //   ]
  // },
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
