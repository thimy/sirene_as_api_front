export default {
  methods: {
    isSiret: function (input) {
      const siret = RegExp(/^\d{14}$/)
      const siretWithSeparators1 = RegExp(/^\d{3}[.\-_ ]\d{3}[.\-_ ]\d{3}[.\-_ ]\d{5}$/)
      const siretWithSeparators2 = RegExp(/^\d{3}[.\-_ ]\d{3}[.\-_ ]\d{3}[.\-_ ]\d{3}[.\-_ ]\d{2}$/)
      return (siret.test(input) || siretWithSeparators1.test(input) || siretWithSeparators2.test(input))
    },
    isSiren: function (input) {
      const sirenWithSeparators = RegExp(/^\d{3}[.\-_ ]\d{3}[.\-_ ]\d{3}$/)
      const siren = RegExp(/^\d{9}$/)
      return (siren.test(input) || sirenWithSeparators.test(input))
    },
    removeSeparators: function (input) {
      return input.replace(/[.\-_ ]/g, '')
    }
  }
}