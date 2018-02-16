import store from '@/store/index.js'

const state = {
  storedResults: null,
  singlePageResult: null,
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
  singlePageResultEtablissement: state => {
    if (!state.singlePageResult) {
      return null
    }
    return state.singlePageResult.etablissement
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
  infoMessagePostalCode: state => {
    const postalCodeLength = String(store.state.filters.filterPostalCode).length
    if (postalCodeLength < 5 && postalCodeLength > 0) {
      return 'En attente du code postal...'
    } else {
      return ''
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
  setStatusSiren(state, value) {
    state.storedStatusSiren = value
  },
  setSinglePageResults (state, value) {
    state.singlePageResult = value
  }
}

const actions = {
  setResponse(dispatch, response) {
    store.commit('setResults', response.body)
    store.commit('setStatus', response.status)
    store.dispatch('redirectWhenNoResult', response)
  },
  setResponseSinglePage(dispatch, response) {
    store.commit('setSinglePageResults', response.body)
    store.commit('setStatusSiret', response.status)
    store.dispatch('redirectWhenNoResult', response)
  },
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
      store.commit('setEmptyState', true)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
