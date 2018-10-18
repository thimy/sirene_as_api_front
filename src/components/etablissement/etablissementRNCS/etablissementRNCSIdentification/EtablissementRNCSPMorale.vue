<template>
  <div>
    <h4>Personne morale</h4>
    <hr>
    <div v-if="RNCSLegal.denomination">
      <div class="company__item">
        <div class="company__item-key">Dénomination</div>
        <div class="company__item-value">{{ RNCSLegal.denomination }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.sigle">
      <div class="company__item">
        <div class="company__item-key">Sigle</div>
        <div class="company__item-value">{{ RNCSLegal.sigle }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.forme_juridique">
      <div class="company__item">
        <div class="company__item-key">Forme juridique</div>
        <div class="company__item-value">{{ RNCSLegal.forme_juridique }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.associe_unique">
      <div class="company__item">
        <div class="company__item-key">Associé unique</div>
        <div class="company__item-value">{{ RNCSLegal.associe_unique }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.activite_principale">
      <div class="company__item">
        <div class="company__item-key">Activités principale</div>
        <div class="company__item-value">{{  RNCSLegal.activite_principale }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.type_capital">
      <div class="company__item">
        <div class="company__item-key">Type de capital</div>
        <div class="company__item-value">{{ RNCSLegal.type_capital }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.capital">
      <div class="company__item">
        <div class="company__item-key">Capital</div>
        <div class="company__item-value">{{ RNCSLegal.capital }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.capital_actuel">
      <div class="company__item">
        <div class="company__item-key">Capital Actuel</div>
        <div class="company__item-value">{{ RNCSLegal.capital_actuel }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.devise">
      <div class="company__item">
        <div class="company__item-key">Devise</div>
        <div class="company__item-value">{{ RNCSLegal.devise }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.date_cloture">
      <div class="company__item">
        <div class="company__item-key">Date clotûre exercice social</div>
        <div class="company__item-value">{{ RNCSLegal.date_cloture }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.date_cloture_exeptionnelle">
      <div class="company__item">
        <div class="company__item-key">Date clotûre exceptionnelle</div>
        <div class="company__item-value">{{ RNCSLegal.date_cloture_exeptionnelle }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.economie_sociale_solidaire">
      <div class="company__item">
        <div class="company__item-key">Economie Sociale Solidaire</div>
        <div class="company__item-value">{{ RNCSLegal.economie_sociale_solidaire }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.duree_pm">
      <div class="company__item">
        <div class="company__item-key">Durée Personne Morale</div>
        <div class="company__item-value">{{ RNCSLegal.duree_pm }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.libelle_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Libellé dernière modification</div>
        <div class="company__item-value">{{ RNCSLegal.libelle_derniere_modification }}</div>
      </div>
    </div>
    <div v-if="RNCSLegal.date_derniere_modification">
      <div class="company__item">
        <div class="company__item-key">Date dernière modification</div>
        <div class="company__item-value">{{ RNCSLegal.date_derniere_modification }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtablissementRNCSPMorale',
  computed: {
    RNCSLegal () {
      return this.$store.getters.RNCSData.personne_morale
    }
  }
}
</script>