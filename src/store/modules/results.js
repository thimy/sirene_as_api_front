import store from '@/store/index.js'

const state = {
  storedResults: null,
  singlePageResult: {
    rna: null,
    sirene:  null
  },
  storedStatus: null,
  storedStatusSiret: null,
  storedStatusSiren: null
}

const getters = {
  storedSpellcheck: state => {
    if (state.storedStatus && state.storedResults) {
      return state.storedResults.spellcheck
    }
    return null
  },
  storedResultsEtablissements: state => {
    if (state.storedResults) {
      return state.storedResults.etablissement
    }
    return null
  },
  singlePageEtablissementSirene: state => { // ex-singlePageResultEtablissement
    if (store.state.results.singlePageResult.sirene) {
      return store.state.results.singlePageResult.sirene.etablissement
    }
    return null
  },
  singlePageEtablissementRNA: state => {
    if (store.state.results.singlePageResult.rna) {
      return store.state.results.singlePageResult.rna.association
    }
    return null
  },
  numberResults: state => {
    if (state.storedResults && state.storedStatus != 404) {
      return state.storedResults.total_results
    } else {
      return 0
    }
  },
  totalPageNumber: state => {
    if (state.storedResults) {
      return state.storedResults.total_pages
    }
  },
  onlyOneResult: state => {
    return store.getters.numberResults === 1
  }
}

const mutations = {
  setResults (state, value) {
    state.storedResults = value
  },
  clearResults (state) {
    state.storedResults = null
  },
  setStatus (state, value) {
    state.storedStatus = value
  },
  setStatusSiret(state, value) {
    state.storedStatusSiret = value
  },
  // TODO: move to resultsSiren
  setStatusSiren(state, value) {
    state.storedStatusSiren = value
  },
  // TODO: move to resultsSiren
  setSinglePageResultsSirene (state, value) {
    state.singlePageResult.sirene = value
  },
  setSinglePageResultsRNA (state, value) {
    state.singlePageResult.rna = value
  }
}

const actions = {
  setResponse(dispatch, response) {
    store.commit('setResults', response.body)
    store.commit('setStatus', response.status)
    store.dispatch('redirectWhenNoResult', response)
    store.commit('setResultsAreLoading', false)
  },
  setResponseSinglePage(dispatch, { response, api }) {
    if (api == 'SIRENE') {
      store.commit('setSinglePageResultsSirene', response.body)
      store.commit('setStatusSiret', response.status)
    } else if (api == 'RNA') {
      store.commit('setSinglePageResultsRNA', response.body)
    }
    store.dispatch('redirectWhenNoResult', response)
  },
  // TODO: move to resultsSiren
  setResponseSiren(dispatch, response) {
    store.commit('setSirenResults', response.body)
    store.commit('setStatusSiren', response.status)
    store.dispatch('redirectWhenNoResult', response)
  },
  redirectWhenNoResult(dispatch, response) {
    if (response.status === 500 || response.status === 0) {
      store.commit('setError500', true)
    }
    if (response.status === 404) {
      store.commit('setNoResultFound', true)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
