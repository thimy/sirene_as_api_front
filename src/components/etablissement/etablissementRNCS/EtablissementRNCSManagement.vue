<template>
  <div class="company__panel panel">
    <div>
      <h4>Gestionnaires (Personnes physiques)</h4>
      <hr>
      <div v-for="manager in managersPhysical" :key=manager.id>
        <h5>{{ manager.qualite }}</h5>
        <div class="company__item">
          <div class="company__item-key">Nom et prénom(s)</div>
          <div class="company__item-value">{{ concatNom(manager) | ifExist }}</div>
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
          <div class="company__item-value">{{ concatAddress1(manager) }}<br/>{{ concatAddress2(manager) }}</div>
        </div>
      </div>
    </div>
    <div>
      <h4>RNCS - Gestionnaires (Personnes morales)</h4>
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
          <div class="company__item-value">{{ concatAddress1(manager) }}<br/>{{ concatAddress2(manager) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

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
  methods: {
    concatNom: (manager) => {
      return Filters.methods.concatIfExist(manager.nom_patronyme, manager.prenoms, ' ')
    },
    concatAddress1: (manager) => {
      let address = manager.adresse_ligne_1
      address = Filters.methods.concatIfExist(address, manager.adresse_ligne_2)
      address = Filters.methods.concatIfExist(address, manager.adresse_ligne_3)
      return address
    },
    concatAddress2: (manager) => {
      let address = ''
      address = Filters.methods.concatIfExist(address, manager.adresse_code_postal)
      address = Filters.methods.concatIfExist(address, manager.adresse_ville)
      address = Filters.methods.concatIfExist(address, manager.adresse_pays)
      return address
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
