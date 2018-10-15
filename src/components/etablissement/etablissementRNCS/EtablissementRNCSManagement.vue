<template>
  <div class="company__panel panel">
    <h4>RNCS - Gestionnaires</h4>
    <hr>
    <h5>Président :</h5>
    <div class="company__item"><div class="company__item-key">Nom et prénom</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date et lieu de naissance</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Nationalité</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Domicile Personnel</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <h5>Directeur Général:</h5>
    <div class="company__item"><div class="company__item-key">Nom et prénom</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date et lieu de naissance</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Nationalité</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Domicile Personnel</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNCSManagement',
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
