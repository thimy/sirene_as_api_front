<template>
  <div>
    <router-link :to="{ path: '/search',
      query: {
        fullText: this.$store.state.search.storedFullText,
        page: this.$store.state.search.pageNumber,
        postalCode: this.$store.state.filters.filterPostalCode,
        activityCode: this.$store.state.filters.filterActivityCode
      }}">
      Revenir aux résultats
    </router-link>
    <div v-if="result">
      <p>Nom entreprise : {{result.nom_raison_sociale | removeExtraChars}}</p>
      <ul>
        <li> Siret : {{ result.siret }}</li>
        <li> Siren : {{ result.siren }}</li>
        <li> Clef NIC : {{ result.nic }}</li>
        <li> Gérant : {{ fullOwnerName }}</li>
        <li> Code postal : {{ result.code_postal }}</li>
        <li> Cedex : {{ result.cedex | ifExist}}</li>
        <li> Departement : {{ result.departement }}</li>
        <li> Date de création : {{ result.date_creation }}</li>
        <li> Numéro TVA Intracommunautaire : {{ tvaIntracommunautaire }}
        <li> Téléphone : {{ result.telephone | ifExist}}</li>
        <li> Email : {{ result.email | ifExist}}</li>
        <li> Code activité principale : {{ result.activite_principale_entreprise }}</li>
        <li> Libellé activité principale : {{ result.libelle_activite_principale_entreprise }}</li>
        <li> Tranche effectif salarié : {{ result.libelle_tranche_effectif_salarie }}</li>
        <li> Date de création : {{ formattedDate }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'Etablissement',
  computed: {
    result () {
      return this.$store.getters.singlePageResultEtablissement
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.result.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.result.siren}`
      return `FR${tvaNumber}`
    },
    // Display nom only if present. Prenom is not required. Concatenate the two if presents.
    fullOwnerName () {
      const nomOwner = this.result.nom
      const prenomOwner = this.result.prenom
      if (!nomOwner) {
        return null
      }
      if (!prenomOwner) {
        return nomOwner
      } else {
        return `${nomOwner} ${prenomOwner}`
      }
    },
    formattedDate () {
      if (!this.result.date_creation) {
        return null
      }
      const year = this.result.date_creation.substring(0, 4)
      const month = this.result.date_creation.substring(4, 6)
      const day = this.result.date_creation.substring(6, 8)
      return `${day}/${month}/${year}`
    }
  },
  created () {
    this.$store.commit('executeSearchBySiret', this.$route.params.siret)
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.commit('executeSearchBySiret', this.$route.params.siret)
    }
  }
}
</script>
