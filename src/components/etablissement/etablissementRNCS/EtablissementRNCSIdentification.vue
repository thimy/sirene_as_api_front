<template>
  <div class="company__panel panel">
    <h4>Personne morale</h4>
    <hr>
    <div class="company__item"><div class="company__item-key">Immatriculation RCS</div><div class="company__item-value">????</div></div>
    <div class="company__item"><div class="company__item-key">Date d'immatriculation</div><div class="company__item-value">{{ RNCSData.date_immatriculation | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Dénomination ou Raison sociale</div><div class="company__item-value">{{ RNCSLegal.denomination | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Forme juridique</div><div class="company__item-value">{{ RNCSLegal.forme_juridique | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Capital social</div><div class="company__item-value">{{ RNCSLegal.capital | ifExist }} €</div></div>
    <!-- <div class="company__item"><div class="company__item-key">Adresse du siège</div><div class="company__item-value">{{  | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Activités principales</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Durée personne morale</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date clotûre exercice social</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date clotûre 1er exercice social</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div> -->
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNCSIdentification',
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
    RNCSLegal () {
      return this.$store.getters.RNCSData.personne_morale
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
