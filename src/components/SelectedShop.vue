<template>
    <v-card v-if="shop != null" elevation="10">
      <v-card-title>
        {{ shop['nom'] }}
        <v-icon>
          mdi-store
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <ListAndCheck  @checkedChange="itemCheck" @itemButtonChange="itemButton" @listButtonChange="listButton" :title="'Stock'" :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}" :items="this.shop.itemStock" :fields="['nom', 'prix']" :item-checked="true" :checked="getCheckedList(this.shop.itemStock)" :item-button="{show: true, text: 'achat'}" :list-button="{show: true, text:'Acheter selectionnés'}"></ListAndCheck>
          </v-col>
          <v-col cols="6">
            <ListAndCheck :title="'Commande'" :icons="{nom: 'mdi-treasure-chest', prix: 'mdi-circle-multiple'}" :items="this.shop.itemCommande" :fields="['nom', 'prix']" :item-checked="false" :checked="getCheckedList(this.shop.itemCommande)" :item-button="{show: true, text: 'commande'}" :list-button="{show: false, text:''}"></ListAndCheck>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script>
import ListAndCheck from "@/components/ListAndCheck";
export default {
  name: "SelectedShop",
  props: {
    shop: Object
  },
  components: {
    ListAndCheck
  },
  methods: {
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

<style scoped>

</style>