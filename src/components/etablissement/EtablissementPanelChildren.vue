<template>
<<<<<<< 9f19c038ca8b532196222900cc70ea8c53126181
  <div class="panel">
    <div v-if="isSiegeSocial" class="company__item">
      <div class="company__item-key">Cet établissement est le siège social</div>
    </div>
    <div v-if="!isSiegeSocial" class="company__item">Siège social :
      <router-link tag="div" class="company__item-link" :to="{ name: 'Etablissement', params: {siret: resultSiegeSocial.siret}}">
        {{ resultSiegeSocial.nom_raison_sociale }}
      </router-link>
    </div>
    <div v-if="haveChildrenEtablissements" class="company__item lineup">
        <div class="company__item-key">Etablissements enfants : {{ totalResultsOtherSirens }} résultats ({{ maxChildrenEtablissementsToShow }} affichés)</div>
        <div class="company__item-link" v-if="!visibleChildren" @click="showAllChildren">Afficher la totalité</div>
        <div class="company__item-link" v-if="visibleChildren" @click="hideAllChildren">Réduire</div>
      <ul>
        <router-link tag="li"
                      class="company__item-link"
                      :to="{ name: 'Etablissement', params: {siret: siret}}"
                      v-for="siret in resultOtherSirens"
                      :key="siret">
          {{ siret }}
        </router-link>
      </ul>
=======
  <div>
    <div class="panel">
      <div v-if="isSiegeSocial" class="company__item">
        <div class="company__item-key">Cet établissement est le siège social</div>
      </div>
      <div v-if="!isSiegeSocial" class="company__item">Siège social :
        <router-link tag="div" class="company__item-link" :to="{ name: 'Etablissement', params: {siret: resultSiegeSocial.siret}}">
          {{ resultSiegeSocial.nom_raison_sociale }}
        </router-link>
      </div>
      <div v-if="haveChildrenEtablissements" class="company__item lineup">
          <div class="company__item-key">Etablissements enfants : {{ totalResultsOtherSirens }} résultats ({{ maxChildrenEtablissementsToShow }} affichés)</div>
          <div class="company__item-link" v-if="!visibleChildren" @click="showAllChildren">Afficher la totalité</div>
          <div class="company__item-link" v-if="visibleChildren" @click="hideAllChildren">Réduire</div>
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
>>>>>>> Added children on page Etablissement
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
      return this.$store.getters.storedSirenSiege
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
<<<<<<< 9f19c038ca8b532196222900cc70ea8c53126181
</script>
=======
</script>

<style lang="scss" scoped>

  .panel {
    margin: 0 1em;
    width: 100%;
  }

  .company__item {
    margin-bottom: 1em;
  }

  .company__item-key {
    display: block;
    color: $color-dark-grey;
    margin-right: 1em;
  }

  .company__item-link {
    cursor: pointer;
    color: $color-blue;
  }

  .lineup {
    display: flex;
    flex-direction: column;;
  }

  .lineup li {
    display: inline-block;
    padding: 2px 5px 2px 5px;
  }

  .lineup li::before {
    content: '\00a0\2022\00a0\00a0';
  }

  .panel:first-child {
    margin-left: 0;
  }

  .panel:last-child {
    margin-right: 0;
  }

  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }

    .panel {
      margin-left: 0;
      margin-right: 0;
      width: auto;
    }

    .panel:first-child {
      margin-bottom: 2em;
    }
  }
</style>
>>>>>>> Added children on page Etablissement
