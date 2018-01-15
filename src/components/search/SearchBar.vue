<template>
  <div class="form__group">
    <input type="text" name="search" placeholder="Recherche" v-model="fullText"/>
    <button class="overlay-button">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'SearchBar',
  props: ['searchName'],
  computed: {
    fullText: {
      get () {
        return this.$store.state.search.storedFullText
      },
      set (fullText) {
        if (!fullText) {
          this.$store.dispatch('goToClearedHomePage')
        }
        if (fullText.match(/^\d{3}/)) {
          this.$store.commit('setSiret', fullText)
        }
        if (fullText.match(/^\d{14}/)) {
          this.$router.push({ path: `/entreprise/${fullText}` })
          return
        }
        if (String(fullText).length >= 3) {
          this.$store.commit('setQuerySuggestions', fullText) // Suggestion search
          this.instantSuggestionSearch()
          this.$store.commit('setFullText', fullText) // Standard search
          this.delayedRequestSearch()
        }
      }
    }
  },
  methods: {
    instantSuggestionSearch: function () {
      this.$store.dispatch('executeSearchSuggestions')
    },
    delayedRequestSearch: debounce(function () {
      this.$store.dispatch('requestSearch')
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
  .form__group {
    width: 35em;
    max-width: 100%;
  }
</style>
