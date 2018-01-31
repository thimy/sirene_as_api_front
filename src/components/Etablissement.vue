<template>
  <div class="company">

    <section class="section-white">
      <div class="container">
        <h2>{{result.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ result.siren }})</span></h2>
        <h4 class="company__industry"> {{ result.libelle_activite_principale_entreprise }}</h4>
      </div>
    </section>

    <section class="section-grey">
<<<<<<< 9f19c038ca8b532196222900cc70ea8c53126181
      <div class="container company-container">
        <etablissement-panel-contact></etablissement-panel-contact>
        <etablissement-panel-info></etablissement-panel-info>
      </div>
      <div class="container company-container__extra">
        <etablissement-panel-children></etablissement-panel-children>
      </div>
=======
      <etablissement-panel-self class="container company-container"></etablissement-panel-self>
      <etablissement-panel-children class="container company-container__extra"></etablissement-panel-children>
>>>>>>> Added children on page Etablissement
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'
<<<<<<< 9f19c038ca8b532196222900cc70ea8c53126181
import EtablissementPanelContact from '@/components/etablissement/EtablissementPanelContact'
import EtablissementPanelInfo from '@/components/etablissement/EtablissementPanelInfo'
=======
import EtablissementPanelSelf from '@/components/etablissement/EtablissementPanelSelf'
>>>>>>> Added children on page Etablissement
import EtablissementPanelChildren from '@/components/etablissement/EtablissementPanelChildren'

export default {
  name: 'Etablissement',
  components: {
<<<<<<< 9f19c038ca8b532196222900cc70ea8c53126181
    'EtablissementPanelContact': EtablissementPanelContact,
    'EtablissementPanelInfo': EtablissementPanelInfo,
=======
    'EtablissementPanelSelf': EtablissementPanelSelf,
>>>>>>> Added children on page Etablissement
    'EtablissementPanelChildren': EtablissementPanelChildren
  },
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.result.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.result.siren}`
      return `FR${tvaNumber}`
    },
    // Display nom only if present. Prenom is not required. Concatenate the two if presents.
    fullOwnerName () {
      const nomOwner = this.result.nom
      const prenomOwner = this.result.prenom
      if (!nomOwner) {
        return null
      }
      if (!prenomOwner) {
        return nomOwner
      } else {
        return `${nomOwner} ${prenomOwner}`
      }
    },
    formattedDate () {
      if (!this.result.date_creation) {
        return null
      }
      const year = this.result.date_creation.substring(0, 4)
      const month = this.result.date_creation.substring(4, 6)
      const day = this.result.date_creation.substring(6, 8)
      return `${day}/${month}/${year}`
    }
  },
  created () {
    this.etablissementPageSearch()
  },
  methods: {
    etablissementPageSearch () {
      this.$store.dispatch('hideSuggestions')
      this.$store.dispatch('executeSearchBySiret', this.$route.params.siret)
      // Search using the siren number derived from siret so we don't need to wait siret search results :
      const sirenFromSiret = this.$route.params.siret.substring(0, 9)
      this.$store.dispatch('executeSearchBySiren', sirenFromSiret)
    }
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchBySiret', this.$route.params.siret)
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-white {
    padding: 0;
  }

  .company__industry,
  .company__siren {
    color: $color-dark-grey;
  }

  .section-grey {
    padding: 0;
  }

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .company-container {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }

  .company-container__extra {
    @extend .company-container;
    padding-top: 0;
    margin-top: 0;
  }

  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
