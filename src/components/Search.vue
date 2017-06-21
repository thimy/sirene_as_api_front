<template>
  <div>
    <div class="row justify-content-center">
      <h1>{{ msg }}</h1>
    </div>
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
</template>

<script>
import SearchBar from './SearchBar.vue'
import SearchBarSmall from './SearchBarSmall.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'SearchBarSmall': SearchBarSmall
  },
  data () {
    return {
      msg: 'Bienvenue sur le moteur de recherche SIRENE',
      toggleFilters: false
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
</style>
