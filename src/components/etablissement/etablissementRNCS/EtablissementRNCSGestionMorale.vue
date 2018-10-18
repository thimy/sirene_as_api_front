<template>
  <div v-if=thereAreManagersLegal class="company__panel panel">
    <h4>Gestionnaires (Personnes morales)</h4>
    <hr>
    <div v-for="manager in managersLegal" :key=manager.id>
      <h5>{{ manager.qualite }}</h5>
      <div class="company__item">
        <div class="company__item-key">Dénomination</div>
        <div class="company__item-value">{{ manager.denomination | ifExist }}</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">Siren</div>
        <div class="company__item-value">{{ manager.siren | ifExist }}<br/>{{ manager.ville_naissance | ifExist }}</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">Adresse</div>
        <div class="company__item-value">{{ RNCSConcatAddressLine1(manager) }}<br/>{{ RNCSConcatAddressLine2(manager) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Format from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestionMorale',
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    },
    managersLegal () {
      return this.managers.filter(manager => (manager.type_representant == 'P. Morale'))
    },
    thereAreManagersLegal () {
      if (this.managersLegal) {
        return this.managersLegal.length > 0
      }
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
