<template>
  <div>
    <div class="row justify-content-center">
      <h1>Bienvenue sur le moteur de recherche SIRENE</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 offset-2 marged-top">
        <SearchBar searchName="Recherche par nom"></SearchBar>
        <div class="row justify-content-center">
          <button class="btn btn-default" id="filter-button" v-on:click="toggleFilters = !toggleFilters">
            Filtres
            <svg class="icon icon-equalizer"><use xlink:href="#icon-equalizer"></use></svg>
          </button>
        </div>
        <SearchBarSmall searchName="Code Postal" v-if="toggleFilters"></SearchBarSmall>
        <SearchBarSmall searchName="Activite Principale" v-if="toggleFilters"></SearchBarSmall>
      </div>
    </div>
    <button class="btn btn-default" v-on:click="requestSearch">
      Recherche test
    </button>
    <button class="btn btn-default" v-on:click="clearButton">
      Clear test
    </button>
    <p>{{ results}}</p>
  </div>
</template>

<script>
import SearchBar from './searchbars/SearchBar.vue'
import SearchBarSmall from './searchbars/SearchBarSmall.vue'
import store from '../store/store.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'SearchBarSmall': SearchBarSmall
  },
  data () {
    return {
      toggleFilters: false,
      results: null
    }
  },
  methods: {
    add () {
      store.commit('add')
    },
    clear () {
      store.commit('clear')
    },
    requestSearch () {
      // GET /someUrl
      this.$http.get('http://localhost:3000/full_text/test').then(response => {
        // get body data
        // var temp = response.body
        // var tempEtablissements = temp.etablissement
        // var arrayEtablissements = temp.etablissement[0]['nom_raison_sociale']
        // this.results = temp.etablissement[0]['nom_raison_sociale']
        // this.results = response.body.etablissement
        store.state.storedResults = response.body.etablissement
      }, response => {
        // error callback
      })
    },
    clearButton () {
      store.state.storedResults = null
    }
  }
}

</script>

<style>
  .search-title {
    text-align: center;
  }
</style>

<style scoped>
  .marged-top {
    margin-top: 1em;
  }

  #filter-button {
    margin: 1em;
  }

  .icon-equalizer {
    font-size: 23px;
  }
</style>
