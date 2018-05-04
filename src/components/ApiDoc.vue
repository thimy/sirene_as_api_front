<template>
  <div>
    <api-doc-intro></api-doc-intro>
    <api-doc-generic></api-doc-generic>
    <api-doc-example :baseAdress=baseAdress></api-doc-example>
    <api-doc-better-searches></api-doc-better-searches>
    <api-doc-use-case :baseAdress=baseAdress></api-doc-use-case>
    <api-doc-others></api-doc-others>
    <api-doc-outro></api-doc-outro>
  </div>
</template>

<script>
import ApiDocIntro from '@/components/apiDoc/ApiDocIntro'
import ApiDocGeneric from '@/components/apiDoc/ApiDocGeneric'
import ApiDocExample from '@/components/apiDoc/ApiDocExample'
import ApiDocBetterSearches from '@/components/apiDoc/ApiDocBetterSearches'
import ApiDocUseCase from '@/components/apiDoc/ApiDocUseCase'
import ApiDocOthers from '@/components/apiDoc/ApiDocOthers'
import ApiDocOutro from '@/components/apiDoc/ApiDocOutro'

export default {
  name: 'ApiDoc',
  components: {
    'ApiDocIntro': ApiDocIntro,
    'ApiDocGeneric': ApiDocGeneric,
    'ApiDocExample': ApiDocExample,
    'ApiDocBetterSearches': ApiDocBetterSearches,
    'ApiDocUseCase': ApiDocUseCase,
    'ApiDocOthers': ApiDocOthers,
    'ApiDocOutro': ApiDocOutro
  },
  data () {
    return {
      baseAdress: "https://sirene.entreprise.api.gouv.fr/v1/"
    }
  },
  created() {
    this.$store.dispatch('hideWelcomeText')
  }
}

</script>
