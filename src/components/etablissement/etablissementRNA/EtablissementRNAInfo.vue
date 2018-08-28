<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">Numéro RNA :</div><div class="company__item-value"> {{ resultRNA.id_association }}</div></div>
      <div class="company__item"><div class="company__item-key">Ancien Numéro RNA :</div><div class="company__item-value"> {{ resultRNA.id_ex_association | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Objet :</div><div class="company__item-value"> {{ resultRNA.objet | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Siret :</div><div class="company__item-value"> {{ resultRNA.siret | ifExist }}</div></div>

    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNAInfo',
  computed: {
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
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
