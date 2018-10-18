<template>
  <div class="company__panel panel" >
    <h4>Observations</h4>
    <hr>
    <div class="iterate-over">
      <div class="iterated-over" v-for="observation in RNCSObservations" :key="observation.id">
        <div class="company__item"><div class="company__item-key">N° Observation</div><div class="company__item-value">{{ observation.numero | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Date d'ajout</div><div class="company__item-value">{{ observation.date_ajout | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Date de suppression</div><div class="company__item-value">{{ observation.date_suppression | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Texte</div><div class="company__item-value">{{ observation.texte | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Libellé dernière modification</div><div class="company__item-value">{{ observation.libelle_derniere_modification | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Greffe</div><div class="company__item-value">{{ nameFromCodeGreffe(observation.code_greffe) | capitalize | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">N° Gestion</div><div class="company__item-value">{{ observation.numero_gestion| ifExist }}</div></div>
      </div>
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

  .iterate-over {
    display:flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .iterated-over {
    background-color: $color-lightest-grey;
    padding: 10px;
    margin: 10px 0px 10px 0px;
    display: block;
    width: 100%;
    @media screen and (min-width: $desktop) {
      width: 47%;
    }
  }

</style>
