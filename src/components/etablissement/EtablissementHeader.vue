<template>
  <div class="company">
    <section class="section-white">
      <div class="container">
        <h2>{{result.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ result.siren }})</span></h2>
        <div class="subtitle"> {{ result.l2_normalisee }}</div>
        <h4 class="company__industry"> {{ result.libelle_activite_principale_entreprise }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'

export default {
  name: 'EtablissementSirene',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
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

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

</style>
