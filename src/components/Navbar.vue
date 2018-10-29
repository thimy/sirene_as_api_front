<template>
  <header class="navbar" role="navigation">
    <div class="navbar__container">
      <a v-on:click="clearHomepage" class="navbar__home">
        <img class="navbar__logo" src="../assets/img/entreprise.svg" alt="entreprise.data.gouv.fr" />
      </a>
    </div>
  </header>
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
