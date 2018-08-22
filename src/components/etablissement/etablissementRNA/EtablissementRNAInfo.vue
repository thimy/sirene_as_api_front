<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">SIRET</div><div class="company__item-value"> {{ resultSirene.siret }}</div></div>
      <div class="company__item"><div class="company__item-key">SIREN</div><div class="company__item-value"> {{ resultSirene.siren }}</div></div>
      <div class="company__item"><div class="company__item-key">Clef NIC</div><div class="company__item-value"> {{ resultSirene.nic }}</div></div>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNAInfo',
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
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
