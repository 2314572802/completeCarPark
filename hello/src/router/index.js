import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/log',
    name: 'log',
    component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/Wellcome.vue'),
    children: [
      {
        path: '/',
        name: 'parkInfo',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/InterfaceMain.vue'),
      },
      {
        path: '/parkInfo',
        name: 'parkInfo',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/InterfaceMain.vue'),
      },
      {
        path: '/admInfo',
        name: 'admInfo',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/AdmInfo.vue'),
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/FixUser.vue'),
      },
      {
        path: '/fixCarMsg',
        name: 'fixCarMsg',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/FixCarMsg.vue'),
      },
      {
        path: '/freeCarMsg',
        name: 'freeCarMsg',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/FreeCarMsg.vue'),
      },
      {
        path: '/freePayMsg',
        name: 'freePayMsg',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/FreePayMsg.vue'),
      },
      {
        path: '/fixPayMsg',
        name: 'fixPayMsg',
        component: () => import(/* webpackChunkName: "about" */ '../components/indexmain/FixPayMsg.vue'),
      },
    ]
  },
  {
    path: '/parkInfo',
    name: 'parkInfo',
    compontent: () => import('../components/indexmain/InterfaceMain.vue'),
  },

]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)
export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
