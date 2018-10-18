<template>
  <div class="company__panel panel">
    <div>
      <h4>Gestionnaires (Personnes physiques)</h4>
      <hr>
      <div v-for="manager in managersPhysical" :key=manager.id>
        <h5>{{ manager.qualite }}</h5>
        <div v-if="manager.nom" class="company__item">
          <div class="company__item-key">Nom</div>
          <div class="company__item-value">{{ manager.nom }}</div>
        </div>
        <div class="company__item">
          <div class="company__item-key">Date et lieu de naissance</div>
          <div class="company__item-value">{{ manager.date_naissance | ifExist }}<br/>{{ manager.ville_naissance | ifExist }}</div>
        </div>
        <div class="company__item">
          <div class="company__item-key">Nationalité</div>
          <div class="company__item-value">{{ manager.nationalite | ifExist }}</div>
        </div>
        <div class="company__item">
          <div class="company__item-key">Domicile Personnel</div>
          <div class="company__item-value">{{ RNCSConcatAddressLine1(manager) }}<br/>{{ RNCSConcatAddressLine2(manager) }}</div>
        </div>
      </div>
    </div>
    <div>
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
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Format from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSManagement',
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    },
    managersPhysical () {
      return this.managers.filter(manager => (manager.type_representant == 'P.Physique'))
    },
    managersLegal () {
      return this.managers.filter(manager => (manager.type_representant == 'P. Morale'))
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
