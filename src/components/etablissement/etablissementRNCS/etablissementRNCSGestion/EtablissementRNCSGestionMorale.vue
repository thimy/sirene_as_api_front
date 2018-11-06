<template>
  <div class="company__managers">
    <div v-for="manager in managersLegal" :key=manager.id>
      <h5>{{ manager.qualite | ifExist | capitalize }}</h5>
      <panel-info-rncs :parent="manager" :elements=elementsToDisplay :inlineLabels="true" />
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
    </div>
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestionMorale',
  components: {
    'PanelInfoRncs': PanelInfoRNCS
  },
  data () {
    return {
      elementsToDisplay:
      {
        "Dénomination": "denomination",
        "Forme Juridique": "forme_juridique"
      },
      elementsToDisplayRepresentant :
      {
        "Représentant permanent, Adresse ligne 1": "representant_permanent_adresse_ligne_1",
        "Représentant permanent, Adresse ligne 2": "representant_permanent_adresse_ligne_2",
        "Représentant permanent, Adresse ligne 3": "representant_permanent_adresse_ligne_3",
        "Représentant permanent, Code postal": "representant_permanent_adresse_code_postal",
        "Représentant permanent, Ville": "representant_permanent_adresse_ville",
        "Représentant permanent, Code commune": "representant_permanent_adresse_code_commune",
        "Représentant permanent, Pays": "representant_permanent_adresse_pays",
        "Représentant permanent, Adresse ligne 3": "representant_permanent_adresse_ligne_3",
        "Représentant permanent, Nom": "representant_permanent_nom_patronyme",
        "Représentant permanent, Nom d’usage": "representant_permanent_nom_usage",
        "Représentant permanent, Prénoms": "representant_permanent_prenoms",
        "Représentant permanent, Date de naissance": "representant_permanent_date_naissance",
        "Représentant permanent, Ville de naissance": "representant_permanent_ville_naissance",
        "Représentant permanent, Pays de naissance": "representant_permanent_pays_naissance",
        "Représentant permanent, Nationalité": "representant_permanent_nationalite"
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
    }
  },
  mixins: [Filters, Formating]
}
</script>
