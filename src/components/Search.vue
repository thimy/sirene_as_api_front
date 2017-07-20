<template>
  <div class="search light-text">
    <div class="container">
      <transition name="fade">
        <div class="search__text" v-if="showText">
          <h1 class="search__title">
            Retrouvez toutes les informations concernant les entreprises et associations de France
          </h1>
          <p class="search__subtitle">La plus grande base de données sur l'état civil des entreprises françaises est maintenant accessible à tous, sans frais.<br /><router-link to="/">Plus d'informations</router-link>.</p>
        </div>
      </transition>
      <SearchBar searchName="Recherche par nom"></SearchBar>
      <div class="filters">
        <button class="btn btn-default" id="filter-button" v-on:click="filterButton">
          Filtres
          <svg class="icon icon-equalizer"><use xlink:href="#icon-equalizer"></use></svg>
        </button>
        <SearchBarSmall searchName="Code Postal" v-if="toggleFilters"></SearchBarSmall>
        <SearchBarSmall searchName="Activite Principale" v-if="toggleFilters"></SearchBarSmall>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/searchbars/SearchBar.vue'
import SearchBarSmall from '@/components/searchbars/SearchBarSmall.vue'
import Results from '@/components/Results.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'SearchBarSmall': SearchBarSmall,
    'Results': Results
  },
  data () {
    return {
      toggleFilters: true,
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
  },
  computed: {
    showText () {
      return this.$store.state.isSearchTextVisible
    }
  }
}

</script>

<style lang="scss" scoped>
  .search {
    padding: 3em;
    text-align: center;
    background: linear-gradient(180deg, $color-light-blue, $color-medium-blue);
    box-sizing: content-box;
  }

  .search__subtitle {
    margin: 2em 0;
  }

  .marged-top {
    margin-top: 1em;
  }

  #filter-button {
    margin: 1em;
  }

  .icon-equalizer {
    font-size: 23px;
  }

  .filters {
    display: none;
  }
</style>
