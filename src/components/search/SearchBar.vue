<template>
  <div class="form__group">
    <input type="text" name="search" placeholder="Nom, SIREN, SIRET, adresse..." v-model="fullText"
      @keydown.down="suggestDown"
      @keydown.up.prevent="suggestUp"
      @keydown.esc="suggestReset"
      @keydown.enter="suggestEnter"/>
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
      <!-- eslint-disable-next-line -->
      <li class="suggestion__box hidden" v-for="index in suggestionNumberToMax"></li>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import Suggestions from '@/components/mixins/suggestions.js'
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
          this.$store.commit('setQuerySuggestions', fullText)
          this.$store.dispatch('executeSearchSuggestions')
        }
      }
    }
  },
  methods: {
    requestSearch: function () {
      const isSiret = this.isSiret(this.fullText)
      const isSiren = this.isSiren(this.fullText)

      if (isSiret || isSiren) {
        this.fullText = this.removeSeparators(this.fullText)
        isSiret ? this.requestSiretSearch() : this.requestSirenSearch()
      } else {
        this.requestFullTextSearch()
      }
      this.$store.commit('clearResults')
    },
    requestFullTextSearch: function () {
      const currentSuggestion = this.currentSuggestion()
      if (currentSuggestion) { // This search the current suggestion if selected
        this.$store.commit('setFullText', currentSuggestion)
      } else {
        this.$store.commit('setFullText', this.fullText)
      }
      this.$store.dispatch('requestSearch')
      this.suggestCount = -1
    },
    requestSiretSearch: function () {
      this.$store.commit('setSiret', this.fullText)
      this.$router.push({ path: `/entreprise/${this.fullText}` })
    },
    requestSirenSearch: function (siren) {
      this.$store.dispatch('executeSearchBySiren', this.fullText)
        .then(response => {
          const siegeSiret = this.$store.getters.storedSirenSiege.siret
          this.$router.push({ path: `/entreprise/${siegeSiret}` })
        })
        .catch((notFound) => {
          this.$store.dispatch('setResponse', notFound)
        })
    }
  },
  mixins: [Filters, Suggestions, RegExps]
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

  .hidden {
    visibility: hidden;
  }

  .active {
    background-color: $color-light-blue;
    color: $color-white;
  }
</style>
