<template>
   <div>
    <v-row v-if="chosenShop" class="justify-center">
      <strong>Boutique:</strong>
    </v-row>
    <v-row v-if="chosenShop" class="justify-center">
      <v-chip @click="selectShop(null)">
        {{ chosenShop['nom'] }}
        <v-icon small>
          mdi-close
        </v-icon>
      </v-chip>
    </v-row>
  <v-col v-if="chosenShop == null" >
    <v-row class="justify-center">
      <strong>Boutiques:</strong>
    </v-row >
    <v-row v-for="(boutique, id) in chosenStreet.boutiques" :key="id" class="justify-center">
      <v-btn width="200px" @click="selectShop(id)">
        {{ boutique['nom']}}
      </v-btn>
    </v-row>
  </v-col>
</div>
                
  </template>
  
  <script>

  import {mapState} from 'vuex'
  export default {
    name: "StreetsView",
    props: {
      idTown: null,
      idStreet: null
    },
    data (){
      return {
        listCheck: this.checked,
      }
    },
    methods: {
    selectShop(id){
      let shop = this.chosenStreet.boutiques[id]
      this.$store.commit('choseShop', shop)
    },
    clear(){
      this.selectedShop = null
    },
    clearShop(){
      this.selectedShop = null
    },
    },
    computed:
    {
      ...mapState(['villes', 'chosenShop', 'chosenStreet', 'chosenTown', 'chosenPerso']),
    }
  }
  </script>
  
  <style scoped>
  </style>