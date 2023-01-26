<template>
  <v-container>
    <v-row>
    <v-col>
      <v-card v-if="chosenPerso" elevation="8" shaped max-height="800" width="700">
        <v-card-title>
          <v-row>
            <v-col>
              <v-avatar color="primary" size="90">
                <v-img src="../datasource/profile_image.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <br>
              <v-row>
                <h1>{{ chosenPerso.nom }}</h1>
              </v-row>
              <v-row>
              <span>
                {{ chosenPerso.or }}
              <v-icon>
                mdi-circle-multiple
              </v-icon>
              </span>
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-card elevation="10">
                <v-card-title>
                  <h2>Statistiques:</h2>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    Niveau: {{ chosenPerso.niveau }}
                  </v-row>
                  <v-row v-for="name in Object.keys(chosenPerso.attributs)" :key="name">
                    {{ name }}: {{ chosenPerso.attributs[name] }}
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col>
                  <v-card elevation="10">
                    <v-card-title>Inventaire</v-card-title>
                    <v-card-text>
                      <v-row v-for="(emplacement, idE) in chosenPerso.emplacements" :key="idE">
                        <v-btn @click="$router.push({name: 'slotEdit', params: {name: emplacement.nom}})"> {{ emplacement.nom }}  {{ emplacement.items.length}}</v-btn>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <ListAndCheck @itemButtonChange="resell"
                            :title="'Sac a dos (dora) ['+chosenPerso.itemsAchetes.length+']'"
                            :icons="{nom: 'mdi-treasure-chest'}" :items="chosenPerso.itemsAchetes"
                            :fields="['nom', 'type']" :item-checked="false"
                            :item-button="{show: true, text: 'revente'}"
                            :list-button="{show: false, text:''}"
              >
                <template v-slot:item="item">
                  {{ item.itemDetails.nom }}
                </template>
                <template v-slot:btnitem>
                  <v-btn>
                    vendre
                  </v-btn>
                </template>
              </ListAndCheck>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="selectPerso(null)" color="red">
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog width="400" v-model="dialog">
        <v-card v-if="chosenShop == null">
          <v-card-title>
            Alors...
          </v-card-title>
          <v-card-text>
            Vous n'etes pas dans une boutique, veuillez en séléctioné une dans l'onglet shop!
          </v-card-text>
          <v-card-actions>
            <v-btn @click="close">Annulez</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>
            Revente d'item
          </v-card-title>
          <v-card-text>
            La revente de votre item vous rapportera un montant de {{ resellPrice }}, pour un prix d'achat de {{ buyPrice }}!
          </v-card-text>
          <v-card-actions>
            <v-btn @click="close">Annulez</v-btn>
            <v-btn @click="acceptResell">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col>
      <router-view name="slot"></router-view>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListAndCheck from "@/components/ListAndCheck.vue";
import {mapState} from "vuex";
export default {
  name: 'persoCarac',
  components: {
    ListAndCheck
  },
  computed: {
    ...mapState(['persos', 'chosenPerso', 'chosenShop']),
  },
  data: () => ({
    resellPrice: null,
    buyPrice: null,
    filter: '',
    dialog: false,

  }),
  methods: {
    selectPerso(perso) {
      this.$store.commit('chosePerso', perso)
    },
    clear(){
      this.chosenPerso = null
    },

    resell(indexItem){
      this.idItem = indexItem
      this.buyPrice = this.chosenPerso.itemsAchetes[indexItem].prix
      this.resellPrice = Math.floor((Math.random() * (0.9 - 0.4) + 0.4) * this.chosenPerso.itemsAchetes[indexItem].prix)
      this.dialog = true
    },
    acceptResell(){
      this.$store.commit("addItem", this.chosenPerso.itemsAchetes[this.idItem])
      this.$store.commit("sellItem", this.chosenPerso.itemsAchetes[this.idItem])
      this.$store.commit("addGold", this.resellPrice)
      this.close()
    },
    close(){
      this.dialog = false
    },

  }
}
</script>