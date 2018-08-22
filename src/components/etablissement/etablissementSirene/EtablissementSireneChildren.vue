<template>
  <div class="company__panel panel">
    <div v-if="isSiegeSocial" class="company__item">
      <div class="company__item-key">Cet établissement est le siège social</div>
    </div>
    <div v-if="!isSiegeSocial" class="company__item">Siège social :
      <router-link tag="div" class="company__item-link" :to="{ name: 'Etablissement', params: {searchId: resultSiegeSocial.siret}}">
        {{ resultSiegeSocial.nom_raison_sociale | removeExtraChars }}
      </router-link>
    </div>
    <div v-if="haveChildrenEtablissements" class="company__item lineup">
      <div class="company__item-key">Etablissements enfants : {{ totalResultsOtherSirens }} résultats ({{ maxChildrenEtablissements }} affichés)</div>
      <template v-if="thereAreMoreThanMaxChildren">
        <div class="company__item-link" v-show="!visibleChildren" @click="showAllChildren">Afficher la totalité</div>
        <div class="company__item-link" v-show="visibleChildren" @click="hideAllChildren">Réduire</div>
      </template>
      <ul>
        <router-link tag="li"
                      class="company__item-link"
                      :to="{ name: 'Etablissement', params: {searchId: siret}}"
                      v-for="siret in resultOtherSirens"
                      :key="siret">
          {{ siret }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Constants from '@/constants.js'
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementSireneChildren',
  data () {
    return {
      maxChildrenEtablissementsToShow: Constants.ETABLISSEMENT_SHOW_MAX_CHILDREN_SIRETS,
      visibleChildren: false
    }
  },
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    resultSiegeSocial () {
      return this.$store.getters.storedSirenSiege || { siret: 0 }
    },
    resultOtherSirens () {
      const maxResults = this.maxChildrenEtablissementsToShow
      return this.$store.getters.storedSirenChildren.slice(0, this.maxChildrenEtablissementsToShow)
    },
    haveChildrenEtablissements () {
      return this.totalResultsOtherSirens >= 1
    },
    totalResultsOtherSirens () {
      // Total result minus Siege Social
      return this.$store.getters.storedSirenTotalResults - 1
    },
    maxChildrenEtablissements () {
      return Math.min(this.totalResultsOtherSirens, this.maxChildrenEtablissementsToShow)
    },
    isSiegeSocial () {
      if (!this.resultSirene) {
        return
      }
      if (this.resultSirene.is_siege == '1') {
        return true
      }
      return false
    },
    thereAreMoreThanMaxChildren () {
      return this.totalResultsOtherSirens >= this.maxChildrenEtablissementsToShow
    }
  },
  methods: {
    showAllChildren () {
      this.maxChildrenEtablissementsToShow = this.totalResultsOtherSirens
      this.visibleChildren = true
    },
    hideAllChildren () {
      this.maxChildrenEtablissementsToShow = Constants.ETABLISSEMENT_SHOW_MAX_CHILDREN_SIRETS
      this.visibleChildren = false
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    // width: 100%;
    border: 2px solid $color-lighter-blue;
  }
</style>
