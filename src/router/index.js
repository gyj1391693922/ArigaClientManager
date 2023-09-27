import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  // ===== 主页 =====
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children:[//子路由
        //主页
      {
        path: 'home',
        name: 'Home',
        component: ()=>import('@/views/home/HomeView.vue')
      },
      {
        path: 'videoList',
        name: 'VideoList',
        component: ()=>import('@/views/videos/videoList.vue')
      },
      {
        path: 'akasList',
        name: 'AkasList',
        component: ()=>import('@/views/videos/akas/akasList.vue')
      },
      {
        path: 'akasEdit',
        name: 'AkasEdit',
        component: ()=>import('@/views/videos/akas/akasEdit.vue')
      },
      {
        path: 'basicsEdit',
        name: 'BasicsEdit',
        component: ()=>import('@/views/videos/basics/basicsEdit.vue')
      },
      {
        path: 'movList',
        name: 'MovList',
        component: ()=>import('@/views/videos/mov/movList.vue')
      },
      {
        path: 'movEdit',
        name: 'MovEdit',
        component: ()=>import('@/views/videos/mov/movEdit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
