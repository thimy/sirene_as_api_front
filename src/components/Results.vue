<template>
  <div v-if="isThereResults" class="col justify-content-center">
    <h2 >Résultats :</h2>
    <ul>
      <li v-for="result in storedResultsEtablissements">
        {{ result['nom_raison_sociale'] }}
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store/store.js'

export default {
  name: 'Results',
  computed: {
    isThereResults: function () {
      return store.getters.storedResultsEtablissements !== null
    },
    storedResultsEtablissements () {
      return store.getters.storedResultsEtablissements
    }
  }
}

</script>

<style scoped>

</style>
