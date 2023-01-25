<template>
  <v-container>
    <v-card v-if="chosenPerso != null" width="150" height="150">
      <v-card-title>
        <v-avatar color="primary" size="60">
          <v-img src="../datasource/profile_image.jpg"></v-img>
        </v-avatar>
        {{ chosenPerso.nom }}:
      </v-card-title>
      <v-card-text>
        {{ chosenPerso.or}}
        <v-icon>
          mdi-circle-multiple
        </v-icon>
      </v-card-text>
    </v-card>
    <br>
    <v-divider></v-divider>
    <br>
    <v-row>
      <v-col cols="4">
        <div class="box" v-if="chosenTown == null">
          <v-card class="card" v-for="(ville, id) in villesFiltre" :key="id" elevation="8" width="300px">
            <v-card-title>
              <v-row>
                <v-col cols="4">
                  <v-avatar color="primary" size="60">
                    <v-img src="../datasource/town_image.jpg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  {{ ville.nom }}
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="selecteTown(id)">
                selectionner
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <v-card v-else :key="chosenTown['id']" elevation="8" shaped width="300px">
          <v-card-title>
            <v-row>
              <v-col cols="4">
                <v-avatar color="primary" size="90">
                  <v-img src="../datasource/town_image.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <strong>
                  {{ chosenTown.nom }}
                </strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container v-if="chosenStreet == null">
              <v-row class="justify-center">
                <strong>Rues:</strong>
              </v-row>
              <v-row v-for="(rue, _id) in chosenTown.rues" :key="_id" class="justify-center">
                <v-btn @click="selectStreet(_id)" width="200px">
                  {{ rue['nom'] }}
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row>
                <v-col>
                  <v-row class="justify-center">
                    <strong>Rue:</strong>
                  </v-row>
                  <v-row class="justify-center">
                    <v-chip @click="selectStreet(null)">
                      {{ chosenStreet['nom'] }}
                      <v-icon small>
                        mdi-close
                      </v-icon>
                    </v-chip>
                  </v-row>
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
                </v-col>
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
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" x-small @click="selecteTown(null)" >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <selected-shop></selected-shop>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
import SelectedShop from "@/components/SelectedShop";
export default {
  name: 'TownsView',
  components: {
    SelectedShop
  },
  data: () => ({
    filter: '',
    filterActive: false,
  }),
  computed: {
    ...mapState(['villes', 'chosenShop', 'chosenStreet', 'chosenTown', 'chosenPerso']),
    villesFiltre() {
      return this.villes
    }
  },
  methods: {
    selecteTown(id){
      let town = this.villesFiltre[id]
      this.$store.commit('choseTown', town)
      this.$store.commit('choseStreet', null)
      this.$store.commit('choseShop', null)
    },
    selectStreet(id){
      let street = this.chosenTown.rues[id]
      this.$store.commit('choseStreet', street)
      this.$store.commit('choseShop', null)
    },
    selectShop(id){
      let shop = this.chosenStreet.boutiques[id]
      this.$store.commit('choseShop', shop)
    },
    clear(){
      this.selectedTown = null
      this.selectedStreet = null
      this.selectedShop = null
    },
    clearStreet(){
      this.selectedStreet = null
      this.selectedShop = null
    },
    clearShop(){
      this.selectedShop = null
    },


  }
}
</script>

<style>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: baseline;
}

.card {
  margin: 10px;
}
</style>
