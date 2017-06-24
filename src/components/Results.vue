<template>
  <div v-if="isSearchNotEmpty" class="col justify-content-center">
    <h2 >Résultats ({{numberResults}}) :</h2>
    <ul>
      <li v-for="result in storedResultsEtablissements">
        {{ result['nom_raison_sociale'] }}
      </li>
    </ul>
    <p v-if="numberResults === 0">Aucun résultat trouvé</p>
    <!-- {{debugSeeAllEtablissements}}
    {{debugSeeResponseStatus}} -->
  </div>
</template>

<script>
import store from '../store/store.js'

export default {
  name: 'Results',
  computed: {
    isSearchNotEmpty: function () {
      return store.state.storedFullText !== ''
    },
    storedResultsEtablissements () {
      return store.getters.storedResultsEtablissements
    },
    numberResults () {
      return store.getters.numberResults
    // },
    // debugSeeAllEtablissements () {
    //   return store.state.storedResults
    // },
    // debugSeeResponseStatus () {
    //   return store.state.storedStatus
    }
  }
}

</script>

<style scoped>

</style>
