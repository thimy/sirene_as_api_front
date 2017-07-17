<template>
  <div>
    <router-link to="/">Revenir aux résultats</router-link>
    <div v-if="result !== null">
      <h3>Bienvenue sur la page Entreprise {{$route.params.siret}}</h3>
      <!-- debugResults : {{singleResult}} -->
      <p>Nom entreprise : {{result.nom_raison_sociale}}</p>
      <ul>
        <li> Siret : {{result.siret}}</li>
        <li> Sirene : {{result.siren}}</li>
        <li> Code postal : {{result.code_postal}}</li>
        <li> Departement : {{result.departement}}</li>
        <li> Date de création : {{result.date_creation}}</li>
        <li> Téléphone : {{result.telephone}}</li>
        <li> Email : {{result.email}}</li>
        <li> Code activité principale : {{result.activite_principale_entreprise}}</li>
        <li> Libéllé activité principale : {{result.libelle_activite_principale_entreprise}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'Entreprise',
  computed: {
    result: function () {
      return this.$store.getters.singlePageResultEtablissement
    }
  },
  created () {
    console.log(this.$route.params.siret)
    this.$store.commit('executeSearchBySiret', this.$route.params.siret)
  }
}

</script>
