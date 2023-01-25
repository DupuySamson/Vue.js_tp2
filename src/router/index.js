import Vue from 'vue'
import VueRouter from 'vue-router'
import PersosView from "@/views/PersosView.vue";
import TownsView from "@/views/TownsView.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    components: {
      central : TownsView
    }
  },
  {
    path: '/persos',
    name: 'persos',
    components: {
     central : PersosView
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
