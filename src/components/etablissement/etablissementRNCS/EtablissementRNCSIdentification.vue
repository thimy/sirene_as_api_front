<template>
  <div class="company__panel panel">
    <h4>Personne morale</h4>
    <hr>
    <div class="company__item"><div class="company__item-key">Code Greffe</div><div class="company__item-value">{{ RNCSData.code_greffe }}</div></div>
    <div class="company__item"><div class="company__item-key">Date d'immatriculation</div><div class="company__item-value">{{ RNCSData.date_immatriculation | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Dénomination ou Raison sociale</div><div class="company__item-value">{{ RNCSLegal.denomination | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Forme juridique</div><div class="company__item-value">{{ RNCSLegal.forme_juridique | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Capital social</div><div class="company__item-value">{{ RNCSLegal.capital | ifExist }} €</div></div>
    <div class="company__item"><div class="company__item-key">Adresse du siège</div><div class="company__item-value">TODO</div></div>
    <div class="company__item"><div class="company__item-key">Activités principales</div><div class="company__item-value">TODO</div></div>
    <div class="company__item"><div class="company__item-key">Durée personne morale</div><div class="company__item-value">{{ RNCSLegal.duree_pm | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date clotûre exercice social</div><div class="company__item-value">{{ RNCSLegal.date_cloture | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Date clotûre 1er exercice social</div><div class="company__item-value">TODO</div></div>
        "code_greffe": "9201",
    "nom_greffe": "Nanterre",
    "numero_gestion": "2017B00911",
    "siren": "825259625",
    "type_inscription": "P",
    "date_immatriculation": "2017-01-27",
    "date_premiere_immatriculation": "2017-01-27",
    "date_radiation": null,
    "date_transfert": null,
    "sans_activite": null,
    "date_debut_activite": null,
    "date_debut_premiere_activite": null,
    "date_cessation_activite": null,
    "date_derniere_modification": "2017-01-31",
    "libelle_derniere_modification": "Création",
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
    },
    RNCSRegistrationNumber () {
      return `${this.RNCSData.siren} R.C.S ${this.RNCSData.nom_greffe}`
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
