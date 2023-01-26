<template>
  <v-app>
    <v-main>
      <NavBar app
              :titles="titles"
              @menuclicked="goTo"
      >
        <template v-slot:link="link">
          <v-btn >
            {{ link.link.replace("/", '') }}
          </v-btn>
        </template>
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
    goTo(id){
      this.$router.push(this.titles[id].path)
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
