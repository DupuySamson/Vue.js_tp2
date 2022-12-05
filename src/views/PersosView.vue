<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <v-row>
            <h1>Les persos</h1>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <br>
    <div class="box" v-if="selectedCharac == null">
      <v-card class="card" v-for="perso in persos" :key="perso['_id']" elevation="8" max-height="800" max-width="150" rounded>
        <v-card-title>
          <v-row>
            <v-col cols="1">
              <v-avatar color="primary" size="60">
                <v-img src="../datasource/profile_image.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="11">
              {{ perso.nom }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="selectPerso(perso)">
            <v-icon>
              mdi-information-variant
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-card v-if="selectedCharac != null" :key="selectedCharac['_id']" elevation="8" shaped max-height="800" width="700">
      <v-card-title>
        <v-row>
          <v-col>
            <v-avatar color="primary" size="90">
              <v-img src="../datasource/profile_image.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
              <br>
            <v-row>
              <h1>{{ selectedCharac.nom }}</h1>
            </v-row>
            <v-row>
              <span>
                {{ selectedCharac.or }}
              <v-icon>
                mdi-circle-multiple
              </v-icon>
              </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-card elevation="10">
              <v-card-title>
                <h2>Statistiques:</h2>
              </v-card-title>
              <v-card-text>
                <v-row>
                  Niveau: {{ selectedCharac.niveau }}
                </v-row>
                <v-row v-for="name in Object.keys(selectedCharac.attributs)" :key="name">
                  {{ name }}: {{ selectedCharac.attributs[name] }}
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col>
                <v-card elevation="10">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <h2>Inventaire:</h2>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-expansion-panels multiple>
                          <v-expansion-panel v-for="(Emplacement, id) in selectedCharac.emplacements" :key="id">
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
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
              <ListAndCheck :title="'Item achetés ['+selectedCharac.itemsAchetes.length+']'" :icons="{nom: 'mdi-treasure-chest'}" :items="selectedCharac.itemsAchetes" :fields="['nom', 'type']" :item-checked="false" :item-button="{show: false, text: ''}" :list-button="{show: false, text:''}"></ListAndCheck>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear()" color="red">
          X
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import ListAndCheck from "@/components/ListAndCheck";
export default {
  name: 'PersosView',
  components: {
    ListAndCheck
  },
  data: () => ({
    selectedCharac: null,
    filter: '',
    items: [
      {
        nom: 'épée'
      },
      {
        nom: 'épée mais grosse'
      }
    ]
  }),
  computed: {
    ...mapState(['persos']),
    persosFiltre() {
        return this.persos
    }
  },
  methods: {
    clear(){
      this.selectedCharac = null
    },
    selectPerso(perso){
      this.selectedCharac = perso
    }
  }
}
</script>

<style>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: baseline;
}

.card {
  margin: 10px;
}

</style>
