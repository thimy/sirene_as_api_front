<template>
  <nav class="nav">
    <div class="nav__container">
      <a v-on:click="clearHomepage" class="nav__link">
        <img class="nav__logo" src="../assets/img/entreprise.svg" alt="entreprise.data.gouv.fr" />
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    clearHomepage () {
      this.$store.dispatch('goToClearedHomePage')
  }}
}
</script>

<style lang="scss" scoped>
</style>
