import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    component: TownsView
  },
  {
    path: '/persos',
    name: 'persos',

    component: () => import('../views/PersosView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
