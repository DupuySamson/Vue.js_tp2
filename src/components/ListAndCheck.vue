<template>
  <div>
    <v-card width="400" elevation="10">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-row v-for="(item, _id) in items" :key="_id">
          <v-switch @change="$emit('checkedChange', _id)" v-if="itemChecked" v-model="listCheck[_id]"></v-switch>
          <v-col v-for="(champ, id) in fields" :key="id" class="justify-center">
            <v-icon>
              {{ icons[champ] }}
            </v-icon>
            {{ item[champ] }}
          </v-col>
          <v-btn @click="dialogItem(_id) ,$emit('itemButtonChange', _id)" v-if="itemButton['show']">
            {{ itemButton['text'] }}
          </v-btn>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogList('dialoge'), $emit('listButtonChange', 'dialoge')" v-if="listButton['show']" color="green">
          {{ listButton['text'] }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
          <v-list v-if="itemInDialog.length > 0">
            <v-list-item v-for="index in itemInDialog" :key="index">
              <v-col v-for="infos in Object.entries(items[index])" :key="infos">
                {{ infos[0] }}: {{ infos[1] }}
              </v-col>
            </v-list-item>
          </v-list>
          <div v-else>
            {{ noItemText }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      dialog: false,
      dialogTitle: "",
      noItemText: "",
      itemInDialog: []
    }
  },
  methods: {
    dialogList(){
      this.itemInDialog = []
      this.dialogTitle = "Items"
      for (let i = 0; i <this.listCheck.length ; i++) {
        if(this.listCheck[i]){
          this.itemInDialog.push(i)
        }
      }
      if(this.itemInDialog.length == 0){
        this.noItemText = "Pas d'items séléctionnés ..."
      }
      this.changeDialogState("dialog")
    },
    dialogItem(idItem){
      this.dialogTitle = "Description"
      this.itemInDialog = []
      this.itemInDialog.push(idItem)
      this.changeDialogState("dialog")
    },
    changeDialogState(dialogeName) {
      this[dialogeName] = !this[dialogeName]
    }
  }
}
</script>

<style scoped>
</style>