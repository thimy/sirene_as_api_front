<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">Domaine d'activité (NAR20) :</div></div>
      <div class="company__item"><div class="company__item-key">Activité d'Artisanat (NAFA) :</div></div>
      <div class="company__item"><div class="company__item-key">Qualification :</div></div>
      <div class="company__item"><div class="company__item-key">Date Immatriculation : :</div></div>
      <div class="company__item"><div class="company__item-key">Date Radiation :</div></div>
      <div class="company__item"><div class="company__item-key">Code Forme Juridique :</div></div>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNMInfos'
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-green solid;
  }
</style>
