<template>
  <div v-if="managers.length" class="company__panel panel">
    <h4>Gestion, Direction, Administration, Contrôle, Associés ou Membres</h4>
    <div class="company__managers">
      <div v-for="manager in managersLegal" :key=manager.id>
        <h5>{{ manager.qualite | ifExist | capitalize }}</h5>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplayLegal1 :inlineLabels="true" />
        <div class="company__item-inline">
          <div class="company__item-key">SIREN</div>
          <div class="company__item-value">
            <router-link :to="{ name: 'Etablissement', params: {searchId: manager.siren_pm}}"> {{ manager.siren_pm }}</router-link>
          </div>
        </div>
        <div class="company__item-inline">
          <div class="company__item-key">Adresse</div>
          <div class="company__item-value">
            <div v-if="manager.adresse_ligne_1">{{ manager.adresse_ligne_1 | ifExist }}</div>
            <div v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
            <div v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
            <div> {{ RNCSConcatAddress(manager) }}</div>
          </div>
        </div>
        <div v-if="representName(manager)" class="company__item lower">
          <div class="company__item-key">Représentant Permanent :</div>
        </div>
        <div v-if="representName(manager)" class="company__item-inline">
          <div class="company__item-key">Nom</div>
          <div class="company__item-value">{{ representName(manager) }}</div>
        </div>
        <div v-if="representName(manager) && RNCSConcatAddressRP(manager)" class="company__item-inline">
          <div class="company__item-key">Adresse</div>
          <div class="company__item-value">
            <div>{{ manager.representant_permanent_adresse_ligne_1 | ifExist }}</div>
            <div v-if="manager.representant_permanent_adresse_ligne_2">{{ manager.representant_permanent_adresse_ligne_2 }}</div>
            <div v-if="manager.representant_permanent_adresse_ligne_3">{{ manager.representant_permanent_adresse_ligne_3 }}</div>
            <div> {{ RNCSConcatAddressRP(manager) }}</div>
          </div>
        </div>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplayLegal2 :inlineLabels="true" />
      </div>
      <div v-for="manager in managersPhysical" :key=manager.id>
        <h5>{{ manager.qualite | ifExist | capitalize }}</h5>
        <div class="company__item-inline">
          <div class="company__item-key">Nom</div>
          <div class="company__item-value">{{ concatNames(manager.prenoms, manager.nom_patronyme) }}</div>
        </div>
        <div v-if="manager.nom_usage" class="company__item-inline">
          <div class="company__item-key">Nom d’usage</div>
          <div class="company__item-value">{{ manager.nom_usage | upperCase }}</div>
        </div>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplayPhysical1 :inlineLabels="true" />
        <div class="company__item-inline">
          <div class="company__item-key">Adresse</div>
          <div class="company__item-value">
            <div>{{ manager.adresse_ligne_1 | ifExist }}</div>
            <div v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
            <div v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
            <div> {{ RNCSConcatAddress(manager) }}</div>
          </div>
        </div>
        <panel-info-rncs :parent="manager" :elements=elementsToDisplayPhysical2 :inlineLabels="true" />
        <div v-if="collabName(manager)" class="company__item-inline">
          <div class="company__item-key">Nom du conjoint collaborateur</div>
          <div class="company__item-value">{{ collabName(manager) }}</div>
        </div>
      </div>
    </div>
    <panel-no-results-rncs :ifNotPresent="managers" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS';
import PanelNoResultsRNCS from '@/components/templates/PanelNoResultsRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestion',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS,
    'PanelNoResultsRncs': PanelNoResultsRNCS
  },
  data () {
    return {
      elementsToDisplayLegal1:
      {
        "Dénomination": "denomination",
        "Forme Juridique": "forme_juridique"
      },
      // Following stuff is representant permanent
      elementsToDisplayLegal2 :
      {
        "Nom d’usage": "representant_permanent_nom_usage",
        "Date de naissance": "representant_permanent_date_naissance",
        "Ville de naissance": "representant_permanent_ville_naissance",
        "Pays de naissance": "representant_permanent_pays_naissance",
        "Nationalité": "representant_permanent_nationalite"
      },
      elementsToDisplayPhysical1:
      {
        "Pseudonyme": "pseudonyme",
        "Date de naissance": "date_naissance",
        "Ville de naissance": "ville_naissance",
        "Pays de naissance": "pays_naissance",
        "Nationalité": "nationalite",
      },
      elementsToDisplayPhysical2:
      {
        "Conjoint collaborateur, Nom d’usage":"conjoint_collab_nom_usage",
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
    managersLegal () {
      return this.managers.filter(manager => (
        manager.type_representant && RegExp(/morale/).test(manager.type_representant.toLowerCase())
      ))
    },
    managersPhysical () {
      return this.managers.filter(manager => (
        manager.type_representant && RegExp(/physique/).test(manager.type_representant.toLowerCase())
      ))
    }
  },
  methods: {
    collabName (person) {
      return Formating.methods.concatNames(person.conjoint_collab_prenoms, person.conjoint_collab_nom_patronyme)
    },
    representName (person) {
      return Formating.methods.concatNames(person.representant_permanent_nom_patronyme, person.representant_permanent_prenoms)
    }
  },
  mixins: [Filters, Formating]
}
</script>

<style lang="scss" scoped>
.lower {
  margin-top: 1.5em;
  margin-bottom: 1em;
}
</style>