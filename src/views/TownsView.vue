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
        <!-- Composant gauche -->
        


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
              <div v-if="villesFiltre.id == SelectedTown">
                <v-btn  @click="selecteTown(id, ville); SelectedTown = id" color="success">SELECTIONNER</v-btn>
              </div>
              <div v-else>
                <v-btn  @click="selecteTown(id, ville); SelectedTown = id">SELECTIONNER</v-btn>
              </div>              
            </v-card-actions>
          </v-card>  
        
      </v-col>
      <v-col>
        <router-view name="ville"/>
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
    SelectedShop,
  },
  data: () => ({
    filter: '',
    filterActive: false,
    SelectedTown: null,
  }),
  computed: {
    ...mapState(['villes', 'chosenShop', 'chosenStreet', 'chosenTown', 'chosenPerso']),
    villesFiltre() {
      return this.villes
    }
  },
  methods: {
    selecteTown(id, town){
      this.villesFiltre[id]
      this.$store.commit('choseTown', town)
      this.$store.commit('choseStreet', null)
      this.$store.commit('choseShop', null)
      this.$router.push({name:'idtown',params:{idtown:id}})
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
