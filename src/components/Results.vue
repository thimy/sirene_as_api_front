<template>
  <div class="container">
    <div v-if="isSearchNotEmpty">
      <p>{{informationMessage}}</p>
      <ul>
        <li v-for="result in storedResultsEtablissements">
          <router-link tag="div" :to="{ name: 'Entreprise', params: {siret: result['siret']}}" id="result-box">
            <p class="title">{{result['nom_raison_sociale'] | capitalize }}</p>
            <p>{{result['libelle_activite_principale_entreprise']}}</p>
            <p>{{result['code_postal']}} {{result['libelle_commune'] | capitalize}}</p>
          </router-link>
        </li>
      </ul>
      <p v-if="numberResults === 0">Aucun résultat trouvé</p>
      <paginate-module></paginate-module>
    </div>
  </div>
</template>

<script>
import PaginateModule from '@/components/paginate/PaginateModule.vue'
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'Results',
  components: {
    'PaginateModule': PaginateModule
  },
  data () {
    return {
      noSearchWasMade: true
    }
  },
  computed: {
    informationMessage: function () {
      return this.$store.getters.infoMessage
    },
    isSearchNotEmpty: function () {
      return this.$store.state.storedFullText !== ''
    },
    storedResultsEtablissements () {
      return this.$store.getters.storedResultsEtablissements
    },
    numberResults () {
      return this.$store.getters.numberResults
    }
  },
  mixins: [Filters]
}

</script>

<style lang="scss" scoped>

  .title {
    font-weight: $fw-bold;
    font-size: $fs-medium;
  }

  p {
    font-weight: $fw-regular;
    font-size: $fs-normal;
    margin: 0.15em;
  }

  ul {
    list-style: none;
  }

  .container {
    padding-bottom: 1em;
  }

  #result-box {
    @extend %box-shadow;
    cursor: pointer;
    border: $border-color 1px solid;
    border-radius: $border-radius;
    background-color: $color-white;
    margin: 1.5em 0em 1.5em 0em;
    width: 100%;
    padding: 15px;
  }

  %box-shadow {
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  }

</style>
