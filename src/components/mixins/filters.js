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
      if (string && string != 'null') {
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
    },
    truncate: function (string) {
      if (string && string.length > 80) {
        return `${string.substring(0, 75)}...`
      }
      return string
    },
    pluralizeDependingOn: function (string, int) {
      if (int > 1) {
        return `${string}s`
      } else {
        return string
      }
    },
    frenchNumberFormat: function(input) {
      // If input have fraction digits, write 2 of them
      if (Number(input) % 1 == 0) {
        return new Intl.NumberFormat('fr-FR').format(input)
      } else {
        return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(input)
      }
    },
    frenchDateFormat: function(input) {
      if (input == null) {
        return null
      }
      return new Intl.DateTimeFormat('en-GB').format(new Date(input))
    },
    formatIfDate: function(input) {
      if (input == null) {
        return null
      }

      const dateFormat = RegExp(/^\d{4}-\d{2}-\d{2}$/)

      if (dateFormat.test(input)) {
        return new Intl.DateTimeFormat('en-GB').format(new Date(input))
      }
      return input
    }
  },
  methods: {
    concatIfExist(base, addition) {
      if (addition) {
        return base.concat(' ', addition)
      }
      return base
    }
  }
}
