<template>
  <div class="company__panel panel">
    <h4>Contact</h4>
    <hr>
    <div class="company__item"><div class="company__item-key">Nom</div><div class="company__item-value">{{ this.resultRNM.NOM | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Adresse</div><div class="company__item-value">{{ this.resultRNM.ADDRESSE | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Complément d'adresse</div><div class="company__item-value">{{ this.resultRNM.COMPLEMENT | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Code postal</div><div class="company__item-value">{{ this.resultRNM.CP | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Commune</div><div class="company__item-value">{{ this.resultRNM.COMMUNE | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Departement</div><div class="company__item-value">{{ this.resultRNM.DEPT | ifExist }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNMContact',
  computed: {
    resultRNM () {
      return this.$store.getters.RNMData
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-green solid;
  }
</style>
