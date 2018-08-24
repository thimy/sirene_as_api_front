<template>
  <div class="company">
    <section class="section-white">
      <div class="container">
        <div v-if="haveSireneInfo" class="title">
          <h2>{{resultSirene.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ resultSirene.siren }})</span></h2>
          <div class="subtitle"> {{ resultSirene.l2_normalisee }}</div>
          <h4 class="company__industry"> {{ resultSirene.libelle_activite_principale_entreprise }}</h4>
        </div>
        <div v-if="haveOnlyRNAInfo" class="title">
          <h2>{{resultRNA.titre}} <span class="association__id">({{ resultRNA.id_association }})</span></h2>
          <h4 class="company__industry"> {{ resultRNA.titre_court}}</h4>
        </div>
        <div class="tabs">
          <div class="api api__sirene">
            <h4>Base SIRENE</h4>
            <h5>Information disponible</h5>
            <h5>Dernière mise à jour : 01/08/2018</h5>
          </div>
          <div class="api api__rna">
            <h4>Base RNA</h4>
            <h5>Information disponible</h5>
            <h5>Dernière mise à jour : 05/08/2018</h5>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'EtablissementSirene',
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
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .api {
    margin: 5px 0 5px 0;
    padding: 10px;
    // width: 200px;
    height: 50px;
    h4, h5 {
      margin: 0;
    }
  }

  .api__sirene {
    background-color: $color-light-blue;

    h4, h5 {
      color: $color-white;
    }
  }

  .tabs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .api__rna {
    background-color: $color-light-pink;
    // background-color: $color-light-grey;
    // color: $color-darker-grey;

    h4, h5 {
      color: $color-white;
    }
  }
  .section-white {
    padding: 0;
    // display: flex;
  }

  .subtitle {
    font-size: 1.4em;
    font-family: "Evolventa", "Trebuchet MS", sans-serif;
  }

  .company__industry,
  .company__siren,
  .association__id {
    color: $color-dark-grey;
  }

  .container {
    display: flex;
    justify-content: space-between;
    padding-top: 2em;
    padding-bottom: 2em;
  }

</style>
