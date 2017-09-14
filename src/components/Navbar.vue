<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/">
        <span v-on:click="clearHomepage">
          <img class="logo" src="../assets/img/logo.svg" alt="entreprise.data.gouv.fr" />
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    clearHomepage () {
      this.$store.commit('setFullText', '')
      this.$store.commit('changeWelcomeTextVisibility', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    border-bottom: 1px solid $border-color;
    position: fixed;
    width: 100%;
    top: 0;
    background: $color-white;
    height: $nav-height;
    display: flex;
    align-items: center;
    z-index: 100;
  }

  .logo {
    height: 30px;
  }
</style>
