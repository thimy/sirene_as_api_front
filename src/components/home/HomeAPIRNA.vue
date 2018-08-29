<template>
  <section class="api text-center">
    <div class="container">
      <div class="row">
        <div class="column">
          <p><strong>Nouveau :</strong> L'API du Répertoire National des Associations est disponible !</p>
          <router-link class="button" :to="{ name: 'ApiDocRNA'}">Documentation API RNA</router-link>
        </div>
        <div class="column">
          <p>Téléchargez les données de référence RNA sur le site data.gouv.fr</p>
          <a class="button" href="https://www.data.gouv.fr/en/datasets/repertoire-national-des-associations/">Données de référence</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeAPIRNA'
}
</script>

<style lang="scss" scoped>
a.button {
  padding: 0.5em 0.5em;
  min-width: 260px;
}

.api {
  background: $color-white;
  padding: 3em 0 3em 0;
}

.api .column{
  min-width: 200px;
}

.api__image {
  margin: 0em 2em;
}

</style>
