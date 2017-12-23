<template>
  <section class="api text-center">
    <div class="container">
      <div class="row">
        <div class="column">
          <p>Vous pouvez, si vous le souhaitez, interroger directement l'API Sirene qui est accessible à tous.</p>
          <a class="button" href="https://github.com/sgmap/sirene_as_api/blob/master/README.md">Voir la documentation</a>
        </div>
        <div class="column api__image">
          <img src="../../assets/img/man-at-desktop.svg" alt="" width="200" />
        </div>
        <div class="column">
          <p>Notre API est open-source, installez votre propre instance en récupérant les sources sur Github.</p>
          <a class="button" href="https://github.com/sgmap/sirene_as_api">Voir le code sur Github</a>
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

.api .column {
  min-width: 200px;
}

.api__image {
  margin: 2em 1em;
}
</style>
