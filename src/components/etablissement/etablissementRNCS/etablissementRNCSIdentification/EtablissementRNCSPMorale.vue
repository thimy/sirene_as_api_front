<template>
  <div v-if="RNCSLegal">
    <h4>Identification de la Personne Morale</h4>
    <panel-info-rncs class="company__item" :parent=RNCSLegal :elements=this.elementsToDisplay1 />
     <div class="company__item">
      <div class="company__item-key">Informations capital</div>
      <div class="company__item-value"> {{ RNCSDeviseSentence(this.RNCSLegal) }}</div>
    </div>
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSPMorale',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS
  },
  data () {
    return {
      elementsToDisplay1:
      {
        "Dénomination": "denomination",
        "Sigle": "sigle",
        "SIREN": "siren",
        "Forme juridique": "forme_juridique",
        "Associé unique":"associe_unique",
        "Activité principale": "activite_principale"
      }
    }
  },
  computed: {
    RNCSLegal () {
      return this.$store.getters.RNCSData.personne_morale
    }
  },
  mixins: [Filters, Formating]
}
</script>