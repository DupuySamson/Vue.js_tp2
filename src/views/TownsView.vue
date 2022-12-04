<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <h1>Les villes</h1>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-select v-if="selectedTown == null" :items="villesFiltre" item-text="nom" item-value="_id" return-object v-model="selectedTown" label="Trouver une ville">
              </v-select>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br>
    <v-row>
      <v-col cols="4">
        <div class="box" v-if="selectedTown == null">
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
          </v-card>
        </div>
        <v-card v-if="selectedTown != null" :key="selectedTown['id']" elevation="8" shaped width="300px">
          <v-card-title>
            <v-row>
              <v-col cols="4">
                <v-avatar color="primary" size="90">
                  <v-img src="../datasource/town_image.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <strong>
                  {{ selectedTown.nom }}
                </strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container v-if="selectedStreet == null">
              <v-row class="justify-center">
                <strong>Rues:</strong>
              </v-row>
              <v-row v-for="(rue, _id) in selectedTown.rues" :key="_id" class="justify-center">
                <v-btn @click="selectStreet(_id)" width="200px">
                  {{ rue['nom'] }}
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row>
                <v-col>
                  <v-row>
                    <strong>Rue:</strong>
                  </v-row>
                  <v-row>
                    <v-chip @click="clearStreet">
                      {{ selectedStreet['nom'] }}
                      <v-icon small>
                        mdi-close
                      </v-icon>
                    </v-chip>
                  </v-row>
                  <v-row v-if="selectedShop != null">
                    <strong>Boutique:</strong>
                  </v-row>
                  <v-row v-if="selectedShop != null">
                    <v-chip @click="clearShop">
                      {{ selectedShop['nom'] }}
                      <v-icon small>
                        mdi-close
                      </v-icon>
                    </v-chip>
                  </v-row>
                </v-col>
                <v-col v-if="selectedShop == null">
                  <v-row>
                    <strong>Boutiques:</strong>
                  </v-row >
                  <v-row v-for="(boutique, id) in selectedStreet.boutiques" :key="id">
                    <v-btn width="200px" @click="selectShop(id)">
                      {{ boutique['nom']}}
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" x-small @click="clear">
              Clear
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <selected-shop :shop="selectedShop"></selected-shop>

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
    selectedTown: null,
    selectedStreet: null,
    selectedShop: null,
    filter: '',
    filterActive: false,
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      return this.villes
    }
  },
  methods: {
    selectStreet(id){
      this.selectedStreet= this.selectedTown.rues[id]
    },
    selectShop(id){
      this.selectedShop = this.selectedStreet.boutiques[id]
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
