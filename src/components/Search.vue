<template>
  <div>
    <div class="hero">
      <div class="hero__container container" v-bind:class="[showWelcomeText ? '' : 'hero__compact' ]">
        <transition name="fade">
          <div class="text-center" v-if="showWelcomeText">
            <h1 class="search__title">
              Retrouvez toutes les informations concernant les entreprises et associations de France
            </h1>
            <p class="search__subtitle">La plus grande base de données sur l'état civil des entreprises françaises est maintenant accessible à tous, sans frais.</p>
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
        <search-categories v-if="!showWelcomeText"></search-categories>
      </div>
    </div>
    <!-- TODO Factorize here  -->
    <template v-if="showWelcomeText">
      <Api />
      <PublicAdministration />
    </template>
    <!-- end factorize -->
  </div>
</template>

<script>
import SearchBar from '@/components/search/SearchBar'
import SearchBarSmall from '@/components/search/SearchBarSmall'
import SearchCategories from '@/components/search/SearchCategories'
import Results from '@/components/Results.vue'
import Api from '@/components/home/Api.vue'
import PublicAdministration from '@/components/home/PublicAdministration.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'SearchBarSmall': SearchBarSmall,
    'SearchCategories': SearchCategories,
    'Results': Results,
    'Api': Api,
    'PublicAdministration': PublicAdministration
  },
  created: function () {
    if (this.$route.query.page) {
      this.$store.commit('setPage', this.$route.query.page)
    }
    // TODO: Add filters commit here later
    if (this.$route.query.fullText) {
      this.$store.commit('setFullText', this.$route.query.fullText)
      this.$store.dispatch('requestSearch')
    }
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
      this.$store.dispatch('executeSearch')
    },
    clearButton () {
      this.$store.commit('clearResults')
    }
  },
  computed: {
    isSearchNotEmpty: function () {
      return this.$store.state.storedFullText !== ''
    },
    showWelcomeText () {
      return this.$store.state.welcomeText.isWelcomeTextVisible
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.fullText) {
        this.$store.dispatch('requestSearch')
      }
    }
  }
}

</script>

<style lang="scss" scoped>

  .hero {
    background: linear-gradient(180deg, $color-light-blue, $color-blue);
    box-sizing: content-box;
  }

  .hero__compact {
    min-height: initial;
    padding-bottom: 0;
  }

  .hero h1, .hero p {
    color: $color-white;
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

  .informations-index {
    text-align: center;
  }

</style>
