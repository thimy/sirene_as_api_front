<template>
  <div v-if="isSearchNotEmpty" class="col justify-content-center">
    <h2 >Résultats ({{numberResults}}) :</h2>
    <paginate-module></paginate-module>
    <ul>
      <li v-for="result in storedResultsEtablissements">
        {{ result['nom_raison_sociale'] }}
      </li>
    </ul>
    <p v-if="numberResults === 0">Aucun résultat trouvé</p>
    <!-- {{debugSeeAllEtablissements}} -->
    <!-- {{debugSeeResponseStatus}} -->
  </div>
</template>

<script>
import store from '../store/store.js'
import PaginateModule from './paginate/PaginateModule.vue'

export default {
  name: 'Results',
  components: {
    'PaginateModule': PaginateModule
  },
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
