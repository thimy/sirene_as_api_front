export default {
  filters: {
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }
  }
}
