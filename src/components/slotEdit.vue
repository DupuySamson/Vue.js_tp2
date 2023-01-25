<template>
  <v-container>
    <v-row v-for="(emplacement, idE) in chosenPerso.emplacements" :key="idE">
      <v-card v-if="emplacement.nom == name">
        <v-card-title>
          <v-col>
            {{ emplacement.nom }}
          </v-col>
          <v-col>
            <v-chip @click="equipe(idE)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-chip>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-row v-for="(item, idI) in emplacement.items" :key="idI">
            <v-col>{{ item.nom}}

            </v-col>
            <v-col>
              <v-chip @click="desequipe(idE, idI)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-dialog width="400" v-model="dialogEquipe">
      <ListAndCheck @itemButtonChange="equipeToEmplacement" @listButtonChange="closeEquipe"
                    :title="'Sac a dos (dora rpz)'"
                    :icons="{nom: 'mdi-treasure-chest'}" :items="chosenPerso.itemsAchetes"
                    :fields="['nom', 'type']" :item-checked="false"
                    :item-button="{show: true, text: 'ajouter'}"
                    :list-button="{show: true, text:'close'}"
      ></ListAndCheck>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import ListAndCheck from "@/components/ListAndCheck.vue";
export default {
  name: 'slotEdit',
  components: {
    ListAndCheck
  },
  data: () => ({
    dialogEquipe: false,
    idE: 0
  }),
  props: {
    name: String
  },
  computed: {
    ...mapState(['chosenPerso']),
  },
  methods: {
    desequipe(idE, idI){
      let values = {
        idE: idE,
        idI: idI
      }
      console.log(this.chosenPerso.emplacements[idE].items[idI].nom)
      this.$store.commit("removeEquipe", values)
    },
    equipe(idE){
      this.idE = idE
      this.dialogEquipe = true
    },
    equipeToEmplacement(idI){
      let values = {
        idE: this.idE,
        idI: idI
      }
      this.$store.commit("addEquipe", values)
    },
    closeEquipe(){
      this.dialogEquipe = false
    }
  }
}
</script>

<style scoped>

</style>