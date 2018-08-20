<template>
  <server-error class="container" v-if="isError"></server-error>
  <not-found class="container" v-else-if="isNotFound"></not-found>
  <loader class="container" v-else-if="isEtablissementLoading"></loader>
  <div v-else class="company">
    <etablissement-header></etablissement-header>
    <etablissement-sirene></etablissement-sirene>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'

export default {
  name: 'Etablissement',
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementSirene': EtablissementSirene,
    'EtablissementHeader': EtablissementHeader
},
  computed: {
    isEtablissementLoading () {
      return this.$store.getters.isEtablissementLoading
    },
    isNotFound () {
      return this.$store.state.application.noResultFound
    },
    isError () {
      return this.$store.state.application.error500
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
