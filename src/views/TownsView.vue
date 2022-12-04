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
              <v-select :items="villesFiltre" item-text="nom" item-value="_id" return-object v-model="selectedTown">
              </v-select>
              <v-btn color="error" x-small v-if="villesFiltre != null" @click="clear">
                Clear
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br>
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
    <v-card v-if="selectedTown != null" :key="selectedTown['id']" elevation="8" shaped width="1000px">
      <v-card-title>
        <v-row>
          <v-col cols="4">
            <v-avatar color="primary" size="90">
              <v-img src="../datasource/town_image.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="8">
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
            <v-col cols="2">
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
                <strong>Boutique</strong>
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
            <v-col cols="7" v-if="selectedShop == null">
              <v-row>
                <strong>Boutiques:</strong>
              </v-row >
              <v-row v-for="(boutique, id) in selectedStreet.boutiques" :key="id">
                <v-btn width="200px" @click="selectShop(id)">
                  {{ boutique['nom']}}
                </v-btn>
              </v-row>
            </v-col>
            <v-col cols="5" v-if="selectedShop != null">
              <ListAndCheck  @checkedChange="itemCheck" @itemButtonChange="itemButton" @listButtonChange="listButton" :title="'Stock'" :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}" :items="this.selectedShop.itemStock" :fields="['nom', 'prix']" :item-checked="true" :checked="getCheckedList(this.selectedShop.itemStock)" :item-button="{show: true, text: 'achat'}" :list-button="{show: true, text:'Acheter selectionnés'}"></ListAndCheck>
            </v-col>
            <v-col cols="5" v-if="selectedShop != null">
              <ListAndCheck :title="'Commande'" :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}" :items="this.selectedShop.itemCommande" :fields="['nom', 'prix']" :item-checked="false" :checked="getCheckedList(this.selectedShop.itemCommande)" :item-button="{show: true, text: 'commande'}" :list-button="{show: false, text:''}"></ListAndCheck>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
import ListAndCheck from "@/components/ListAndCheck";
export default {
  name: 'TownsView',
  components: {
    ListAndCheck
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
    getCheckedList(items){
      let checkedLst = [items.length]
      checkedLst.fill(false)
      return checkedLst
    },
    itemButton(id) {
      console.log(id)
    },
    listButton(nom){
      console.log(nom)
    },
    itemCheck(id){
      console.log(id)
    }
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
