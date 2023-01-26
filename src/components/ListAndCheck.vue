<template>
  <div>
    <v-card width="400" elevation="10">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-row v-for="(item, indexItem) in items" :key="indexItem">
          <v-switch @change="$emit('checkedChange', indexItem)" v-if="itemChecked" v-model="listCheck[indexItem]"></v-switch>
          <v-col v-for="(champ, indexChamp) in fields" :key="indexChamp" class="justify-center">
            <v-icon>
              {{ icons[champ] }}
            </v-icon>
            {{ item[champ] }}
          </v-col>
          <v-btn @click="$emit('itemButtonChange', indexItem)" v-if="itemButton['show']">
            {{ itemButton['text'] }}
          </v-btn>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('listButtonChange', listCheck)" v-if="listButton['show']" color="green">
          {{ listButton['text'] }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ListAndCheck",
  props: {
    title: String,
    items: Array,
    fields: Array,
    itemChecked: Boolean,
    checked: Array,
    itemButton: Object,
    listButton: Object,
    icons: Object,
    iconsForDialog: Array
  },
  data (){
    return {
      listCheck: this.checked,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>