<template>
  <div class="public-administration">
    <div class="container">
        <p>
          Vous êtes une administration publique ?<br />
          Demandez votre accès spécial à l'API pour obtenir des informations supplémentaires sur les sociétés.
        </p>
        <a class="button">Demander un accès</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PublicAdministration'
}
</script>

<style lang="scss" scoped>
.public-administration {
  padding: 4em;
  text-align: center;
}

.public-administration .button {
  margin-top: 2em;
}

</style>
