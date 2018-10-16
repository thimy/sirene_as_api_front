<template>
  <div class="company__panel panel">
    <h4>Autres informations</h4>
    <hr>
    <div class="company__item"><div class="company__item-key">Autres</div><div class="company__item-value">{{ this.resultRNCS | ifExist }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNCSInfos',
  computed: {
    resultRNCS () {
      return this.$store.getters.storedRNCS
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
