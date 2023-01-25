<template>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <strong>RPG_Vue>WOW</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            j'adore javascript la synthaxe est niquel
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="nav in titles" :key="nav['route']" link>
            <v-btn @click="$router.push(nav.route)" :color="nav['couleur']">
              {{ nav['route'].replace('/', '') }}
            </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    titles: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn{
  width: 100%;
}
.v-navigation-drawer{
  height: 100%
}

</style>