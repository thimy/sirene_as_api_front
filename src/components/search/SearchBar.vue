<template>
  <div class="form__group">
    <!-- <div class="form__select">
      <span>Je recherche une :</span>
      <input type="radio" name="search_type" value="sirene"> <span>Association</span>
      <input type="radio" name="search_type" value="rna"> <span>Entreprise</span>
    </div> -->
    <input type="text" name="search" placeholder="Nom, SIREN, SIRET, adresse..." v-model="fullText"
      @keydown.down="suggestDown"
      @keydown.up.prevent="suggestUp"
      @keydown.esc="suggestReset"
      @keydown.enter="requestSearchIfNotEmpty"/>
    <button class="overlay-button">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>

    <ul v-show="suggestions">
      <li class="suggestion__box"
          v-for="(suggestion, index) in suggestions"
          :key="index"
          v-bind:class="{'active': suggestActive(index)}"
          @click="suggestSelectAndEnter(index)">
        <span>{{ suggestion | capitalize | removeExtraChars}}</span>
      </li>
      <!-- Filling with hidden divs so search bar will always be same size -->
      <li class="hidden suggestion__box" :key="index" v-for="index in suggestionNumberToMax"></li>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import SuggestionsHelpers from '@/components/mixins/suggestionsHelpers.js'
import RegExps from '@/components/mixins/regExps.js'

export default {
  name: 'SearchBar',
  props: ['searchName'],
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
          this.resetIndexSuggestion()
          this.$store.commit('setPage', 1)
          this.$store.commit('setQuerySuggestions', fullText)
          this.$store.dispatch('executeSearchSuggestions')
        }
      }
    },
    isSearchNotEmpty () {
      return this.$store.state.search.storedFullText !== ''
    },
  },
  methods: {
    requestSearchIfNotEmpty: function() {
      if (this.isSearchNotEmpty) {
        this.requestSearch()
      }
    },
    requestSearch: function () {
      const natureSearchId = this.analyzeSearchId(this.fullText)

      if (natureSearchId) {
        this.fullText = this.removeSeparators(this.fullText)
        this.$router.push({ path: `/etablissement/${this.fullText}` })
      } else {
        this.requestFullTextSearch()
      }
      this.$store.commit('clearResults')
    },
    requestFullTextSearch: function () {
      const currentSuggestion = this.currentSuggestion()
      if (currentSuggestion) {
        this.$store.commit('setFullText', currentSuggestion)
      } else {
        const fullTextNoDiacritics = this.removeDiacritics(this.fullText)
        this.$store.commit('setFullText', fullTextNoDiacritics)
      }
      this.$store.dispatch('requestSearchFullText')
      this.suggestCount = -1
    }
  },
  mixins: [Filters, SuggestionsHelpers, RegExps]
}
</script>

<style lang="scss" scoped>
  .form__group {
    width: 35em;
    max-width: 100%;
  }

  .form__select {
    margin-bottom: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .suggestion__box {
      min-height: 2.7em;
      outline: none;
      padding: 8px 14px;
      font: inherit;
      line-height: 1.6;
      color: $color-black;
      border-radius: 3px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      border: 1px solid $color-grey-blue;
      background: $color-white;
      vertical-align: middle;
      position: relative;
  }

  // TODO: is this called ?
  .hidden {
    visibility: hidden;
  }

  .active {
    background-color: $color-light-blue;
    color: $color-white;
  }
</style>
