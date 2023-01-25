<template>
  <v-app>
    <v-main>
      <NavBar app
              :titles="titles"
              @change_route="changeTheSlash"
      >

      </NavBar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from "@/components/NavBar";
import router from "@/router";

export default {
  name: 'App',
  data (){
    return {
      titles: [{route:"/persos", couleur: 'grey'}, {route: "/towns", couleur: 'grey'}]
    }
  },
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs']),
    changeTheSlash(route){
      router.push(route)
    }
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
