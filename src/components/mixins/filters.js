export default {
  filters: {
    capitalize: function (string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      }
    },
    upperCase: function (string) {
      if (string) {
        return string.toUpperCase()
      }
    },
    ifExist: function (string) {
      if (!string) {
        return 'Non renseigné'
      }
    },
    removeExtraChars: function (string) {
      if (!string) {
        return null
      }
      const withoutAsterisk = string.replace(/\*/, ' ')
      const withoutAsteriskOrSlash = withoutAsterisk.replace(/\//g, ' ')
      // Remove potential space at end of string
      return withoutAsteriskOrSlash.replace(/ $/, '')
    }
  }
}
