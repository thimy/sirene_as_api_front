<template>
  <div class="company__panel panel">
    <h4>RNCS - Informations d'activité et d´établissement principal</h4>
    <hr>
    <div class="company__item"><div class="company__item-key">Adresse établissement</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Activité(s) exercée(s)</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date Commencement Activité</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Origine Fond Activité</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Mode d'Exploitation</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNCSInfos',
  computed: {
    resultRNCS () {
      return this.$store.getters.storedRNCS
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
