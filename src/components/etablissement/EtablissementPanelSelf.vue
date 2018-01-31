<template>
  <div>
    <div class="panel">
        <div class="company__item"><div class="company__item-key">Gérant</div><div class="company__item-value"> {{ fullOwnerName | ifExist }}</div></div>
        <div class="company__item"><div class="company__item-key">Adresse</div><div class="company__item-value"> {{ result.l4_normalisee }} </div></div>
        <div class="company__item"><div class="company__item-key">Ville</div><div class="company__item-value"> {{ result.code_postal }} {{result.libelle_commune}}</div></div>
        <div class="company__item"><div class="company__item-key">Cedex</div><div class="company__item-value"> {{ result.cedex | ifExist}}</div></div>
        <div class="company__item"><div class="company__item-key">Date de création</div><div class="company__item-value"> {{ formattedDate }}</div></div>
        <div class="company__item"><div class="company__item-key">Téléphone</div><div class="company__item-value"> {{ result.telephone | ifExist}}</div></div>
        <div class="company__item"><div class="company__item-key">Email</div><div class="company__item-value"> {{ result.email | ifExist}}</div></div>
        <div class="company__item"><div class="company__item-key">Tranche d'effectif salariés</div><div class="company__item-value"> {{ result.libelle_tranche_effectif_salarie }}</div></div>
    </div>
    <div class="panel">
      <ul class="company__info-list">
        <div class="company__item"><div class="company__item-key">Siret</div><div class="company__item-value"> {{ result.siret }}</div></div>
        <div class="company__item"><div class="company__item-key">Siren</div><div class="company__item-value"> {{ result.siren }}</div></div>
        <div class="company__item"><div class="company__item-key">Clef NIC</div><div class="company__item-value"> {{ result.nic }}</div></div>
        <div class="company__item"><div class="company__item-key">Activité principale</div><div class="company__item-value"> {{ result.activite_principale_entreprise }} - {{ result.libelle_activite_principale_entreprise }}</div></div>
        <div class="company__item"><div class="company__item-key">N° TVA Intracommunautaire</div><div class="company__item-value"> {{ tvaIntracommunautaire }}</div></div>
      </ul>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementPanelSelf',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.result.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.result.siren}`
      return `FR${tvaNumber}`
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

<style lang="scss" scoped>

  .company__item {
    margin-bottom: 1em;
  }

  .company__item-key {
    display: block;
    color: $color-dark-grey;
    margin-right: 1em;
  }

  .panel {
    margin: 0 1em;
    width: 100%;
  }

  .panel:first-child {
    margin-left: 0;
  }

  .panel:last-child {
    margin-right: 0;
  }

  @media (max-width: $tablet) {
    .panel {
      margin-left: 0;
      margin-right: 0;
      width: auto;
    }

    .panel:first-child {
      margin-bottom: 2em;
    }
  }

</style>
