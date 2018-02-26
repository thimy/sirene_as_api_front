<template>
  <div class="container">
    <loader v-if="resultsAreLoading"></loader>
    <server-error v-else-if="serverError"></server-error>
    <template v-else-if="isSearchNotEmpty">
      <div class="notification" v-if="informationMessage">
        {{informationMessage}}
        <button class="close" aria-label="Fermer"><svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg></button>
      </div>
      <h3>{{resultsNumberSentence}}</h3>
      <did-you-mean></did-you-mean>
      <ul>
        <li v-for="result in storedResultsEtablissements" :key="result.siret" class="panel">
          <router-link tag="div" :to="{ name: 'Etablissement', params: {searchId: result['siret']}}">
            <h4 class="title">{{result['nom_raison_sociale'] | capitalize | removeExtraChars}}</h4>
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
import DidYouMean from '@/components/results/ResultsDidYoumean'
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
    informationMessage () {
      return this.$store.getters.infoMessage
    },
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
      return (this.isLoading === false && this.numberResults === 0)
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
      this.$router.push({ name: 'Etablissement', params: {siret: this.storedResultsEtablissements[0]['siret']} })
    }
  },
  mixins: [Filters]
}

</script>

<style lang="scss" scoped>

  .title {
    margin: 0.15em;
  }

  p {
    margin: 0.15em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2em 0;
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
