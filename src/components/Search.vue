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
  </div>
</template>

<script>
import SearchBar from './searchbars/SearchBar.vue'
import SearchBarSmall from './searchbars/SearchBarSmall.vue'
import store from '../store/store.js'

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
    requestSearch () {
      store.commit('executeSearch')
    },
    clearButton () {
      store.commit('clearResults')
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
