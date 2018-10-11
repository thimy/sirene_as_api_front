export default {
  data () {
    return {
      maxSuggestions: 5,
      suggestCount: -1
    }
  },
  computed: {
    suggestions: {
      get: function () {
        const storedSuggestions = this.$store.state.suggestions.storedSuggestions
        if (storedSuggestions && storedSuggestions.length != 0) {
          if (storedSuggestions.length > this.suggestionNumber) {
            return storedSuggestions.slice(0, this.suggestionNumber)
          }
          return storedSuggestions
        }
        return false
      }
    },
    suggestionNumber: {
      get: function () {
        const storedSuggestions = this.$store.state.suggestions.storedSuggestions
        if (!storedSuggestions) {
          return 0
        }
        if (storedSuggestions.length < this.maxSuggestions) {
          return storedSuggestions.length
        } else {
          return this.maxSuggestions
        }
      }
    }
  },
  methods: {
    currentSuggestion: function () {
      if (this.suggestCount >= 0) {
        return this.suggestions[this.suggestCount]
      }
      return null
    },
    hasSuggestions: function () {
      return this.suggestions && this.suggestions.length > 0
    },
    suggestActive: function (index) {
      return index === this.suggestCount
    },
    suggestReset: function () {
      this.$store.commit('setStoredSuggestions', '')
    },
    suggestDown: function () {
      if (this.suggestCount < (this.suggestionNumber - 1)) {
        this.suggestCount += 1
      }
    },
    suggestUp: function () {
      if (this.suggestCount > -1) {
        this.suggestCount -= 1
      }
    },
    suggestSelectAndEnter: function (selectedIndex) {
      this.suggestCount = selectedIndex
      this.requestSearchIfNotEmpty()
    },
    resetIndexSuggestion: function () {
      this.suggestCount = -1
    },
    suggestionNumberToMax () {
      return this.maxSuggestions - this.suggestionNumber
    }
  }
}
