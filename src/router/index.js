import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/demo/Index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/index', component: Index },
  {
    path: '/home',
    component: Home,
    redirect: '/project/list',
    children: [
      // { path: '/index', component: Index },
      {
        path: '/user/list',
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: '/project/list',
        component: () => import('@/views/project/ProjectList.vue'
        )
      },
      {
        path: '/project/info',
        component: () => import('@/views/project/components/AddProject.vue'
        )
      },
      {
        path: '/interface/list',
        component: () => import('@/views/interface/index.vue'
        )
      },
      {
        path: '/interface/info',
        component: () => import('@/views/interface/components/AddInterface.vue'
        )
      },
      {
        path: '/environment/list',
        component: () => import('@/views/environment/index.vue'
        )
      },
      {
        path: '/case/list',
        component: () => import('@/views/testcase/index.vue'
        )
      },
      {
        path: '/demo/demo1',
        component: () => import('@/views/demo/model.vue'
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
