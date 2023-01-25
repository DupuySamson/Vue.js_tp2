import Vue from 'vue'
import VueRouter from 'vue-router'
import PersosView from "@/views/PersosView.vue";
import TownsView from "@/views/TownsView.vue";
import StreetsView from "@/components/StreetsView.vue";
import ShopsView from "@/components/ShopsView.vue"
import slotEdit from "@/components/slotEdit.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    components: {
      central : TownsView
    },
    children: [
      {
         path: ':idtown',
         name: 'idtown',
         components:{
            ville : StreetsView,
         },
         children: [
          {
             path: '/towns/:idtown/street/:idstreet',
             name: 'idstreet',
             components:{
                rue : ShopsView,
             },
             props: {
              rue: route => {
                return {idStreet: route.params.idstreet}
              }
            }
          }
         ],
         props: {
          ville: route => {
            return {idTown: route.params.idtown}
          }
        }
      }
     ]
    },
    {
        path: '/persos',
        name: 'persos',
        components: {
            central : PersosView
        },
        children : [
            {
                path: 'slot/:name',
                name: 'slotEdit',
                components:{
                    slot : slotEdit,
                },
                props: {
                    slot: route => {
                        return {name: route.params.name}
                    }
                }
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
