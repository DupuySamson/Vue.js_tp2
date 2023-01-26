<template>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <div style="max-height: 100%" class="product-image">
              <v-img src="../assets/Rpg.png"></v-img>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            Dupuy Samson - Foulon Hugo
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