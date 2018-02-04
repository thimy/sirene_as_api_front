<template>
  <div class="company__panel panel">
      <div class="company__item"><div class="company__item-key">Gérant</div><div class="company__item-value"> {{ fullOwnerName | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">Adresse</div><div class="company__item-value"> {{ result.l4_normalisee }} </div></div>
      <div class="company__item"><div class="company__item-key">Ville</div><div class="company__item-value"> {{ result.code_postal }} {{result.libelle_commune}}</div></div>
      <div class="company__item"><div class="company__item-key">Cedex</div><div class="company__item-value"> {{ result.cedex | ifExist}}</div></div>
      <div class="company__item"><div class="company__item-key">Date de création</div><div class="company__item-value"> {{ formattedDate }}</div></div>
      <div class="company__item"><div class="company__item-key">Téléphone</div><div class="company__item-value"> {{ result.telephone | ifExist}}</div></div>
      <div class="company__item"><div class="company__item-key">Email</div><div class="company__item-value"> {{ result.email | ifExist}}</div></div>
      <div class="company__item"><div class="company__item-key">Tranche d'effectif salariés</div><div class="company__item-value"> {{ result.libelle_tranche_effectif_salarie }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementPanelContact',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    // Display nom only if present. Prenom is not required. Concatenate the two if presents.
    fullOwnerName () {
      const nomOwner = this.result.nom
      const prenomOwner = this.result.prenom
      if (!nomOwner) {
        return ''
      }
      if (!prenomOwner) {
        return nomOwner
      } else {
        return `${nomOwner} ${prenomOwner}`
      }
    },
    formattedDate () {
      if (!this.result.date_creation) {
        return null
      }
      const year = this.result.date_creation.substring(0, 4)
      const month = this.result.date_creation.substring(4, 6)
      const day = this.result.date_creation.substring(6, 8)
      return `${day}/${month}/${year}`
    }
  },
  mixins: [Filters]
}
</script>