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
              <label for="filteractive">filtrage possible : </label>
              <input type="checkbox" v-model="filterActive" id="filteractive">
            </v-row>
            <v-row>
              <v-col v-if="filterActive">
                <label>filtre: </label><input v-model="filter" id="filtertown">
                <v-btn color="error" x-small v-if="filter.length>0" @click="clear">
                  X
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br>
    <v-card v-for="(ville, id) in villesFiltre" :key="id" elevation="8" shaped max-width="600" max-witdh="800">
      <v-card-title>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="2">
                <v-avatar v-if="villesFiltre.length==1" color="primary" size="90">
                  <v-img src="../datasource/town_image.jpg"></v-img>
                </v-avatar> 
                <v-avatar v-if="villesFiltre.length>1" color="primary" size="60">
                  <v-img src="../datasource/town_image.jpg"></v-img>
                </v-avatar> 
              </v-col>
              <v-col cols="3">
              {{ ville.nom }}
              </v-col>
              <v-col cols="5">

              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="(villesFiltre.length==1)">
        <v-row>
          <v-col cols="2">
          </v-col>
          <v-col cols="10">
            <strong>Rues:</strong>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col>
                <v-expansion-panels  v-model="panel" :disabled="disabled" multiple>
                  <v-expansion-panel v-for="(rue, id) in ville.rues" :key="id">
                    <v-expansion-panel-header>
                      <v-col>
                        <strong>{{ rue.nom }}</strong>: {{ rue.boutiques.length }} boutiques
                      </v-col>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row v-for="(boutique, id) in rue.boutiques" :key="id">
                        <v-col>
                          - <strong>"{{ boutique.nom }}"</strong>, {{ boutique.itemStock.length }} objets en stock et {{ boutique.itemCommande.length }} objets en commandes
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <br>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  data: () => ({
    filter: '',
    filterActive: false
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      if(this.filterActive){
        return this.villes.filter(v => v.nom.includes(this.filter))
      }
      return this.villes
    }
  },
  methods: {
    clear(){
      this.filter = ''
    }
  }

}
</script>
