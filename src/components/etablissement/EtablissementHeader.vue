<template>
  <div class="company">
    <section class="section-white">
      <div class="container">
        <div class="title__block">
          <h2 v-if="haveSireneInfo" >{{resultSirene.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ resultSirene.siren }})</span></h2>
          <h2 v-if="haveOnlyRNAInfo">{{resultRNA.titre}} <span class="association__id">({{ resultRNA.id_association }})</span></h2>
          <div v-if="haveSireneInfo" class="subtitle"> {{ resultSirene.l2_normalisee }}</div>
          <h4 v-if="haveSireneInfo" class="second__subtitle"> {{ resultSirene.libelle_activite_principale_entreprise }}</h4>
          <h4 v-if="haveOnlyRNAInfo" class="second__subtitle"> {{ resultRNA.titre_court}}</h4>
        </div>
        <div class="tabs">
          <div class="tabs__pair">
            <div v-if="haveSireneInfo" class="api api__sirene">
              <h4>Base SIRENE</h4>
              <h5>Information disponible</h5>
              <h5>Dernière mise à jour : {{ this.lastUpdateSirene }}</h5>
            </div>
            <div v-else class="api api__unavailable">
              <h4>Base SIRENE</h4>
              <h5>empty</h5>
              <h5>Non disponible</h5>
            </div>
            <div class="api api__rnm">
              <h4>Base RNM</h4>
              <h5>Information disponible</h5>
              <h5>Dernière mise à jour : aujourd'hui</h5>
            </div>
          </div>
          <div class="tabs__pair">
            <div v-if="haveRNAInfo" class="api api__rna">
              <h4>Base RNA</h4>
              <h5>Information disponible</h5>
              <h5>Dernière mise à jour : {{ this.lastUpdateRNA }}</h5>
            </div>
            <div v-else class="api api__unavailable">
              <h4>Base RNA</h4>
              <h5>empty</h5>
              <h5>Non disponible</h5>
            </div>
            <div class="api api__rncs">
              <h4>Base RNCS (KBIS)</h4>
              <h5>Information disponible</h5>
              <h5>Dernière mise à jour : aujourd'hui</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'EtablissementHeader',
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
      return this.$store.getters.sireneAvailable
    },
    haveRNAInfo () {
      return this.$store.getters.RNAAvailable
    },
    lastUpdateSirene () {
      if (this.resultSirene.updated_at) {
        return this.resultSirene.updated_at.substring(0, 10)
      }
    },
    lastUpdateRNA () {
      if (this.resultRNA.updated_at) {
        return this.resultRNA.updated_at.substring(0, 10)
      }
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 2em;
    padding-bottom: 2em;
    @media screen and (max-width: $desktop) {
      flex-direction: column;
    }
  }

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
  }

  .title__block {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 50%;
    @media screen and (max-width: $desktop) {
      max-width: 100%;
    }
  }

  .tabs__pair {
    display: flex;
    flex-direction: column;
  }

  .api {
    margin: 5px;
    padding: 10px;
    color: $color-white;
    h4, h5 {
      margin: 0;
    }
  }

  .api:last-child {
    white-space: nowrap;
  }

  .api__sirene {
    background-color: $color-light-blue;
  }

  .api__rna {
    background-color: $color-light-pink;
  }

  .api__rnm {
    background-color: $color-green;
  }

  .api__rncs {
    background-color: $color-orange;
  }

  .api__unavailable {
    background-color: $color-light-grey;
    color: $color-darker-grey;
  }

  .no_wrap {
    white-space: nowrap;
  }

  .section-white {
    padding: 0;
  }

  .subtitle {
    font-size: 1.4em;
    font-family: "Evolventa", "Trebuchet MS", sans-serif;
  }

  .second__subtitle {
    font-size: 1em;
  }

  .company__siren,
  .second__subtitle {
    color: $color-dark-grey;
  }
</style>
