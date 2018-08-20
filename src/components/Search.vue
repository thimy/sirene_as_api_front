<template>
  <div class="hero">
    <div class="notification full-width">
      Ce site est un travail en cours, actuellement en beta. Vous pouvez le consulter librement.
    </div>
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
      <router-link v-if="showBackToResultsButton" class="back-to-results" :to="{ path: pathBack, query: queryBack }">
        ← Revenir aux résultats
      </router-link>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/search/SearchBar'
import Results from '@/components/Results.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'Results': Results
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
      results: null,
      pathBack: '/search',
      queryBack: {
        fullText: this.$store.getters.storedFullText,
        page: this.$store.getters.pageNumber
      }
    }
  },
  computed: {
    isSearchNotEmpty () {
      return this.$store.state.storedFullText !== ''
    },
    showWelcomeText () {
      return this.$store.state.welcomeText.isWelcomeTextVisible
    },
    showBackToResultsButton () {
      // show back button only on etablissement page
      return this.$route.path.includes('/entreprise')
      // only if there is more than one result
        && this.$store.getters.numberResults > 1
      // only if we aren't on a 404 // 500 error situation
        && this.$store.state.results.storedStatus === 200
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

  .hero__container {
    padding-left: 0;
    padding-right: 0;
  }

  .hero__compact {
    min-height: initial;
    padding-bottom: 0;
  }

  .hero h1, .hero p {
    color: $color-white;
  }

  .icon-equalizer {
    font-size: 23px;
  }

  .informations-index {
    text-align: center;
  }

  .back-to-results {
    color: $color-white;
    display: block;
    width: 100%;
    margin: 2em 0 1em;
  }

</style>
