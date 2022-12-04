<template>
    <v-navigation-drawer permanent app elevation="8">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <strong>WoW en mieux</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            tjr WoW en mieux
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="nav in titles" :key="nav['route']" link>
            <v-btn :href="nav['route']" :color="nav['couleur']">
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