<template>
  <div v-if="RNCSObservations.length" class="company__panel panel" >
    <h4>Observations</h4>
    <div class="comment" v-for="observation in RNCSObservations" :key="observation.id">
      <div class="company__item"><div class="company__item-key">Date d'ajout</div><div class="company__item-value">{{ observation.date_ajout | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Texte</div><div class="company__item-value">{{ observation.texte | ifExist }}</div></div>
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
  .comment {
    background-color: $color-lightest-grey;
    padding: 1em;
    display: block;
    width: 100%;
  }

  .comment + .comment {
    margin-top: 2em;
  } 

</style>
