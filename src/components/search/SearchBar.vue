<template>
  <div class="form__group">
    <input type="text" name="search" placeholder="Recherche" v-model="fullText"
      @keydown.down="suggestDown"
      @keydown.up="suggestUp"
      @keydown.esc="suggestReset"
      @keydown.enter="suggestEnter"/>
    <button class="overlay-button">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>

    <ul v-show="suggestions">
      <li class="suggestion__box"
          v-for="suggestion, index in suggestions"
          :key="index"
          v-bind:class="{'active': suggestActive(index)}">
        <span>{{ suggestion | capitalize | removeExtraChars}}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'SearchBar',
  props: ['searchName'],
  data () {
    return {
      suggestCount: -1
    }
  },
  computed: {
    fullText: {
      get: function () {
        return this.$store.state.search.storedFullText
      },
      set: function (fullText) {
        this.$store.commit('setFullText', fullText)
        if (!fullText) {
          this.$store.dispatch('goToClearedHomePage')
        }
        if (String(fullText).length >= 3) {
          this.$store.commit('setQuerySuggestions', fullText)
          this.$store.dispatch('executeSearchSuggestions')
        }
      }
    },
    suggestions: {
      get: function () {
        const storedSuggestions = this.$store.state.suggestions.storedSuggestions
        if (storedSuggestions && storedSuggestions.suggestions) {
          if (storedSuggestions.suggestions.length > this.maxSuggestions) {
            return storedSuggestions.suggestions.splice(0, this.maxSuggestions)
          }
          return storedSuggestions.suggestions
        }
        return false
      }
    },
    maxSuggestions: {
      get: function () {
        const storedSuggestions = this.$store.state.suggestions.storedSuggestions
        if (!storedSuggestions) {
          return 0
        }
        if (storedSuggestions.suggestions.length < 5) {
          return storedSuggestions.suggestions.length
        } else {
          return 5
        }
      }
    }
  },
  methods: {
    requestSearch: function () {
      if (this.fullText.match(/^\d{14}/)) { // This is siret search
        this.$store.commit('setSiret', this.fullText)
        this.$router.push({ path: `/entreprise/${this.fullText}` })
        return
      }
      if (this.currentSuggestion()) { // This search the current suggestion if selected
        this.$store.commit('setFullText', this.currentSuggestion())
      } else {
        this.$store.commit('setFullText', this.fullText)
      }
      this.$store.dispatch('requestSearch')
      this.suggestCount = -1
    },
    currentSuggestion: function () {
      if (this.suggestCount >= 0) {
        return this.suggestions[this.suggestCount]
      }
    },
    hasSuggestions: function () {
      return this.suggestions && this.suggestions.length > 0
    },
    suggestActive: function (index) {
      return index === this.suggestCount
    },
    suggestReset: function () {
      this.$store.dispatch('hideSuggestions')
    },
    suggestDown: function () {
      if (this.suggestCount < (this.maxSuggestions - 1)) {
        this.suggestCount += 1
      }
    },
    suggestUp: function () {
      if (this.suggestCount > -1) {
        this.suggestCount -= 1
      }
    },
    suggestEnter: function () { // On enter, save the current suggestion and put it as fullText
      this.requestSearch()
    }
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

  .active {
    background-color: $color-light-blue;
    color: $color-white;
  }
</style>
