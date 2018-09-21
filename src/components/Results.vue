<template>
  <div class="container">
    <loader v-if="resultsAreLoading"></loader>
    <server-error v-else-if="serverError"></server-error>
    <template v-else>
      <results-sirene />
      <hr />
      <results-rna />
      <!-- paginate module on RNA and Sirene, so we use the bigger values -->
      <results-paginate-module :totalPages=biggerNumberPages></results-paginate-module>
    </template>
  </div>
</template>

<script>
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import ResultsSirene from '@/components/results/ResultsSirene'
import ResultsRNA from '@/components/results/ResultsRNA'
import ResultsPaginateModule from '@/components/results/ResultsPaginateModule'

export default {
  name: 'Results',
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'ResultsSirene': ResultsSirene,
    'ResultsRna': ResultsRNA,
    'ResultsPaginateModule': ResultsPaginateModule
  },
  computed: {
    resultsAreLoading () {
      return this.$store.state.application.isLoading['FULLTEXT']
    },
    serverError () {
      return this.$store.state.application.error500['FULLTEXT']
    },
    biggerNumberPages () {
      return Math.max(this.$store.getters.totalPageNumberSirene, this.$store.getters.totalPageNumberRNA)
    }
  },
  // Deactivated for now
  // beforeUpdate () {
  //   // If only one result, go to page Etablissement
  //   if (this.$store.getters.singleResult) {
  //     this.$router.push({ name: 'Etablissement', params: {searchId: this.$store.getters.singleResult} })
  //   }
  //   return
  // }
}

</script>

<style lang="scss" scoped>

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

</style>
