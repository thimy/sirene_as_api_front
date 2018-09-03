<template>
  <div>
    <api-doc-rna-intro />
    <api-doc-rna-generic />
    <api-doc-rna-endpoints :baseAdress=baseAdress />
    <api-doc-rna-coming-soon />
  </div>
</template>

<script>
import ApiDocRNAIntro from '@/components/apiDoc/apiDocRNA/ApiDocRNAIntro'
import ApiDocRNAGeneric from '@/components/apiDoc/apiDocRNA/ApiDocRNAGeneric'
import ApiDocRNAEndpoints from '@/components/apiDoc/apiDocRNA/ApiDocRNAEndpoints'
import ApiDocRNAComingSoon from '@/components/apiDoc/apiDocRNA/ApiDocRNAComingSoon'

export default {
  name: 'ApiDocRNA',
  components: {
    'ApiDocRnaIntro': ApiDocRNAIntro,
    'ApiDocRnaGeneric': ApiDocRNAGeneric,
    'ApiDocRnaEndpoints': ApiDocRNAEndpoints,
    'ApiDocRnaComingSoon': ApiDocRNAComingSoon
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
