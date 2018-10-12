<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container padding_top" v-bind:class="{ no_top_padding: this.haveComponentTop }">
        <etablissement-rna-contact/>
        <etablissement-rna-info/>
      </div>
    </section>
  </div>
</template>

<script>
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

  @media screen and (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
