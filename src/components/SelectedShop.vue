<template>
    <v-card v-if="this.chosenShop" elevation="10">
      <v-card-title>
        {{ this.chosenShop['nom'] }}
        <v-icon>
          mdi-store
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <ListAndCheck  @checkedChange="itemCheck"
                           @itemButtonChange="buyItem"
                           @listButtonChange="listButton"
                           :title="'Stock'"
                           :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}"
                           :items="this.chosenShop.itemStock"
                           :fields="['nom', 'prix']"
                           :item-checked="true"
                           :checked="getCheckedList(this.chosenShop.itemStock)"
                           :item-button="{show: true, text: 'achat'}"
                           :list-button="{show: true, text:'Acheter selectionnés'}">
            </ListAndCheck>
          </v-col>
          <v-col cols="6">
            <ListAndCheck @itemButtonChange="commandeItem"
                          :title="'Commande'"
                          :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}"
                          :items="this.chosenShop.itemCommande"
                          :fields="['nom', 'prix']"
                          :item-checked="false"
                          :item-button="{show: true, text: 'commande'}"
                          :list-button="{show: false}">
            </ListAndCheck>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script>
import ListAndCheck from "@/components/ListAndCheck";
import {mapGetters, mapState} from "vuex";
export default {
  name: "SelectedShop",
  props: {
    shop: Object
  },
  components: {
    ListAndCheck
  },
  computed: {
  ...mapState(['chosenPerso', 'chosenShop']),
  ...mapGetters(['getOr'])
  },
  methods: {
    getCheckedList(items){
      let checkedLst = [items.length]
      checkedLst.fill(false)
      return checkedLst
    },
    buyItem(indexItem) {
      let item = this.chosenShop.itemStock[indexItem]
      if(!this.chosenPerso){
        console.log("pas de perso séléctionné")
        return;
      }
      if(this.getOr < item['prix']) {
        console.log("pas assez d'or")
        return;
      }
      this.$store.commit('buyItem', item)
      this.$store.commit('removeItem', indexItem)
    },
    commandeItem(id){
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

<style scoped>

</style>