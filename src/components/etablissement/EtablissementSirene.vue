<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-sirene-contact></etablissement-sirene-contact>
        <etablissement-sirene-info></etablissement-sirene-info>
      </div>
      <div class="container company-container company-container__extra">
        <etablissement-sirene-children></etablissement-sirene-children>
      </div>
      <div class="container company-container company-container__map">
        <etablissement-sirene-map :positionEtablissement='coordinates' :etablissement='this.resultSirene'></etablissement-sirene-map>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneContact from '@/components/etablissement/etablissementSirene/EtablissementSireneContact'
import EtablissementSireneInfo from '@/components/etablissement/etablissementSirene/EtablissementSireneInfo'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'
import EtablissementSireneMap from '@/components/etablissement/etablissementSirene/EtablissementSireneMap'

export default {
  name: 'EtablissementSirene',
  components: {
    'EtablissementSireneContact': EtablissementSireneContact,
    'EtablissementSireneInfo': EtablissementSireneInfo,
    'EtablissementSireneChildren': EtablissementSireneChildren,
    'EtablissementSireneMap': EtablissementSireneMap
  },
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    }
  },
  mixins: [Filters]
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
    padding-top: 0;
    margin-top: 0;
  }

  .company-container__map {
    padding-top: 0;
    margin-top: 0;
  }


  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
