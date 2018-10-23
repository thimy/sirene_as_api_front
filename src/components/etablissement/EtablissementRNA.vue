<template>
  <div class="company">
    <section class="etablissement__section-grey">
      <div class="container company-container company-container__header">
        <etablissement-rna-header />
      </div>
      <div class="container company-container padding_top" v-bind:class="{ no_top_padding: this.haveComponentTop }">
        <etablissement-rna-contact/>
        <etablissement-rna-info/>
      </div>
    </section>
  </div>
</template>

<script>
import EtablissementRNAHeader from '@/components/etablissement/etablissementRNA/EtablissementRNAHeader'
import EtablissementRNAInfo from '@/components/etablissement/etablissementRNA/EtablissementRNAInfo'
import EtablissementRNAContact from '@/components/etablissement/etablissementRNA/EtablissementRNAContact'

export default {
  name: 'EtablissementRNA',
  props: ['haveComponentTop'],
  components: {
    'EtablissementRnaHeader': EtablissementRNAHeader,
    'EtablissementRnaInfo': EtablissementRNAInfo,
    'EtablissementRnaContact': EtablissementRNAContact
  }
}
</script>