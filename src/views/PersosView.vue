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
    <div class="boite" v-if="chosenPerso == null">
      <v-card class="carte" v-for="perso in persos" :key="perso['_id']" elevation="8" max-height="800" max-width="150" rounded>
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
            séléctionner
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-card v-if="chosenPerso" elevation="8" shaped max-height="800" width="700">
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
              <h1>{{ chosenPerso.nom }}</h1>
            </v-row>
            <v-row>
              <span>
                {{ chosenPerso.or }}
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
                  Niveau: {{ chosenPerso.niveau }}
                </v-row>
                <v-row v-for="name in Object.keys(chosenPerso.attributs)" :key="name">
                  {{ name }}: {{ chosenPerso.attributs[name] }}
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
                          <v-expansion-panel v-for="(Emplacement, id) in chosenPerso.emplacements" :key="id">
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
              <ListAndCheck :title="'Item achetés ['+chosenPerso.itemsAchetes.length+']'" :icons="{nom: 'mdi-treasure-chest'}" :items="chosenPerso.itemsAchetes" :fields="['nom', 'type']" :item-checked="false" :item-button="{show: false, text: ''}" :list-button="{show: false, text:''}"></ListAndCheck>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="selectPerso(null)" color="red">
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import ListAndCheck from "@/components/ListAndCheck"
export default {
  name: 'PersosView',
  components: {
    ListAndCheck
  },
  data: () => ({
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
    ...mapState(['persos', 'chosenPerso']),
  },
  methods: {
    clear(){
      this.chosenPerso = null
    },
    selectPerso(perso) {
      this.$store.commit('chosePerso', perso)
    }
  }
}
</script>

<style>
.boite {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: baseline;
}

.carte {
  margin: 10px;
}

body {
  margin: 0;
  padding: 0;
  font-family: futura-pt, sans-serif;
  font-weight: 400;
  font-style: normal;
  background: #ecf4fe;
}
p {
  margin: 0;
}
#container {
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0;
  box-sizing: border-box;
}
.box {
  width:
}
.card {
  cursor: pointer;
  width: 280px;
  padding: 15px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: -5px -5px 5px rgba(255, 255, 255, 1),
  -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  5px 5px 5px rgba(0, 0, 0, .15);
}
.card .monster-name {
  width: 100%;
  padding: 10px 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: -4px -4px 4px rgba(255, 255, 255, 1),
  -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  2px 2px 5px rgba(0, 0, 0, .15);
}
.card .monster-name h2 {
  color: #126f97;
  font-size: 18px;
  margin: 0;
}
.card .monster-name h2 span {
  font-size: 14px;
}
.card .monster-name .attribute {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
  -2px -2px 5px rgba(255, 255, 255, .5),
  inset 2px 2px 4px rgba(255, 255, 255, .1),
  2px 2px 8px rgba(0, 0, 0, .15);
}
.card .monster-name .attribute img {
  width: 15px;
}
.card .level {
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.card .level img {
  width: 12px;
  padding: 3px;
  border-radius: 50%;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
  -2px -2px 5px rgba(255, 255, 255, .5),
  inset 2px 2px 4px rgba(255, 255, 255, .1),
  2px 2px 8px rgba(0, 0, 0, .15);
  margin-left: 5px;
}
.card .monster-image {
  width: 90%;
  margin-top: 15px;
  padding: 12px 12px 7px 12px;
  border-radius: 5px;
  box-shadow: -4px -4px 4px rgba(255, 255, 255, 1),
  -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  2px 2px 5px rgba(0, 0, 0, .15);
  box-sizing: border-box;
}
.card .monster-image img {
  width: 100%;
}
.card .description {
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: -4px -4px 4px rgba(255, 255, 255, 1),
  -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  2px 2px 5px rgba(0, 0, 0, .15);
  box-sizing: border-box;
}
.card .description .type {
  font-size: 12px;
  letter-spacing: 1.2px;
  margin-bottom: 5px;
}
.card .description .atk-def {
  margin-top: 10px;
  padding-top: 5px;
  border-top: solid 1px #d8d8d8;
  font-size: 12px;
  text-align: right;
}
.card:hover {
  box-shadow: inset -5px -5px 5px rgba(255, 255, 255, 1),
  inset -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  inset 5px 5px 5px rgba(0, 0, 0, .15);
}
.card:hover .monster-name,
.card:hover .monster-image,
.card:hover .description {
  box-shadow: inset -4px -4px 4px rgba(255, 255, 255, 1),
  inset -4px -4px 4px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  inset 2px 2px 5px rgba(0, 0, 0, .15);
}
.card:hover .monster-name .attribute,
.card:hover .level img {
  box-shadow: inset -1px -1px 2px rgba(255, 255, 255, 1),
  inset -1px -1px 2px rgba(255, 255, 255, .5),
  inset 1px 1px 2px rgba(255, 255, 255, .1),
  inset 1px 1px 4px rgba(0, 0, 0, .15);
}
.card:hover p,
.card:hover h2,
.card:hover img {
  transform: scale(.98);
}

</style>
