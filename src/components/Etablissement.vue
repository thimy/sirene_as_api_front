<template>
  <section class="section">
    <div class="container">
      <not-found v-if="isNotFound" />
      <server-error v-else-if="isError" />
      <template v-else>
        <etablissement-header :searchId=searchId />
        <blocks-skeleton v-if="RNCSIsComing"></blocks-skeleton>
        <template>
          <!-- <etablissement-sirene v-if=haveSireneInfo />
          <etablissement-rna v-if=haveRNAInfo :haveComponentTop=haveSireneInfo />
          <etablissement-rnm v-if=haveRNMInfo /> -->
          <etablissement-rncs v-if=haveRNCSInfo />
        </template>
        <div v-if=haveRNCSInfo class="company__extra">
          <div class="notification">
            <div>Ces informations sont issues du RNCS mis à jour le {{ RNCSUpdate }}.</div>
            <a class="button-outline secondary" target="_blank" v-bind:href="dataRequestURL" title="Accéder aux données brutes de cette entreprise">
              <img class="icon" src="@/assets/img/json.svg" alt="" />
              Accéder aux données JSON
            </a>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementRNA from '@/components/etablissement/EtablissementRNA'
import EtablissementRNM from '@/components/etablissement/EtablissementRNM'
import EtablissementRNCS from '@/components/etablissement/EtablissementRNCS'

import BlocksSkeleton from '@/components/etablissement/skeletons/BlocksSkeleton'

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
    'EtablissementRncs': EtablissementRNCS,
    'BlocksSkeleton': BlocksSkeleton
  },
  computed: {
    searchId () {
      return this.$route.params.searchId
    },
    isEtablissementLoading () {
      return this.$store.getters.mainAPISLoading
    },
    isNotFound () {
      return this.$store.getters.mainAPISNotFound
    },
    isError () {
      return this.$store.getters.mainAPISError
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
      } else {
        return false
      }
    },
    haveRNMInfo () {
      if (this.$store.getters.RNMAvailable) {
        return true
      }
    },
    haveRNCSInfo () {
      if (this.$store.getters.RNCSAvailable) {
        return true
      }
    },
    resultSirene () {
      if (this.haveSireneInfo) {
        return this.$store.getters.singlePageEtablissementSirene
      }
      return null
    },
    dataRequestURL () {
      if (this.resultSirene) {
        return `${process.env.BASE_ADDRESS_RNCS}${this.resultSirene.siren}`
      }
      return null
    },
    RNCSUpdate () {
      if (this.$store.getters.RNCSData) {
        return Filters.filters.frenchDateFormat(this.$store.getters.RNCSData.updated_at)
      }
      return null
    },
    RNCSIsComing () {
      if (!this.haveRNCSInfo && !this.$store.getters.isRNCSError) {
        return true
      }
      return false
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
    this.$store.commit('clearSirenResults')
    this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
  },
  mixins: [Filters, Formating],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  border-color: $color-grey;
  background-color: $color-lightest-grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .button-outline {
    flex-shrink: 0;
    margin-left: 1em;
  }
}

@media (max-width: $tablet) {
  .notification {
    flex-direction: column;

    .button-outline {
      margin-left: 0;
      margin-top: 1em;
    }
  }
}

.company__extra {
  margin-top: 2em;
}
</style>
