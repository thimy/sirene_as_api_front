<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-rncs-identification/>
        <etablissement-rncs-activity/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-management/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-observations/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSManagement from '@/components/etablissement/etablissementRNCS/EtablissementRNCSManagement'
import EtablissementRNCSActivity from '@/components/etablissement/etablissementRNCS/EtablissementRNCSActivity'
import EtablissementRNCSObservations from '@/components/etablissement/etablissementRNCS/EtablissementRNCSObservations'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsManagement': EtablissementRNCSManagement,
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
