<template>
  <div class="company">
    <div class="company__main">
      <div class="title__block">
        <h2 v-if="haveSireneInfo">{{resultSirene.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ resultSirene.siren }})</span></h2>
        <h2 v-if="haveOnlyRNAInfo">{{resultRNA.titre}} <span class="association__id">({{ resultRNA.id_association }})</span></h2>

        <template v-if="haveSireneInfo">
          <div class="subtitle"> {{ resultSirene.l6_normalisee }}</div>
          <div class="second__subtitle"> {{ resultSirene.libelle_activite_principale_entreprise }}</div>
        </template>
        <div v-if="haveOnlyRNAInfo" class="second__subtitle"> {{ resultRNA.titre_court}}</div>
        <div class="company__buttons">
          <button class="button" title="Télécharger les données de cette entreprise au format PDF">
            <img class="icon" src="@/assets/img/download.svg" alt="" />
            Version imprimable
          </button>
        </div>
        <etablissement-sirene-children />
      </div>
      <etablissement-map v-if=haveSireneInfo :positionEtablissement='coordinates' :etablissement='this.resultSirene'/>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'
import EtablissementMap from '@/components/etablissement/EtablissementMap'

export default {
  name: 'EtablissementHeader',
  props: ['searchId'],
  components: {
    'EtablissementSireneChildren': EtablissementSireneChildren,
    'EtablissementMap': EtablissementMap
  },
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
    },
    haveOnlyRNAInfo () {
      return (!this.haveSireneInfo && this.haveRNAInfo)
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
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    },
    dataRequestURL () {
      return `${process.env.BASE_ADDRESS_RNCS}${this.resultSirene.siren}`
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .company__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #map {
    margin-left: 2em;
  }

  @media (max-width: $desktop) {
    .company__main {
      flex-direction: column;
    }

    #map {
      margin-left: 0;
    }
  }

  .company__buttons {
    margin-top: 1.5em;

    .button {
      padding: 0.5em 1em 0.6em;
      vertical-align: middle;
      margin-left: 0;
      margin-right: 1em;
      margin-top: 0.5em;
    }
  }

  h2 {
    margin: 0;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }

    margin: 2em 0;
  }

  .subtitle {
    font-size: 1.25em;
  }

  .second__subtitle {
    margin-top: 1em;
  }

  .company__siren,
  .second__subtitle {
    color: $color-darker-grey;

  }
</style>
