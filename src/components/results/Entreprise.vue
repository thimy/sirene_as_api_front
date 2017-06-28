<template>
  <div>
    <router-link to="/">Revenir aux résultats</router-link>
    <h3>Bienvenue sur la page Entreprise {{$route.params.siret}}</h3>
    <!-- debugResults : {{singleResult}} -->
    <p>Nom entreprise : {{singleResult.etablissement.nom_raison_sociale}}</p>
    <ul>
      <li> Siret : {{singleResult.etablissement.siret}}</li>
      <li> Sirene : {{singleResult.etablissement.siren}}</li>
      <li> Code postal : {{singleResult.etablissement.code_postal}}</li>
      <li> Departement : {{singleResult.etablissement.departement}}</li>
      <li> Date de création : {{singleResult.etablissement.date_creation}}</li>
      <li> Téléphone : {{singleResult.etablissement.telephone}}</li>
      <li> Email : {{singleResult.etablissement.email}}</li>
      <li> Code activité principale : {{singleResult.etablissement.activite_principale_entreprise}}</li>
      <li> Libéllé activité principale : {{singleResult.etablissement.libelle_activite_principale_entreprise}}</li>
    </ul>
  </div>
</template>

<script>
import store from '@/store/store.js'

/* eslint-disable no-undef */
export default {
  name: 'Entreprise',
  computed: {
    singleResult: function () {
      store.commit('executeSearchBySiret', this.$route.params.siret)
      return store.state.singlePageResult
    }
  }
}

</script>
