<template>
  <div class="container">
    <section class="section-white">
      <h1>Documentation de l'API Sirene</h1>
      <h2>Qu'est-ce que l'API Sirene ?</h2>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LegalNotes',
  created() {
    this.$store.dispatch('hideWelcomeText')
  }
}

</script>

<style lang="scss" scoped>

</style>
