<template>
  <div>
    <v-card width="400" elevation="10">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-row v-for="(item, indexItem) in items" :key="indexItem">
          <v-switch @change="$emit('checkedChange', indexItem)" v-if="itemChecked" v-model="listCheck[indexItem]"></v-switch>
          <slot name="item" v-bind:itemDetails="item" v-bind:index="indexItem">
            item
          </slot>
          <span @click="$emit('itemButtonChange', indexItem)" v-if="itemButton['show']">
            <slot name="btnitem">
              <v-btn>
                fais qqch
              </v-btn>
            </slot>
          </span>
        </v-row>
        <v-divider v-if="listButton['show']"></v-divider>
      </v-card-text>
      <v-card-actions>
        <span @click="$emit('listButtonChange', listCheck)" v-if="listButton['show']" color="green">
          <slot name="btnlist">
            <v-btn>
              fais qqch
            </v-btn>
          </slot>
        </span>
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