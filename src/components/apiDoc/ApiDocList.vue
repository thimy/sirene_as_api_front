<template>
  <div>
    <section class="section-grey">
      <div class="container apis">
        <div class="description">
          <h2>L'API Sirene</h2>
          <p>
            L'API Sirene contient tous les établissements des entreprises françaises,
            ainsi que toutes les associations disposant d'un code SIRET.<br>
            Les données de l'API Sirene sont délivrées par l'INSEE.
          </p>
        </div>
        <router-link class="button" :to="{ name: 'ApiDocSirene'}">Documentation API Sirene</router-link>
      </div>
    </section>
    <section class="section-white">
      <div class="container apis">
        <div class="description">
          <h2>L'API Repertoire National des Associations (RNA)</h2>
          <p>
            Cette API contient toutes les associations françaises.<br>
            Les données proviennent du Ministère de l'Intérieur.
          </p>
        </div>
        <router-link class="button" :to="{ name: 'ApiDocRNA'}">Documentation API RNA</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ApiDocList'
}
</script>

<style lang="scss" scoped>

a.button {
  text-align: center;
  padding: 0.5em 0.5em;
  min-width: 280px;
  max-height: 1.2em;
}

.apis {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $tablet) {
    flex-direction: row;
    align-items: center;
  }
}

</style>
