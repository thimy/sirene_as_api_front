<template>
  <div class="form__group">
    <input type="text" name="search" placeholder="Recherche" v-model="fullText"/>
    <button class="overlay-button">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>

    <ul v-show="suggestions">
      <li class="suggestion__box" v-for="suggestion in suggestions">
        {{ suggestion | capitalize | removeExtraChars}}
      </li>
    </ul>

  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import Filters from '@/components/mixins/filters.js'

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
    },
    suggestions: {
      get () {
        const storedSuggestions = this.$store.state.suggestions.storedSuggestions
        const maxSuggestions = 5
        if (storedSuggestions && storedSuggestions.suggestions) {
          if (storedSuggestions.suggestions.length > maxSuggestions) {
            return storedSuggestions.suggestions.splice(0, maxSuggestions)
          }
          return storedSuggestions.suggestions
        }
        return false
      }
    },
    hasSuggestions () {
      return this.suggestions && this.suggestions.length > 0
    }
  },
  methods: {
    instantSuggestionSearch: function () {
      this.$store.dispatch('executeSearchSuggestions')
    },
    delayedRequestSearch: debounce(function () {
      this.$store.dispatch('requestSearch')
    }, 500)
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .form__group {
    width: 35em;
    max-width: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .suggestion__box {
      width: 90%;
      outline: none;
      padding: 8px 14px;
      font: inherit;
      line-height: 1.6;
      color: #1c1c1c;
      border-radius: 3px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      border: 1px solid #adb9c9;
      background: #fff;
      vertical-align: middle;
      position: relative;
  }
</style>
