export default {
  filters: {
    capitalize: function (string) {
      if (!string) {
        return null
      }
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    },
    upperCase: function (string) {
      if (!string) {
        return null
      }
      return string.toUpperCase()
    },
    ifExist: function (string) {
      if (string) {
        return string
      }
      return 'Non renseigné'
    },
    removeExtraChars: function (string) {
      if (!string) {
        return null
      }
      const withoutAsterisk = string.replace(/\*/g, ' ')
      const withoutAsteriskOrSlash = withoutAsterisk.replace(/\//g, ' ')
      // Remove potential double spaces and potential space at end of string
      return withoutAsteriskOrSlash.replace(/ {2}/g, ' ').replace(/ $/, '')
    }
  },
  methods: {
    insert(string, index, value) {
      return (string.slice(0, index) + value + string.slice(index))
    },
    frenchNumberFormat: function(input) {
      let string = input.toString()
      if (string.length >= 7) {
        string = this.insert(string, -6, ' ')
      }
      if (string.length >= 4) {
        string = this.insert(string, -3, ' ')
      }
      return string
    }
  }
}
