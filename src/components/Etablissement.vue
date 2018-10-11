<template>
  <server-error class="container" v-if="isError" />
  <not-found class="container" v-else-if="isNotFound" />
  <loader class="container" v-else-if="isEtablissementLoading" />
  <div v-else class="company">
    <etablissement-header />
    <etablissement-sirene v-if=haveSireneInfo />
    <etablissement-rna v-if=haveRNAInfo :haveComponentTop=haveSireneInfo />
    <etablissement-rnm v-if=haveSireneInfo />
    <div v-if=haveSireneInfo class="container company-container company-container__map">
      <etablissement-map :positionEtablissement='coordinates' :etablissement='this.resultSirene'/>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementRNA from '@/components/etablissement/EtablissementRNA'
import EtablissementRNM from '@/components/etablissement/EtablissementRNM'
import EtablissementMap from '@/components/etablissement/EtablissementMap'

export default {
  name: 'Etablissement',
  metaInfo () {
    return {
      title: this.titleEtablissement()
    }
  },
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementHeader': EtablissementHeader,
    'EtablissementSirene': EtablissementSirene,
    'EtablissementRna': EtablissementRNA,
    'EtablissementRnm': EtablissementRNM,
    'EtablissementMap': EtablissementMap
  },
  computed: {
    isEtablissementLoading () {
      return this.$store.getters.isEtablissementLoading
    },
    isNotFound () {
      const mainSearch = this.$store.getters.mainSearch
      if (mainSearch && this.$store.state.application.noResultFound[mainSearch] == true) {
        return true
      }
      return false
    },
    isError () {
      const mainSearch = this.$store.getters.mainSearch
      if (mainSearch && this.$store.state.application.error500[mainSearch] == true) {
        return true
      }
      return false
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
      }
    },
    mainSearch () {
      return this.$store.getters.mainSearch
    },
    resultSirene () {
      if (this.haveSireneInfo) {
        return this.$store.getters.singlePageEtablissementSirene
      }
      return null
    },
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    }
  },
  methods: {
    titleEtablissement () {
      if (this.haveSireneInfo) {
        return `Etablissement ${
          Filters.filters.removeExtraChars(this.$store.getters.singlePageEtablissementSirene.nom_raison_sociale
        )}`
      } else if (this.haveRNAInfo) {
        return `Association ${this.$store.getters.singlePageEtablissementRNA.titre}`
      } else {
        return 'Etablissement'
      }
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
  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .company-container__map {
    padding-top: 0;
    margin-top: 0;
  }
</style>
