<template>
  <div>
    <router-link to=/>Revenir aux résultats</router-link>
    <div v-if="result">
      <!-- debugResults : {{singleResult}} -->
      <p>Nom entreprise : {{result.nom_raison_sociale}}</p>
      <ul>
        <li> Siret : {{result.siret}}</li>
        <li> Siren : {{result.siren}}</li>
        <li> Clef NIC : {{result.nic}}</li>
        <li> Code postal : {{result.code_postal}}</li>
        <li> Cedex : {{result.cedex}}</li>
        <li> Departement : {{result.departement}}</li>
        <li> Date de création : {{result.date_creation}}</li>
        <li> Numéro TVA Intracommunautaire : {{tvaIntracommunautaire}}
        <li> Téléphone : {{result.telephone}}</li>
        <li> Email : {{result.email}}</li>
        <li> Code activité principale : {{result.activite_principale_entreprise}}</li>
        <li> Libellé activité principale : {{result.libelle_activite_principale_entreprise}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entreprise',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.result.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.result.siren}`
      return `FR${tvaNumber}`
    }
  },
  created () {
    this.$store.commit('executeSearchBySiret', this.$route.params.siret)
  }
}
</script>
