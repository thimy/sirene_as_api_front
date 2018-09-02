<template>
  <div>
    <api-doc-rna-intro />
    <api-doc-rna-generic />
  </div>
</template>

<script>
import ApiDocRNAIntro from '@/components/apiDoc/apiDocRNA/ApiDocRNAIntro'
import ApiDocRNAGeneric from '@/components/apiDoc/apiDocRNA/ApiDocRNAGeneric'

export default {
  name: 'ApiDocRNA',
  components: {
    'ApiDocRnaIntro': ApiDocRNAIntro,
    'ApiDocRnaGeneric': ApiDocRNAGeneric
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
