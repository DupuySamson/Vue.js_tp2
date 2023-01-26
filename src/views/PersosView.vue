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
      <template v-slot:niv="niv">
        niveau: <span v-for="n in niv.niv" :key="n">
        <v-icon>
          mdi-star
        </v-icon>
      </span>
      </template>
      <template v-slot:vie="{vie, vita}">
          <v-progress-linear color="green" background-color="red" height="10" :value="vie/vita*100">
          </v-progress-linear>
      </template>
      <template v-slot:or="or">
        {{ AtoR(or.or) }}
      </template>
    </perso-caracs>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import PersoCaracs from "@/components/persoCaracs.vue";
export default {
  name: 'PersosView',
  data: () => ({
    A: [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ],
    R: [ "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" ],
    Alength: 13,
  }),
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
    AtoR( nb ){
      // on s'assure d'avoir un entier entre 1 et 3999.
      let x = parseInt( nb, 10 ) || 1,
          str = "";

      if ( x < 1 ){
        x = 1;
      } else if ( x > 3999 ){
        x = 3999;
      }

      // pour chaque A[ i ],
      // tant que x est supérieur ou égal
      // on déduit A[ i ] de x.
      // arrêt de la boucle si x == 0
      for ( let i = 0; i < this.Alength; ++i ){
        while ( x >= this.A[ i ] ){
          x -= this.A[ i ];
          str += this.R[ i ];
        }
        if ( x == 0 ){
          break;
        }
      }
      return str;
    }
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
