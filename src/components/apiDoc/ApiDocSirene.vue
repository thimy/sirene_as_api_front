<template>
  <div>
    <api-doc-intro/>
    <api-doc-generic/>
    <api-doc-example :baseAdress=baseAdress />
    <api-doc-better-searches/>
    <api-doc-geospace :baseAdress=baseAdress />
    <api-doc-use-case :baseAdress=baseAdress />
    <api-doc-others/>
    <api-doc-outro/>
  </div>
</template>

<script>
import ApiDocIntro from '@/components/apiDoc/apiDocSirene/ApiDocIntro'
import ApiDocGeneric from '@/components/apiDoc/apiDocSirene/ApiDocGeneric'
import ApiDocExample from '@/components/apiDoc/apiDocSirene/ApiDocExample'
import ApiDocBetterSearches from '@/components/apiDoc/apiDocSirene/ApiDocBetterSearches'
import ApiDocGeospace from '@/components/apiDoc/apiDocSirene/ApiDocGeospace'
import ApiDocUseCase from '@/components/apiDoc/apiDocSirene/ApiDocUseCase'
import ApiDocOthers from '@/components/apiDoc/apiDocSirene/ApiDocOthers'
import ApiDocOutro from '@/components/apiDoc/apiDocSirene/ApiDocOutro'

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
