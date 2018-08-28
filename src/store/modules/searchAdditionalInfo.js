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
  fromRNARequestOtherAPIs(dispatch, id) {
    if (getters.siretFromRNA()) {
      store.dispatch('executeSearchBySiret', { siret: getters.siretFromRNA(), api: 'SIRENE' })
    } else {
      store.dispatch('executeSearchByIdAssociation', { id: id, api: 'SIRENE' })
      // Never searching by siret so need to make it not in loading state, TODO: find better way
      store.commit('setSiretLoading', false)
      store.commit('setSirenLoading', false)
    }
  },
  // When we have Siret, check if there is an RNA ID. If yes, look up RNA. If no, look up Siret in RNA.
  fromSireneRequestOtherAPIs(dispatch, siret) {
    if (getters.idAssociationFromSirene()) {
      store.dispatch('executeSearchByIdAssociation', { id: getters.idAssociationFromSirene(), api: 'RNA' })
    } else {
      store.dispatch('executeSearchBySiret', { siret: siret, api: 'RNA' })
      // Never searching by id_association so need to make it not in loading state, TODO: find better way
      store.commit('setIdAssociationLoading', false)
    }
  }
}

export default {
  getters,
  actions
}
