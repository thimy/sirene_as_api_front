<template>
  <div v-if="isSearchNotEmpty" class="justify-content-center">
    <h2 class="justify-content-center">Résultats ({{numberResults}}) :</h2>
    <paginate-module></paginate-module>
    <ul>
      <li v-for="result in storedResultsEtablissements">
        <b>{{ result['nom_raison_sociale'] }}</b> ({{ result['code_postal'] }}) - {{ result['activite_principale'] }}
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
