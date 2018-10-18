<template>
  <div class="company__panel panel">
    <h4>Personne Physique</h4>
    <hr>
    <div v-if="RNCSPhysical.denomination">
      <div class="company__item">
        <div class="company__item-key">Dénomination</div>
        <div class="company__item-value">{{ RNCSPhysical.denomination }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.sigle">
      <div class="company__item">
        <div class="company__item-key">Sigle</div>
        <div class="company__item-value">{{ RNCSPhysical.sigle }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.forme_juridique">
      <div class="company__item">
        <div class="company__item-key">Forme juridique</div>
        <div class="company__item-value">{{ RNCSPhysical.forme_juridique }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.associe_unique">
      <div class="company__item">
        <div class="company__item-key">Associé unique</div>
        <div class="company__item-value">{{ RNCSPhysical.associe_unique }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.activite_principale">
      <div class="company__item">
        <div class="company__item-key">Activités principale</div>
        <div class="company__item-value">{{  RNCSPhysical.activite_principale }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.type_capital">
      <div class="company__item">
        <div class="company__item-key">Type de capital</div>
        <div class="company__item-value">{{ RNCSPhysical.type_capital }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.capital">
      <div class="company__item">
        <div class="company__item-key">Capital</div>
        <div class="company__item-value">{{ RNCSPhysical.capital }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.capital_actuel">
      <div class="company__item">
        <div class="company__item-key">Capital Actuel</div>
        <div class="company__item-value">{{ RNCSPhysical.capital_actuel }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.devise">
      <div class="company__item">
        <div class="company__item-key">Devise</div>
        <div class="company__item-value">{{ RNCSPhysical.devise }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.date_cloture">
      <div class="company__item">
        <div class="company__item-key">Date clotûre exercice social</div>
        <div class="company__item-value">{{ RNCSPhysical.date_cloture }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.date_cloture_exeptionnelle">
      <div class="company__item">
        <div class="company__item-key">Date clotûre exceptionnelle</div>
        <div class="company__item-value">{{ RNCSPhysical.date_cloture_exeptionnelle }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.economie_sociale_solidaire">
      <div class="company__item">
        <div class="company__item-key">Economie Sociale Solidaire</div>
        <div class="company__item-value">{{ RNCSPhysical.economie_sociale_solidaire }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.duree_pm">
      <div class="company__item">
        <div class="company__item-key">Durée Personne Morale</div>
        <div class="company__item-value">{{ RNCSPhysical.duree_pm }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.libelle_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Libellé dernière modification</div>
        <div class="company__item-value">{{ RNCSPhysical.libelle_derniere_modification }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.date_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Date dernière modification</div>
        <div class="company__item-value">{{ RNCSPhysical.date_derniere_modification }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.code_greffe">
      <div class="company__item">
        <div class="company__item-key">Code Greffe</div>
        <div class="company__item-value">{{ RNCSPhysical.code_greffe }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.numero_gestion">
      <div class="company__item">
        <div class="company__item-key">Numéro Gestion</div>
        <div class="company__item-value">{{ RNCSPhysical.numero_gestion }}</div>
      </div>
    </div>
    <div v-if="RNCSPhysical.siren">
      <div class="company__item">
        <div class="company__item-key">Siren</div>
        <div class="company__item-value">{{ RNCSPhysical.siren }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtablissementRNCSPPhysique',
  computed: {
    RNCSPhysical () {
      return this.$store.getters.RNCSData.personne_physique
    }
  }
}
</script>