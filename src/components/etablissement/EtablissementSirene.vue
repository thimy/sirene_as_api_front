<template>
  <div class="company">
    <section class="section-grey">
      <div class="container company-container">
        <etablissement-sirene-contact></etablissement-sirene-contact>
        <etablissement-sirene-info></etablissement-sirene-info>
      </div>
      <div class="container company-container company-container__extra">
        <etablissement-sirene-children></etablissement-sirene-children>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneContact from '@/components/etablissement/etablissementSirene/EtablissementSireneContact'
import EtablissementSireneInfo from '@/components/etablissement/etablissementSirene/EtablissementSireneInfo'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'

export default {
  name: 'EtablissementSirene',
  components: {
    'EtablissementSireneContact': EtablissementSireneContact,
    'EtablissementSireneInfo': EtablissementSireneInfo,
    'EtablissementSireneChildren': EtablissementSireneChildren
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
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

  @media (max-width: $tablet) {
    .company-container {
      flex-direction: column;
    }
  }
</style>
