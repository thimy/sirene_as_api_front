<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/">
        <img class="logo" src="../assets/img/logo.svg" alt="entreprise.data.gouv.fr" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
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
  }

  .logo {
    height: 30px;
  }
</style>
