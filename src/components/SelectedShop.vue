<template>
    <v-card v-if="this.chosenShop" elevation="10">
      <v-progress-linear
          :active="loading"
          indeterminate
          color="deep-purple accent-4"
      ></v-progress-linear>
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
                           :item-button="{show: true}"
                           :list-button="{show: true}">
              <template v-slot:btnitem>
                <v-btn color="blue">
                  Achat
                </v-btn>
              </template>
              <template v-slot:btnlist>
                <v-btn color="green">
                  Achat groupé
                </v-btn>
              </template>
              <template v-slot:item="item">
                <div>
                  {{ item.itemDetails.nom}}: {{ item.itemDetails.prix}}
                  <v-icon>
                    mdi-circle-multiple
                  </v-icon>
                </div>
              </template>
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
              <template v-slot:item="{itemDetails, index}">
                {{ itemDetails.nom }}: {{ duree[index]/1000 }} s
              </template>
              <template v-slot:btnitem>
                <v-btn>
                  Commander
                </v-btn>
              </template>
            </ListAndCheck>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>Commande</v-card-title>
          <v-card-text>Si vous commander cet item, cela prendra {{time/1000}} secondes pour arriver!</v-card-text>
          <v-card-actions>
            <v-btn @click="close">Annulez</v-btn>
            <v-btn @click="acceptCommande">Accepter</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
</template>

<script>
import ListAndCheck from "@/components/ListAndCheck";
import {mapGetters, mapState} from "vuex";
export default {
  name: "SelectedShop",
  data: () => ({
    loading: false,
    time: null,
    dialog: false,
    idItemCommande: null,
    duree: []
  }),
  props: {
    shop: Object
  },
  components: {
    ListAndCheck
  },
  computed: {
  ...mapState(['chosenPerso', 'chosenShop']),
  ...mapGetters(['getOr']),
    createDuree(){
      this.chosenShop.itemCommande.forEach(() =>{
        this.duree.push(Math.floor(Math.random() * (10000 - 2000 + 1) + 2000))
      })
      return this.duree
    }
  },
  methods: {
    getCheckedList(items){
      let checkedLst = new Array(items.length)
      console.log(checkedLst.length)
      checkedLst.fill(false)
      return checkedLst
    },
    buyItem(indexItem) {
      let item = this.chosenShop.itemStock[indexItem]
      if(!this.chosenPerso){
        console.log("pas de perso sélectionné")
        alert("Pas de perso sélectionné")
        return;
      }
      if(this.getOr < item['prix']) {
        console.log("pas assez d'or")
        alert("Pas assez d'or")
        return;
      }
      this.$store.commit('buyItem', item)
      this.$store.commit('removeItem', indexItem)
    },
    commandeItem(id){
      this.dialog = true
      this.itemCommandeId = id
      this.time = this.duree[id];
    },
    acceptCommande(){
      let item = this.$store.state.chosenShop.itemCommande[this.itemCommandeId];
      this.$store.dispatch("order", { time: this.time, item: item, id:this.itemCommandeId })
      this.close()
      this.duree.splice(this.itemCommandeId, 1)
      this.loading = true
      setTimeout(()=>{
        this.loading = false
      }, this.time)
    },
    close(){
      this.dialog = false
    },
    listButton(lst){
      let price = 0
      for(let i = lst.length; i>0; i--){
        if(lst[i])
          price += this.chosenShop.itemStock[i].prix
      }
      if(price <= this.getOr){
        for(let i = lst.length; i>0; i--){
          if(lst[i])
            this.buyItem(i)
        }
        lst.fill(false)
        return
      }
      console.log("pas assez d'argent")
    },
    itemCheck(id){
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>