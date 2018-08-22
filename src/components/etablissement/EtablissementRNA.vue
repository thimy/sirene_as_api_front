<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-rna-info></etablissement-rna-info>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementRNAInfo from '@/components/etablissement/etablissementRNA/EtablissementRNAInfo'

export default {
  name: 'EtablissementSirene',
  components: {
    'EtablissementRNAInfo': EtablissementRNAInfo
  }
}
</script>

<style lang="scss" scoped>
  .section-white {
    padding: 0;
  }

  .subtitle {
    font-size: 1.4em;
    font-family: "Evolventa", "Trebuchet MS", sans-serif;
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
    padding-top: 0;
    margin-top: 0;
  }

  .company-container__map {
    padding-top: 0;
    margin-top: 0;
  }


  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
