<template>
  <div class="company__panel panel">
    <div v-if="isSiegeSocial" class="company__item">
      <div class="company__item-key">Cet établissement est le siège social</div>
    </div>
    <div v-if="!isSiegeSocial" class="company__item">Siège social :
      <router-link tag="div" class="company__item-link" :to="{ name: 'Etablissement', params: {siret: resultSiegeSocial.siret}}">
        {{ resultSiegeSocial.nom_raison_sociale }}
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
                      :to="{ name: 'Etablissement', params: {siret: siret}}"
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

export default {
  name: 'EtablissementPanelChildren',
  data () {
    return {
      maxChildrenEtablissementsToShow: Constants.ETABLISSEMENT_SHOW_MAX_CHILDREN_SIRETS,
      visibleChildren: false
    }
  },
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
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
      if (!this.result || !this.$store.getters.storedSirenSiege) {
        return
      }
      const siretCurrent = this.result.siret
      const siretSiegeSocial = this.$store.getters.storedSirenSiege.siret
      if (siretCurrent === siretSiegeSocial) {
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
  }
}
</script>
