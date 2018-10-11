<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">Nom :</div></div>
      <div class="company__item"><div class="company__item-key">Adresse :</div></div>
      <div class="company__item"><div class="company__item-key">Complément d'adresse :</div></div>
      <div class="company__item"><div class="company__item-key">Code postal : :</div></div>
      <div class="company__item"><div class="company__item-key">Commune :</div></div>
      <div class="company__item"><div class="company__item-key">Departement :</div></div>
      <div class="company__item"><div class="company__item-key">Nom :</div></div>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNMContact'
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-green solid;
  }
</style>
