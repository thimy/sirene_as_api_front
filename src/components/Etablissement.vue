<template>
  <server-error class="container" v-if="isError"></server-error>
  <not-found class="container" v-else-if="isNotFound"></not-found>
  <loader class="container" v-else-if="isEtablissementLoading"></loader>
  <div v-else class="company">
    <etablissement-header></etablissement-header>
    <etablissement-sirene v-if="haveSireneInfo"></etablissement-sirene>
    <etablissement-rna v-if="haveRNAInfo" :haveComponentTop=haveSireneInfo></etablissement-rna>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementRNA from '@/components/etablissement/EtablissementRNA'

export default {
  name: 'Etablissement',
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementHeader': EtablissementHeader,
    'EtablissementSirene': EtablissementSirene,
    'EtablissementRna': EtablissementRNA
  },
  computed: {
    isEtablissementLoading () {
      return this.$store.getters.isEtablissementLoading
    },
    isNotFound () {
      const mainSearch = this.$store.getters.mainSearch
      if (this.$store.state.application.noResultFound[mainSearch] == true) {
        return true
      }
      return false
    },
    isError () {
      const mainSearch = this.$store.getters.mainSearch
      if (this.$store.state.application.error500[mainSearch] == true) {
        return true
      }
      return false
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
      }
    },
    mainSearch () {
      return this.$store.getters.mainSearch
    }
  },
  beforeCreate () {
    this.$store.commit('setStoredSuggestions', '')
    this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
