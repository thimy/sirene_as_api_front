<template>
  <div class="api">
    <div class="container">
      <div class="api__call">
        <p>Vous pouvez, si vous le souhaitez, interroger directement l'API Sirene qui est accessible à tous.</p>
        <a class="button">Voir la documentation</a>
      </div>
      <div class="api__image">
        <img src="../../assets/img/man-at-desktop.svg" alt="" width="200" />
      </div>
      <div class="api__source">
        <p>Notre API est open-source, installez votre propre instance en récupérant les sources sur Github.</p>
        <a class="button">Voir le code sur Github</a>
      </div>
    </div>
  </div>
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

.api .container {
  display: flex;
}

.api .container div {
  text-align: center;
}

.api .button {
  margin-top: 2em;
}

.api__image {
  margin: 0 2em;
}

</style>
