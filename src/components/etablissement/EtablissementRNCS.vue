<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-rncs-identification/>
        <etablissement-rncs-activity/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-gestion-physique/>
        <etablissement-rncs-gestion-morale/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-observations/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSGestionPhysique from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionPhysique'
import EtablissementRNCSGestionMorale from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionMorale'
import EtablissementRNCSActivity from '@/components/etablissement/etablissementRNCS/EtablissementRNCSActivity'
import EtablissementRNCSObservations from '@/components/etablissement/etablissementRNCS/EtablissementRNCSObservations'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsGestionPhysique': EtablissementRNCSGestionPhysique,
    'EtablissementRncsGestionMorale': EtablissementRNCSGestionMorale,
    'EtablissementRncsActivity': EtablissementRNCSActivity,
    'EtablissementRncsObservations': EtablissementRNCSObservations,
  }
}
</script>

<style lang="scss" scoped>
  .section-grey {
    padding: 0;
  }

  .container {
    padding-bottom: 2em;
  }

  .company-container {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
