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
    <section class="section-grey">
      <div class="container apis">
        <div class="description">
          <h2>L'API Répertoire National des Métiers (RNM)</h2>
          <p>
            L'API RNM vous est gracieusement ouverte par les Chambres et Métiers de l'Artisanat.<br>
            Les données sont mises à jour toutes les nuits.
          </p>
        </div>
        <a class="button" href="https://api-rnm.artisanat.fr/">Documentation API RNM</a>
      </div>
    </section>
    <section class="section-white">
      <div class="container apis">
        <div class="description">
          <h2>L'API Registre National du Commerce<br/>et des Sociétés (RNCS)</h2>
          <p>
            Cette API contient les données IMR (Immatriculation, Modification, Radiation) des sociétés.<br>
            Les données proviennent d'Infogreffe et de l'INPI.
          </p>
        </div>
        <router-link class="button" :to="{ name: 'ApiDocRNCS'}">Documentation API RNCS</router-link>
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
