<template>
  <div v-if="RNCSPhysical" class="company__panel panel">
    <h4>Personne physique</h4>
    <panel-info-rncs :parent="RNCSPhysical" :elements="elementsToDisplay" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'

export default {
  name: 'EtablissementRNCSPPhysique',
  components: { 'PanelInfoRncs': PanelInfoRNCS },
  data () {
    return {
      elementsToDisplay:
        {
          "Dénomination": "denomination",
          "Sigle": "sigle",
          "Forme Juridique": "forme_juridique",
          "Associé Unique":"associe_unique",
          "Activité Principale": "activite_principale",
          "Type Capital": "type_capital",
          "Capital": "capital",
          "Capital actuel": "capital_actuel",
          "Devise": "devise",
          "Date Clotûre": "date_cloture",
          "Date Clotûre Exceptionnelle": "date_cloture_exeptionnelle",
          "Economie Sociale Solidaire": "economie_sociale_solidaire",
          "Durée Personne Morale": "duree_pm",
          "Libellé Dernière Modification": "libelle_derniere_modification",
          "Date Dernière Modification": "date_derniere_modification",
          "Code Greffe": "code_greffe",
          "Numéro Gestion": "numero_gestion",
          "SIREN": "siren"
        }
    }
  },
  computed: {
    RNCSPhysical () {
      return this.$store.getters.RNCSData.personne_physique
    }
  }
}
</script>