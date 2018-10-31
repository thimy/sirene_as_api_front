<template>
  <div class="company__panel panel">
    <h4>Informations d'activité et d´établissement principal</h4>
    <panel-info-rncs :parent=RNCSData :elements=this.elementsToDisplay />
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'

export default {
  name: 'EtablissementRNCSInfos',
  components: { 'PanelInfoRncs': PanelInfoRNCS },
  data () {
    return {
      elementsToDisplay:
        {
          "Code Greffe": "code_greffe",
          "Nom Greffe": "nom_greffe",
          "Numero Gestion": "numero_gestion",
          "SIREN": "siren",
          "Type Inscription": "type_inscription",
          "Date Immatriculation": "date_immatriculation",
          "Date Première Immatriculation": "date_premiere_immatriculation",
          "Date de Radiation": "date_radiation",
          "Date de Transfert": "date_transfert",
          "Sans Activité": "sans_activite",
          "Date de début d'activité": "date_debut_activite",
          "Date de Début de Première Activité": "date_debut_premiere_activite",
          "Date de Cessation d'Activité": "date_cessation_activite",
          "Date de dernière modification":"date_derniere_modification",
          "Libéllé de dernière modification":"libelle_derniere_modification"
        }
    }
  },
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
  },
  mixins: [Filters]
}
</script>
