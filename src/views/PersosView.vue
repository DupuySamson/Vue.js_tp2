<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <v-row>
            <h1>Les persos</h1>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <br>
    <div class="boite" v-if="chosenPerso == null">
      <v-card class="carte" v-for="perso in persos" :key="perso['_id']" elevation="8" max-height="800" max-width="150" rounded>
        <v-card-title>
          <v-row>
            <v-col cols="1">
              <v-avatar color="primary" size="60">
                <v-img src="../datasource/profile_image.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="11">
              {{ perso.nom }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="selectPerso(perso)">
            séléctionner
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <perso-caracs v-else>
    </perso-caracs>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import PersoCaracs from "@/components/persoCaracs.vue";
export default {
  name: 'PersosView',
  components: {
    PersoCaracs
  },
  computed: {
    ...mapState(['persos', 'chosenPerso']),
  },
  methods: {
    selectPerso(perso) {
      this.$store.commit('chosePerso', perso)
    },
  }
}
</script>

<style>
.boite {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: baseline;
}

.carte {
  margin: 10px;
}
</style>
