<template>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <strong>RPG_Vue >>> WOW</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            j'adore javascript -_-
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div v-for="(nav, id) in titles" :key="id">
        <span @click="goTo(id)">
        <slot name="link" v-bind:link="nav.path">
        {{ nav.path }}
        </slot>
      </span>
      </div>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    titles: Array
  },
  methods: {
    goTo(id){
      this.$emit('menuclicked', id)
    }
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