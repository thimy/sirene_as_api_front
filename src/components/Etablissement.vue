<template>
  <server-error class="container" v-if="isError"></server-error>
  <not-found class="container" v-else-if="isNotFound"></not-found>
  <loader class="container" v-else-if="isEtablissementLoading"></loader>
  <div v-else class="company">
    <section class="section-white">
      <div class="container">
        <h2>{{result.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ result.siren }})</span></h2>
        <div class="subtitle"> {{ result.l2_normalisee }}</div>
        <h4 class="company__industry"> {{ result.libelle_activite_principale_entreprise }}</h4>
      </div>
    </section>

    <section class="section-grey">
      <div class="container company-container">
        <etablissement-panel-contact></etablissement-panel-contact>
        <etablissement-panel-info></etablissement-panel-info>
      </div>
      <div class="container company-container__extra">
        <etablissement-panel-children></etablissement-panel-children>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementPanelContact from '@/components/etablissement/EtablissementPanelContact'
import EtablissementPanelInfo from '@/components/etablissement/EtablissementPanelInfo'
import EtablissementPanelChildren from '@/components/etablissement/EtablissementPanelChildren'

export default {
  name: 'Etablissement',
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementPanelContact': EtablissementPanelContact,
    'EtablissementPanelInfo': EtablissementPanelInfo,
    'EtablissementPanelChildren': EtablissementPanelChildren
  },
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
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
  .section-white {
    padding: 0;
  }

  .subtitle {
    font-size: 1.4em;
    font-family: "Evolventa", "Trebuchet MS", sans-serif;
  }

  .company__industry,
  .company__siren {
    color: $color-dark-grey;
  }

  .section-grey {
    padding: 0;
  }

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .company-container {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }

  .company-container__extra {
    @extend .company-container;
    padding-top: 0;
    margin-top: 0;
  }

  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
