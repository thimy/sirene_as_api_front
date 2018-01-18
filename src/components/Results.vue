<template>
  <div class="container">
    <template v-if="isSearchNotEmpty">
      <div class="notification" v-if="informationMessage">
        {{informationMessage}}
        <button class="close" aria-label="Fermer"><svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg></button>
      </div>
      <h3>{{resultsNumberSentence}}</h3>
      <ul>
        <li v-for="result in storedResultsEtablissements" class="panel">
          <router-link tag="div" :to="{ name: 'Etablissement', params: {siret: result['siret']}}">
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
import PaginateModule from '@/components/paginate/PaginateModule.vue'
import Filters from '@/components/mixins/filters.js'
import debounce from 'lodash/debounce'

export default {
  name: 'Results',
  components: {
    'PaginateModule': PaginateModule
  },
  // data () {
  //   return {
  //     noSearchWasMade: true
  //   }
  // },
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
    showNoResultMessage: debounce(function () {
      this.numberResults === 0
    }, 200), // Wait 200 ms not finding any result before saying there are no results
    resultsNumberSentence () {
      if (this.numberResults === undefined) {
        return ''
      }
      const results = this.numberResults > 1 ? 'résultats'
                                             : 'résultat'

      return `${this.numberResults} ${results} pour "${this.$store.state.search.storedLastFullText}"`
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
