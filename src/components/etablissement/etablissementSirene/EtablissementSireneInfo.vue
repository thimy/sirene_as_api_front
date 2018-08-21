<template>
  <div class="company__panel panel">
    <ul class="company__info-list">
      <div class="company__item"><div class="company__item-key">SIRET</div><div class="company__item-value"> {{ result.siret }}</div></div>
      <div class="company__item"><div class="company__item-key">SIREN</div><div class="company__item-value"> {{ result.siren }}</div></div>
      <div class="company__item"><div class="company__item-key">Clef NIC</div><div class="company__item-value"> {{ result.nic }}</div></div>
      <div class="company__item"><div class="company__item-key">Activité principale Etablissement</div><div class="company__item-value"> {{ result.activite_principale }} - {{ result.libelle_activite_principale }}</div></div>
      <div class="company__item"><div class="company__item-key">Activité principale Entreprise</div><div class="company__item-value"> {{ result.activite_principale_entreprise }} - {{ result.libelle_activite_principale_entreprise }}</div></div>
      <div class="company__item"><div class="company__item-key">Nature juridique</div><div class="company__item-value"> {{ result.libelle_nature_juridique_entreprise | ifExist }}</div></div>
      <div class="company__item"><div class="company__item-key">N° TVA Intracommunautaire</div><div class="company__item-value"> {{ tvaIntracommunautaire }}</div></div>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementSireneInfo',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.result.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.result.siren}`
      return `FR${tvaNumber}`
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px solid $color-lighter-blue;
    // border: 2px $color-light-pink solid;
  }
</style>
