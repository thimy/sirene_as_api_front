// This module is for code relative to searching additional information
// after we have a base of information already
// For now: RNA from SIRENE, SIRENE from RNA, and RNCS
import store from '@/store/index.js'

const state = {
  baseAdressRNCS: process.env.BASE_ADRESS_RNCS
}

const getters = {
  idAssociationFromSirene: () => {
    if (store.state.results.singlePageResult['SIRENE']) {
      return store.state.results.singlePageResult['SIRENE'].etablissement.numero_rna
    }
    return null
  },
  siretFromRNA: () => {
    if (store.state.results.singlePageResult['RNA']) {
      return store.state.results.singlePageResult['RNA'].association.siret
    }
    return null
  },
  sirenFromAvailableData() {
    if (store.getters.storedSirenSiege) {
      return store.getters.storedSirenSiege.siret
    } else if (store.getters.singlePageEtablissementSirene) {
      return store.getters.singlePageEtablissementSirene.siren
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
  // Also get additional RNCS Info if from SIRENE
  async fromSireneRequestOtherAPIs(dispatch, siret) {
    if (getters.idAssociationFromSirene()) {
      await store.dispatch('executeSearchByIdAssociation', { id: getters.idAssociationFromSirene(), api: 'RNA' })
    } else {
      await store.dispatch('executeSearchBySiret', { siret: siret, api: 'RNA' })
    }
    // TODO: Reactivate after we stop mocking data
    // store.dispatch('searchAdditionalInfoRNCS')
  },
  async searchAdditionalInfoRNCS() {
    const siren = getters.sirenFromAvailableData()
    await store.dispatch('sendAPIRequest', state.baseAdressRNCS + siren)
    .then(response => {
      store.dispatch('setResponseRNCS', response)
    })
    .catch(notFound => {
      store.dispatch('setResponseRNCS', notFound)
    })
  }
}

export default {
  state,
  getters,
  actions
}
