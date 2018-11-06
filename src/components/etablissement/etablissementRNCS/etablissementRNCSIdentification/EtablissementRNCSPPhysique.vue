<template>
  <div v-if="RNCSPhysical">
    <h4>Personne physique</h4>
    <div class="company__item">
      <div class="company__item-key">Nom</div>
      <div class="company__item-value">{{ concatNames(RNCSPhysical.prenoms, RNCSPhysical.nom_patronyme) }}</div>
    </div>
    <div v-if="RNCSPhysical.nom_usage" class="company__item">
      <div class="company__item-key">Nom d'usage</div>
      <div class="company__item-value">{{ RNCSPhysical.nom_usage | upperCase }}</div>
    </div>
    <panel-info-rncs :parent="RNCSPhysical" :elements="elementsToDisplay1" />
    <div class="company__item">
      <div class="company__item-key">Adresse :</div>
      <div class="company__item-value">
        <div v-if="RNCSPhysical.adresse_ligne_1">{{ RNCSPhysical.adresse_ligne_1 | ifExist }}</div>
        <div v-if="RNCSPhysical.adresse_ligne_2">{{ RNCSPhysical.adresse_ligne_2 }}</div>
        <div v-if="RNCSPhysical.adresse_ligne_3">{{ RNCSPhysical.adresse_ligne_3 }}</div>
        <div> {{ RNCSConcatAddress(RNCSPhysical) }}</div>
        <div v-if="RNCSPhysical.adresse_code_commune">Code Commune {{ RNCSPhysical.adresse_code_commune }}</div>
      </div>
    </div>
    <div v-if="collabName(RNCSPhysical)" class="company__item">
      <div class="company__item-key">Nom du conjoint collaborateur</div>
      <div class="company__item-value">{{ collabName(RNCSPhysical) }}</div>
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
        "Conjoint collaborateur, Nom d'usage": "conjoint_collab_nom_usage",
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
  methods: {
    collabName (person) {
      return Formating.methods.concatNames(person.conjoint_collab_prenoms, person.conjoint_collab_nom_patronyme)
    }
  },
  mixins: [Filters, Formating]
}
</script>