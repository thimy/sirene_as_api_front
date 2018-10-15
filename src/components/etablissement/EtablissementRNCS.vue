<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-rncs-identification/>
        <etablissement-rncs-management/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-activity/>
        <etablissement-rncs-others/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSManagement from '@/components/etablissement/etablissementRNCS/EtablissementRNCSManagement'
import EtablissementRNCSActivity from '@/components/etablissement/etablissementRNCS/EtablissementRNCSActivity'
import EtablissementRNCSOthers from '@/components/etablissement/etablissementRNCS/EtablissementRNCSOthers'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsManagement': EtablissementRNCSManagement,
    'EtablissementRncsActivity': EtablissementRNCSActivity,
    'EtablissementRncsOthers': EtablissementRNCSOthers,
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
