<template>
  <div class="company__panel panel">
    <h4>Observations</h4>
    <hr>
    <div v-for="observation in RNCSObservations" :key="observation.id">
      <div class="company__item"><div class="company__item-key">N° Observation</div><div class="company__item-value">{{ observation.numero | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Date d'ajout</div><div class="company__item-value">{{ observation.date_ajout | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Date de suppression</div><div class="company__item-value">{{ observation.date_suppression | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Texte</div><div class="company__item-value">{{ observation.texte | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Libellé dernière modification</div><div class="company__item-value">{{ observation.libelle_derniere_modification | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Greffe</div><div class="company__item-value">{{ nameFromCodeGreffe(observation.code_greffe) | capitalize | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">N° Gestion</div><div class="company__item-value">{{ observation.numero_gestion| ifExist }}</div></div>
      <hr>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Format from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSObservations',
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
    RNCSObservations () {
      return this.$store.getters.RNCSData.observations
    }
  },
  mixins: [Filters, Format]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
