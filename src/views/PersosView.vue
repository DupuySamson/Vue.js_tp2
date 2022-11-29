<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <h1>Les persos</h1>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-row>
              <label for="filteractive">filtrage possible : </label>
              <input type="checkbox" v-model="filterActive" id="filteractive">
            </v-row>
            <v-row>
              <v-col v-if="filterActive">
                <label>filtre: </label><input v-model="filter" id="filtertown">
                <v-btn color="error" x-small v-if="filter.length>0" @click="clear">
                  X
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br>
    <v-card v-for="(perso, id) in persosFiltre" :key="id" elevation="8" shaped max-height="800" max-width="500">
      <v-card-title>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="2">
                <v-avatar v-if="persosFiltre.length==1" color="primary" size="90">
                <v-img src="../datasource/profile_image.jpg"></v-img>
              </v-avatar> 
              <v-avatar v-if="persosFiltre.length>1" color="primary" size="60">
                <v-img src="../datasource/profile_image.jpg"></v-img>
              </v-avatar> 
              </v-col>
              <v-col cols="3">
              {{ perso.nom }}
              </v-col>
              <v-col cols="5">
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="persosFiltre.length==1">
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col>
                <br>
                <br>
                <br>
                <br>
                <br>
                <v-row>
                  <h1>
                    Niveau: {{ perso.niveau }}
                  </h1>
                </v-row>
                <v-row v-for="name in Object.keys(perso.attributs)" :key="name">
                  <v-col>
                    <v-row>
                      <h2>
                        {{ name }}: {{ perso.attributs[name] }}
                      </h2>
                    </v-row>
                    <v-row>
                      <v-divider></v-divider>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              Or: {{ perso.or }}
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col>
                <v-liste-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>Inventaire:</strong>
                    </v-list-item-title>
                    <v-liste-item-subtile>
                      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                        <v-expansion-panel v-for="(Emplacement, id) in perso.emplacements" :key="id">
                          <v-expansion-panel-header>
                            <strong>
                            {{ Emplacement.nom }} [{{ Emplacement.items.length }}] 
                            </strong>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row v-for="(item, id) in Emplacement.items" :key="id">
                              <v-col>
                                - {{ item.nom }}
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-liste-item-subtile>
                  </v-list-item-content>
                </v-liste-item>
              </v-col>
            </v-row>
            <v-row>
              Item achetés [{{ perso.itemsAchetes.length}}]
              <div v-if="perso.itemsAchetes.length>0" >:
                <span v-for="(item, id) in perso.itemsAchetes" :key="id">{{ item.nom}}</span>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import { mapState } from 'vuex';
export default {
  name: 'PersosView',
  data: () => ({
    filter: '',
    filterActive: false
  }),
  computed: {
    ...mapState(['persos']),
    persosFiltre() {
      if(this.filterActive){
        return this.persos.filter(v => v.nom.includes(this.filter))
      }
      return this.persos
    }
  },
  methods: {
    clear(){
      this.filter = ''
    }
  }
}
</script>
