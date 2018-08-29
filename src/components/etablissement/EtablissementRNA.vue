<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container" v-bind:class="{ no_top_padding: noTopPadding }">
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
  },
  data () {
    return {
      noTopPadding: this.haveComponentTop
    }
  },
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
    padding: 2em 0 2em 0;
  }

  .no_top_padding {
    padding: 0 0 2em 0;
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
