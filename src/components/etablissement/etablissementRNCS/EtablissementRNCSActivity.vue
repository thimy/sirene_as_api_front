<template>
  <div class="company__panel panel">
    <h4>Informations d'activité et d´établissement principal</h4>
    <hr>
    <div v-if="RNCSData.code_greffe">
      <div class="company__item">
        <div class="company__item-key">Code Greffe</div>
        <div class="company__item-value">{{ RNCSData.code_greffe }}</div>
      </div>
    </div>
    <div v-if="RNCSData.nom_greffe">
      <div class="company__item">
        <div class="company__item-key">Nom Greffe</div>
        <div class="company__item-value">{{ RNCSData.nom_greffe }}</div>
      </div>
    </div>
    <div v-if="RNCSData.numero_gestion">
      <div class="company__item">
        <div class="company__item-key">Numéro Gestion</div>
        <div class="company__item-value">{{ RNCSData.numero_gestion }}</div>
      </div>
    </div>
    <div v-if="RNCSData.siren">
      <div class="company__item">
        <div class="company__item-key">Siren</div>
        <div class="company__item-value">{{ RNCSData.siren }}</div>
      </div>
    </div>
    <div v-if="RNCSData.type_inscription">
      <div class="company__item">
        <div class="company__item-key">Type Inscription</div>
        <div class="company__item-value">{{ RNCSData.type_inscription }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_immatriculation">
      <div class="company__item">
        <div class="company__item-key">Date Immatriculation</div>
        <div class="company__item-value">{{ RNCSData.date_immatriculation }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_premiere_immatriculation">
      <div class="company__item">
        <div class="company__item-key">Date Première Immatriculation</div>
        <div class="company__item-value">{{ RNCSData.date_premiere_immatriculation }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_radiation">
      <div class="company__item">
        <div class="company__item-key">Date Radiation</div>
        <div class="company__item-value">{{ RNCSData.date_radiation }}</div>
      </div>
    </div>
    <div v-if="RNCSData.transfert">
      <div class="company__item">
        <div class="company__item-key">Date Transfert</div>
        <div class="company__item-value">{{ RNCSData.date_transfert }}</div>
      </div>
    </div>
    <div v-if="RNCSData.sans_activite">
      <div class="company__item">
        <div class="company__item-key">Sans activité</div>
        <div class="company__item-value">{{ RNCSData.sans_activite }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_debut_activite">
      <div class="company__item">
        <div class="company__item-key">Date début d'activité</div>
        <div class="company__item-value">{{ RNCSData.date_debut_activite }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_debut_premiere_activite">
      <div class="company__item">
        <div class="company__item-key">Date début de première activité</div>
        <div class="company__item-value">{{ RNCSData.date_debut_premiere_activite }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_cessation_activite">
      <div class="company__item">
        <div class="company__item-key">Date de cessation d'activité</div>
        <div class="company__item-value">{{ RNCSData.date_cessation_activite }}</div>
      </div>
    </div>
    <div v-if="RNCSData.date_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Date de dernière modification</div>
        <div class="company__item-value">{{ RNCSData.date_derniere_modification }}</div>
      </div>
    </div>
    <div v-if="RNCSData.libelle_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Libéllé de dernière modification</div>
        <div class="company__item-value">{{ RNCSData.libelle_derniere_modification }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNCSInfos',
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
