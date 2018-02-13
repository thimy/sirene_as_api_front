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
          v-for="(suggestion, index) in suggestions"
          :key="index"
          v-bind:class="{'active': suggestActive(index)}"
          @click="suggestSelectAndEnter(index)">
        <span>{{ suggestion | capitalize | removeExtraChars}}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import Suggestions from '@/components/mixins/suggestions.js'

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
          this.$store.commit('setQuerySuggestions', fullText)
          this.$store.dispatch('executeSearchSuggestions')
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
      const currentSuggestion = this.currentSuggestion()
      if (currentSuggestion) { // This search the current suggestion if selected
        this.$store.commit('setFullText', currentSuggestion)
      } else {
        this.$store.commit('setFullText', this.fullText)
      }
      this.$store.dispatch('requestSearch')
      this.suggestCount = -1
    }
  },
  mixins: [Filters, Suggestions]
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

  .suggestion__box { // REVIEW : Stole this CSS from 'input' from template.scss
      width: 90%;
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

  .active {
    background-color: $color-light-blue;
    color: $color-white;
  }
</style>
