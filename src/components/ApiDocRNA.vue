<template>
  <div>
    Api DOC RNA
  </div>
</template>

<script>
import ApiDocIntro from '@/components/apiDocSirene/ApiDocIntro'


export default {
  name: 'ApiDocRNA',
  components: {

  },
  data () {
    return {
      baseAdress: "https://rna.entreprise.api.gouv.fr/v1/"
    }
  },
  created() {
    this.$store.dispatch('hideWelcomeText')
  }
}

</script>
