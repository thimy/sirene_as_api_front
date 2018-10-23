<template>
  <div class="company__panel panel">
    <h2>Base RNCS</h2>
    <p>Information Disponible</p>
    <p>Dernière mise à jour : 2017-05-17</p>
  </div>
</template>

<script>

export default {
  name: 'EtablissementRNCSHeader'
}
</script>

<style lang="scss" scoped>
  h2, p {
    margin: auto;
  }
  .panel {
    border: 2px $color-light-orange solid;
    padding: 16px;
    text-align: center;
  }
</style>
