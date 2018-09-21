<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container padding_top" v-bind:class="{ no_top_padding: this.haveComponentTop }">
        <etablissement-rna-info></etablissement-rna-info>
        <etablissement-rna-contact></etablissement-rna-contact>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementRNAInfo from '@/components/etablissement/etablissementRNA/EtablissementRNAInfo'
import EtablissementRNAContact from '@/components/etablissement/etablissementRNA/EtablissementRNAContact'

export default {
  name: 'EtablissementRNA',
  props: ['haveComponentTop'],
  components: {
    'EtablissementRnaInfo': EtablissementRNAInfo,
    'EtablissementRnaContact': EtablissementRNAContact
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
    padding-bottom: 2em;
  }

  .padding_top {
    padding-top: 2em;
  }

  .no_top_padding {
    padding-top: 0;
  }

  .company-container {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
