<template>
  <section class="api text-center">
    <div class="container">
      <div class="row">
        <div class="column">
          <p>Vous pouvez, si vous le souhaitez, interroger directement l'API Sirene</p>
          <router-link class="button" :to="{ name: 'ApiDoc'}">Documentation de l'API</router-link>
        </div>
        <div class="column api__image">
          <img src="../../assets/img/man-at-desktop.svg" alt="" width="200" />
        </div>
        <div class="column">
          <p>Téléchargez les données de référence Sirene sur le site data.gouv.fr</p>
          <a class="button" href="https://www.data.gouv.fr/reference">Données de référence</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Api'
}
</script>

<style lang="scss" scoped>
.api {
  background: $color-white;
  padding: 4em 0;
}

.api .column{
  min-width: 200px;
}

.api__image {
  margin: 0em 2em;
}

</style>
