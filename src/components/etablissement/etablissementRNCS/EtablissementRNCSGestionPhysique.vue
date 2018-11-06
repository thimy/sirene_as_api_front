<template>
  <div v-if="managersPhysical.length" class="company__panel panel">
    <h4>Représentants Légaux - Personnes physiques</h4>
    <div class="company__managers">
      <div v-for="manager in managersPhysical" :key=manager.id>
        <h5>{{ manager.qualite | capitalize }}</h5>
        <div class="company__item-inline">
          <div class="company__item-key">Nom</div>
          <div class="company__item-value">{{ concatNames(manager.prenoms, manager.nom_patronyme) }}</div>
        </div>
        <div v-if="manager.nom_usage" class="company__item-inline">
          <div class="company__item-key">Nom d'usage</div>
          <div class="company__item-value">{{ manager.nom_usage | upperCase }}</div>
        </div>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplay :inlineLabels="true" />
        <div class="company__item-inline">
          <div class="company__item-key">Adresse</div>
          <div class="company__item-value">
            <div>{{ manager.adresse_ligne_1 | ifExist }}</div>
            <div v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
            <div v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
            <div> {{ RNCSConcatAddress(manager) }}</div>
          </div>
        </div>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplay2 :inlineLabels="true" />
        <div v-if="collabName(manager)" class="company__item-inline">
          <div class="company__item-key">Nom du conjoint collaborateur</div>
          <div class="company__item-value">{{ collabName(manager) }}</div>
        </div>
      </div>
    </div>
    <panel-no-results-rncs :ifNotPresent="managersPhysical" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelNoResultsRNCS from '@/components/templates/PanelNoResultsRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestionPhysique',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelNoResultsRncs': PanelNoResultsRNCS
  },
  data () {
    return {
      elementsToDisplay:
        {
          "Pseudonyme": "pseudonyme",
          "Date de naissance": "date_naissance",
          "Ville de naissance": "ville_naissance",
          "Pays de naissance": "pays_naissance",
          "Nationalité": "nationalite",
        },
        elementsToDisplay2: {
          "Conjoint collaborateur, Nom d'usage":"conjoint_collab_nom_usage",
          "Conjoint collaborateur, Date de Fin":"conjoint_collab_date_fin",
          "Conjoint collaborateur, Nom":"conjoint_collab_nom_patronyme",
          "Conjoint collaborateur, Pseudonyme":"conjoint_collab_pseudonyme",
          "Conjoint collaborateur, Prénoms":"conjoint_collab_prénoms"
        }
    }
  },
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    },
    managersPhysical () {
      return this.managers.filter(manager => (
        manager.type_representant && RegExp(/physique/).test(manager.type_representant.toLowerCase())
      ))
    },
    noManagersPhysical () {
      if (this.managersPhysical && this.managersPhysical.length != 0) {
        return false
      }
      return true
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
