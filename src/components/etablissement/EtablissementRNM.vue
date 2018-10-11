<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-rnm-info/>
        <etablissement-rnm-contact/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNMInfo from '@/components/etablissement/etablissementRNM/EtablissementRNMInfo'
import EtablissementRNMContact from '@/components/etablissement/etablissementRNM/EtablissementRNMContact'

export default {
  name: 'EtablissementRNM',
  components: {
    'EtablissementRnmInfo': EtablissementRNMInfo,
    'EtablissementRnmContact': EtablissementRNMContact
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
