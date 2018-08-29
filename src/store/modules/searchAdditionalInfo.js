import store from '@/store/index.js'

const getters = {
  idAssociationFromSirene: () => {
    if (store.state.results.singlePageResult.sirene) {
      return store.state.results.singlePageResult.sirene.etablissement.numero_rna
    }
    return null
  },
  siretFromRNA: () => {
    if (store.state.results.singlePageResult.rna) {
      return store.state.results.singlePageResult.rna.association.siret
    }
    return null
  }
}

const actions = {
  // When we have an RNA ID, check if there is a Siret. If yes, look up Sirene. If no, look up the ID in Sirene.
  async fromRNARequestOtherAPIs(dispatch, id) {
    if (getters.siretFromRNA()) {
      await store.dispatch('executeSearchBySiret', { siret: getters.siretFromRNA(), api: 'SIRENE' })
    } else {
      await store.dispatch('executeSearchByIdAssociation', { id: id, api: 'SIRENE' })
    }
  },
  // When we have Siret, check if there is an RNA ID. If yes, look up RNA. If no, look up Siret in RNA.
  async fromSireneRequestOtherAPIs(dispatch, siret) {
    if (getters.idAssociationFromSirene()) {
      await store.dispatch('executeSearchByIdAssociation', { id: getters.idAssociationFromSirene(), api: 'RNA' })
    } else {
      await store.dispatch('executeSearchBySiret', { siret: siret, api: 'RNA' })
    }
  }
}

export default {
  getters,
  actions
}
