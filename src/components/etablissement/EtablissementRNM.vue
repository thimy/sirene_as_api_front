<template>
  <div class="company">
    <section class="etablissement__section-grey">
      <div class="container company-container company-container__header">
        <etablissement-rnm-header />
      </div>
      <div class="container company-container">
        <etablissement-rnm-contact/>
        <etablissement-rnm-info/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNMHeader from '@/components/etablissement/etablissementRNM/EtablissementRNMHeader'
import EtablissementRNMInfo from '@/components/etablissement/etablissementRNM/EtablissementRNMInfo'
import EtablissementRNMContact from '@/components/etablissement/etablissementRNM/EtablissementRNMContact'

export default {
  name: 'EtablissementRNM',
  components: {
    'EtablissementRnmHeader': EtablissementRNMHeader,
    'EtablissementRnmInfo': EtablissementRNMInfo,
    'EtablissementRnmContact': EtablissementRNMContact
  }
}
</script>