<template>
  <div>
    <api-doc-intro></api-doc-intro>
    <api-doc-generic></api-doc-generic>
    <api-doc-example :baseAdress=baseAdress></api-doc-example>
    <api-doc-better-searches></api-doc-better-searches>
    <api-doc-geospace :baseAdress=baseAdress></api-doc-geospace>
    <api-doc-use-case :baseAdress=baseAdress></api-doc-use-case>
    <api-doc-others></api-doc-others>
    <api-doc-outro></api-doc-outro>
  </div>
</template>

<script>
import ApiDocIntro from '@/components/apiDocSirene/ApiDocIntro'
import ApiDocGeneric from '@/components/apiDocSirene/ApiDocGeneric'
import ApiDocExample from '@/components/apiDocSirene/ApiDocExample'
import ApiDocBetterSearches from '@/components/apiDocSirene/ApiDocBetterSearches'
import ApiDocGeospace from '@/components/apiDocSirene/ApiDocGeospace'
import ApiDocUseCase from '@/components/apiDocSirene/ApiDocUseCase'
import ApiDocOthers from '@/components/apiDocSirene/ApiDocOthers'
import ApiDocOutro from '@/components/apiDocSirene/ApiDocOutro'

export default {
  name: 'ApiDoc',
  components: {
    'ApiDocIntro': ApiDocIntro,
    'ApiDocGeneric': ApiDocGeneric,
    'ApiDocExample': ApiDocExample,
    'ApiDocBetterSearches': ApiDocBetterSearches,
    'ApiDocGeospace': ApiDocGeospace,
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
