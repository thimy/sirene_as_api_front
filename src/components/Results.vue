<template>
  <div class="container">
    <loader v-if="resultsAreLoading"></loader>
    <server-error v-else-if="serverError"></server-error>
    <template v-else-if="isSearchNotEmpty">
      <h3>{{resultsNumberSentence}}</h3>
      <did-you-mean></did-you-mean>
      <ul>
        <li v-for="result in storedResultsEtablissements" :key="result.siret" class="panel">
          <router-link tag="div" :to="{ name: 'Etablissement', params: {searchId: result['siret']}}">
            <h4 class="title">{{result['nom_raison_sociale'] | capitalize | removeExtraChars}}</h4>
            <span class="subtitle" v-if="result['l2_normalisee']">{{result['l2_normalisee'] | capitalize | removeExtraChars }}</span>
            <p>{{result['libelle_activite_principale_entreprise']}}</p>
            <p>{{result['code_postal']}} {{result['libelle_commune'] | capitalize}}</p>
          </router-link>
        </li>
      </ul>
      <p v-if="showNoResultMessage">Aucun résultat trouvé</p>
      <paginate-module v-if="numberResults"></paginate-module>
    </template>
  </div>
</template>

<script>
import PaginateModule from '@/components/results/ResultsPaginateModule'
import DidYouMean from '@/components/results/ResultsDidYouMean'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'Results',
  components: {
    'PaginateModule': PaginateModule,
    'DidYouMean': DidYouMean,
    'Loader': Loader,
    'ServerError': ServerError
  },
  computed: {
    isSearchNotEmpty () {
      return this.$store.state.search.storedFullText !== ''
    },
    storedResultsEtablissements () {
      return this.$store.getters.storedResultsEtablissements
    },
    numberResults () {
      return this.$store.getters.numberResults
    },
    showNoResultMessage () {
      return this.numberResults === 0
    },
    resultsNumberSentence () {
      if (this.numberResults === undefined) {
        return ''
      }
      return `${this.numberResults} résultats pour "${this.$store.state.search.storedLastFullText}"`
    },
    resultsAreLoading () {
      return this.$store.state.application.resultsAreLoading
    },
    serverError () {
      return this.$store.state.application.error500
    }
  },
  beforeUpdate () {
    // If only one result, go to page Etablissement
    if (this.$store.getters.onlyOneResult) {
      this.$router.push({ name: 'Etablissement', params: {searchId: this.storedResultsEtablissements[0]['siret']} })
    }
    return
  },
  mixins: [Filters]
}

</script>

<style lang="scss" scoped>

  .title {
    display: inline;
    margin: 0.15em;
  }

  .subtitle {
    display: inline;
    margin-left: 5px;
    font-family: "Evolventa", "Trebuchet MS", sans-serif;
  }

  p {
    margin: 0.15em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2em 0;

    li:hover {
      background-color: $color-lightest-grey;
    }
  }

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .panel {
    margin-bottom: 2em;
    cursor: pointer;
    padding: 1em;
  }

</style>
