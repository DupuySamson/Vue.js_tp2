<template>
   <div class="box">
    <v-card v-if="chosenTown !== null" :key="chosenTown['id']" elevation="8" shaped width="300px">
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
                 <!-- Rue -->
                 
                </v-col>
                <v-col>
                <router-view name="rue"/>
              </v-col>
              </v-row>
              
            </v-container>

          </v-card-text>
        </v-card>
        </div>
  </template>
  
  <script>

  import {mapState} from 'vuex'
  export default {
    name: "StreetsView",
    props: {
      idTown: null
    },
    data (){
      return {
        listCheck: this.checked,
      }
    },
    methods: {
      selectStreet(id){
      let street = this.chosenTown.rues[id]
      this.$store.commit('choseStreet', street)
      this.$store.commit('choseShop', null)
      this.$router.push({name:'idstreet',params:{idstreet:id}})
    },
    clear(){
      this.selectedStreet = null
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