<template>
  <div class="company__panel panel">
    <etablissement-rncs-identification-morale v-if="RNCSLegal" />
    <etablissement-rncs-identification-physique v-if="RNCSPhysical" />
  </div>
</template>

<script>
import EtablissementRNCSPMorale from '@/components/etablissement/etablissementRNCS/etablissementRNCSIdentification/EtablissementRNCSPMorale'
import EtablissementRNCSPPhysique from '@/components/etablissement/etablissementRNCS/etablissementRNCSIdentification/EtablissementRNCSPPhysique'

export default {
  name: 'EtablissementRNCSIdentification',
  components: {
    'EtablissementRncsIdentificationMorale': EtablissementRNCSPMorale,
    'EtablissementRncsIdentificationPhysique': EtablissementRNCSPPhysique
  },
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
    RNCSLegal () {
      return this.$store.getters.RNCSData.personne_morale
    },
    RNCSPhysical () {
      return this.$store.getters.RNCSData.personne_physique
    }
    // RNCSRegistrationNumber () {
    //   return `${this.RNCSData.siren} R.C.S ${this.RNCSData.nom_greffe}`
    // }
  }
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
