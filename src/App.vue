<template>
  <v-app>
    <v-main>
      <NavBar app
              :titles="titles"
      >
      </NavBar>
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  data (){
    return {
      titles: [{path:"/persos", couleur: 'grey'}, {path: "/towns", couleur: 'grey'}]
    }
  },
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs']),
  },
  mounted() {
    this.getAllTowns();
    this.getAllCharacs();
  },
  components: {
    NavBar
  }
};
</script>
