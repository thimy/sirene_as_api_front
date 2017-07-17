<template>
  <div>
    <div class="row justify-content-center">
      <h1>Bienvenue sur le moteur de recherche SIRENE</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 offset-2 marged-top">
        <SearchBar searchName="Recherche par nom"></SearchBar>
        <div class="row justify-content-center">
          <button class="btn btn-default" id="filter-button" v-on:click="filterButton">
            Filtres
            <svg class="icon icon-equalizer"><use xlink:href="#icon-equalizer"></use></svg>
          </button>
        </div>
        <SearchBarSmall searchName="Code Postal" v-if="toggleFilters"></SearchBarSmall>
        <SearchBarSmall searchName="Activite Principale" v-if="toggleFilters"></SearchBarSmall>
      </div>
    </div>
    <results></results>
  </div>
</template>

<script>
import SearchBar from '@/components/searchbars/SearchBar.vue'
import SearchBarSmall from '@/components/searchbars/SearchBarSmall.vue'
import Results from '@/components/results/Results.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'SearchBarSmall': SearchBarSmall,
    'Results': Results
  },
  data () {
    return {
      toggleFilters: false,
      results: null
    }
  },
  methods: {
    filterButton () {
      this.toggleFilters = !this.toggleFilters
      this.$store.commit('clearFilters')
      this.$store.commit('executeSearch')
    },
    requestSearch () {
      this.$store.commit('executeSearch')
    },
    clearButton () {
      this.$store.commit('clearResults')
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
