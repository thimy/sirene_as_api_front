<template>
  <div class="company">
    <div class="company-container">
      <etablissement-rncs-identification/>
      <etablissement-rncs-registration/>
    </div>
    <etablissement-rncs-gestion-physique/>
    <etablissement-rncs-gestion-morale/>
    <etablissement-rncs-observations/>
  </div>
</template>

<script>
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSGestionPhysique from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionPhysique'
import EtablissementRNCSGestionMorale from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionMorale'
import EtablissementRNCSRegistration from '@/components/etablissement/etablissementRNCS/EtablissementRNCSRegistration'
import EtablissementRNCSObservations from '@/components/etablissement/etablissementRNCS/EtablissementRNCSObservations'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsGestionPhysique': EtablissementRNCSGestionPhysique,
    'EtablissementRncsGestionMorale': EtablissementRNCSGestionMorale,
    'EtablissementRncsRegistration': EtablissementRNCSRegistration,
    'EtablissementRncsObservations': EtablissementRNCSObservations,
  }
}
</script>

<style lang="scss" scoped>
  .company-container .panel + .panel {
    margin-left: 2em;
  }

  @media (max-width: $tablet) {
    .company-container .panel + .panel {
      margin-left: 0;
    }
  }
</style>
