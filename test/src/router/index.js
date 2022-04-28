import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/HelloWrold.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

