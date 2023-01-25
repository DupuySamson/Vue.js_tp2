import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'


export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    chosenPerso: null,
    //La rue et la ville sont dans le store pour plus de RolePlay
    chosenTown: null,
    chosenStreet: null,
    chosenShop: null
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateVilles(state, villes) {
      state.villes = villes
    },
    updatePersos(state, persos) {
      state.persos = persos
    },
    chosePerso(state, perso) {
      state.chosenPerso = perso
    },
    choseTown(state, town) {
      state.chosenTown = town
    },
    choseStreet(state, street) {
      state.chosenStreet = street
    },
    choseShop(state, shop) {
      state.chosenShop = shop
    },
    buyItem(state, item) {
      state.chosenPerso.itemsAchetes.push(item)
      state.chosenPerso.or -= item['prix']
    },
    removeItem(state, id) {
      state.chosenShop.itemStock.splice(id, 1)
    },
    addItem(state, item) {
      state.chosenShop.itemStock.push(item)
    },
    sellItem(state, item) {
      console.log(state, item)
    },
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async getAllTowns({commit}) {
      console.log('récupération des villes');
      let response = await TownService.getAllTowns()
      if (response.error === 0) {
        commit('updateVilles', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllCharacs({commit}) {
      console.log('récupération des persos');
      let response = await CharacService.getAllCharacs()
      if (response.error === 0) {
        commit('updatePersos', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async order(context, data){
      setTimeout(()=>{
        context.commit("addItem", data.item)
      },data.time)
    }
  },
  getters :{
    getOr(state){
      if(!state.chosenPerso){
        return 0;
      }
      return state.chosenPerso.or
    }
  }
})
