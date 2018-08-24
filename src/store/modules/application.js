import store from '@/store/index.js'

const state = {
  resultsAreLoading: true,
  sirenIsLoading: true,
  siretIsLoading: true,
  idAssociationisLoading: true,
  error500: false,
  noResultFound: false,
}

const mutations = {
  setResultsAreLoading(state, value) {
    state.resultsAreLoading = value
  },
  setSirenLoading(state, value) {
    state.sirenIsLoading = value
  },
  setSiretLoading(state, value) {
    state.siretIsLoading = value
  },
  setIdAssociationLoading(state, value) {
    state.idAssociationisLoading = value
  },
  setError500(state, value) {
    state.error500 = value
  },
  setNoResultFound(state, value) {
    state.noResultFound = value
  }
}

const actions = {
  resetApplicationState() {
    store.dispatch('hideWelcomeText')
    store.commit('setStoredSuggestions', '')
    store.commit('setSinglePageResultsSirene', null)
    store.commit('setSinglePageResultsRNA', null)
    store.commit('setError500', false)
    store.commit('setNoResultFound', false)
  }
}

const getters = {
  // If any search is loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.sirenIsLoading || state.siretIsLoading || state.idAssociationIsLoading)
  },
  sireneAvailable: () => {
    if (store.state.results.singlePageResult) {
      return store.state.results.singlePageResult.sirene
    }
    return null
  },
  RNAAvailable: () => {
    if (store.state.results.singlePageResult) {
      return store.state.results.singlePageResult.rna
    }
    return null
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}