<template>
  <div v-if="managers.length" class="company__panel panel">
    <h4>Gestion, Direction, Administration, Contrôle, Associés ou Membres</h4>
    <etablissement-rncs-gestion-morale />
    <etablissement-rncs-gestion-physique />
    <panel-no-results-rncs :ifNotPresent="managers" />
  </div>
</template>

<script>
import EtablissementRNCSGestionMorale from '@/components/etablissement/etablissementRNCS/etablissementRNCSGestion/EtablissementRNCSGestionMorale'
import EtablissementRNCSGestionPhysique from '@/components/etablissement/etablissementRNCS/etablissementRNCSGestion/EtablissementRNCSGestionPhysique'
import PanelNoResultsRNCS from '@/components/templates/PanelNoResultsRNCS'

export default {
  name: 'EtablissementRNCSGestion',
  components: {
    'EtablissementRncsGestionMorale': EtablissementRNCSGestionMorale,
    'EtablissementRncsGestionPhysique': EtablissementRNCSGestionPhysique,
    'PanelNoResultsRncs': PanelNoResultsRNCS
  },
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    }
  }
}
</script>
