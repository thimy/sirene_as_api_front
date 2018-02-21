import store from '@/store/index.js'

const state = {
  resultsAreLoading: true,
  sirenIsLoading: true,
  siretIsLoading: true,
  error500: false
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
  }
}

const actions = {
  resetApplicationState() {
    store.dispatch('hideWelcomeText')
    store.dispatch('hideSuggestions')
    store.commit('setError500', false)
  }
}

const getters = {
  // If Siret OR Siren search are loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.sirenIsLoading && state.siretIsLoading)
  },
}

export default {
    state,
    mutations,
    actions,
    getters
}