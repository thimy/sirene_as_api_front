<template>
  <div v-if="RNCSPhysical">
    <h4>Personne physique</h4>
    <div class="company__item-inline">
      <div class="company__item-key">Nom</div>
      <div class="company__item-value">{{ concatNames(RNCSPhysical.prenoms, RNCSPhysical.nom_usage, RNCSPhysical.nom_patronyme) }}</div>
    </div>
    <panel-info-rncs :parent="RNCSPhysical" :elements="elementsToDisplay1" />
    <div class="company__item-inline">
      <div class="company__item-key">Adresse :</div>
      <div class="company__item-value">
        <div v-if="RNCSPhysical.adresse_ligne_1">{{ RNCSPhysical.adresse_ligne_1 | ifExist }}</div>
        <div v-if="RNCSPhysical.adresse_ligne_2">{{ RNCSPhysical.adresse_ligne_2 }}</div>
        <div v-if="RNCSPhysical.adresse_ligne_3">{{ RNCSPhysical.adresse_ligne_3 }}</div>
        <div> {{ RNCSConcatAddress(RNCSPhysical) }}</div>
        <div v-if="RNCSPhysical.adresse_code_commune">Code Commune {{ RNCSPhysical.adresse_code_commune }}</div>
      </div>
    </div>
    <div class="company__item-inline">
      <div class="company__item-key">Nom du conjoint collaborateur</div>
      <div class="company__item-value">{{ concatNames(RNCSPhysical.conjoint_collab_nom_usage, RNCSPhysical.conjoint_collab_nom_usage, RNCSPhysical.conjoint_collab_nom_patronyme) }}</div>
    </div>
    <panel-info-inline-rncs :parent="RNCSPhysical" :elements="elementsToDisplay2" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import Formating from '@/components/mixins/formating'
import Filters from '@/components/mixins/filters'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS';

export default {
  name: 'EtablissementRNCSPPhysique',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS
  },
  data () {
    return {
      elementsToDisplay1:
      {
        "Pseudonyme": "pseudonyme",
        "Date de naissance": "date_naissance",
        "Ville de naissance": "ville_naissance",
        "Pays de naissance": "pays_naissance",
        "Nationalité": "nationalite"
      },
      elementsToDisplay2:
      {
        "Conjoint collaborateur, date de fin": "conjoint_collab_date_fin",
        "Conjoint collaborateur, Pseudonyme": "conjoint_collab_pseudonyme"
      }
    }
  },
  computed: {
    RNCSPhysical () {
      return this.$store.getters.RNCSData.personne_physique
    }
  },
  mixins: [Filters, Formating]
}
</script>