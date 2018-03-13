import store from '@/store/index.js'

const state = {
  resultsAreLoading: true,
  sirenIsLoading: true,
  siretIsLoading: true,
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
    store.dispatch('hideSuggestions')
    store.commit('setError500', false)
    store.commit('setNoResultFound', false)
  }
}

const getters = {
  // If Siret OR Siren search are loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.sirenIsLoading || state.siretIsLoading)
  },
}

export default {
    state,
    mutations,
    actions,
    getters
}