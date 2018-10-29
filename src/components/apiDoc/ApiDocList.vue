<template>
  <div>
    <section class="section section-grey">
      <div class="container apis">
        <div class="row">
          <div class="description">
            <h2>L'API Sirene</h2>
            <p>
              L'API Sirene contient tous les établissements des entreprises françaises,
              ainsi que toutes les associations disposant d'un code SIRET.<br>
              Les données de l'API Sirene sont délivrées par l'INSEE.
            </p>
          </div>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocSirene'}">Documentation API Sirene</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-white">
      <div class="container apis">
        <div class="row">
          <div class="description">
            <h2>L'API Repertoire National des Associations (RNA)</h2>
            <p>
              Cette API contient toutes les associations françaises.<br>
              Les données proviennent du Ministère de l'Intérieur.
            </p>
          </div>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocRNA'}">Documentation API RNA</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-grey">
      <div class="container apis">
        <div class="row">
          <div class="description">
            <h2>L'API Répertoire National des Métiers (RNM)</h2>
            <p>
              L'API RNM nous est gracieusement ouverte par les Chambres et Métiers de l'Artisanat.<br>
              Les données sont mises à jour toutes les nuits.
            </p>
          </div>
          <div class="cta">
            <a class="button" href="https://api-rnm.artisanat.fr/">Documentation API RNM</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-white">
      <div class="container apis">
        <div class="row">
          <div class="description">
            <h2>L'API Registre National du Commerce<br/>et des Sociétés (RNCS)</h2>
            <p>
              Cette API contient les données IMR (Immatriculation, Modification, Radiation) des sociétés.<br>
              Les données proviennent d'Infogreffe et de l'INPI.
            </p>
          </div>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocRNCS'}">Documentation API RNCS</router-link>
          </div>
        </div>
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
.cta {
  display: flex;
  align-items: center;
}

a.button {
  text-align: center;
  min-width: 280px;
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
