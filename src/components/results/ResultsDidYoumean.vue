<template>
  <div v-if="didYouMean">
    <h4> Essayez avec cette orthographe :
      <span class="did-you-mean" @click="didYouMeanSearch(didYouMean)">{{ didYouMean }}</span>
    </h4>
  </div>
</template>

<script>
export default {
  name: 'ResultsDidYoumean',
  computed: {
    didYouMean () {
      if (this.$store.getters.storedSpellcheck) {
        return this.$store.getters.storedSpellcheck
      }
      return null
    }
  },
  methods: {
    didYouMeanSearch (didYouMean) {
      this.$store.commit('setFullText', didYouMean)
      this.$store.dispatch('requestSearch')
    }
  }
}

</script>

<style lang="scss" scoped>
  .did-you-mean {
    font-weight: bolder;
    color: $color-light-blue;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
