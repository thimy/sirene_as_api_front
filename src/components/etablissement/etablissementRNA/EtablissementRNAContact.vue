<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">Adresse du siège :</div><div class="company__item-value"> {{ resultRNA.adresse_siege }}</div></div>
      <div class="company__item"><div class="company__item-key">Adresse établissement :</div><div class="company__item-value"> {{ this.l1_adress }}</div></div>
      <div class="company__item"><div class="company__item-key">Commune établissement :</div><div class="company__item-value"> {{ this.l2_adress }}</div></div>
      <div class="company__item"><div class="company__item-key">Siret :</div><div class="company__item-value"> {{ resultRNA.siret | ifExist }}</div></div>

    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNAContact',
  computed: {
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
    },
    l1_adress () {
      return `${this.resultRNA.adresse_numero_voie} ${this.resultRNA.adresse_type_voie.toLowerCase() } ${this.resultRNA.adresse_libelle_voie}`
    },
    l2_adress () {
      return `${this.resultRNA.adresse_code_postal} ${this.resultRNA.adresse_libelle_commune}`
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    // border: 2px solid $color-lighter-blue;
    border: 2px $color-light-pink solid;
  }
</style>
