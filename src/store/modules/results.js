import store from '@/store/index.js'

const state = {
  storedResults: null,
  singlePageResult: null,
  storedStatus: null
}

const getters = {
  storedResultsEtablissements: state => {
    if (state.storedResults) {
      return state.storedResults.etablissement
    } else {
      return null
    }
  },
  singlePageResultEtablissement: state => {
    if (state.singlePageResult) {
      return state.singlePageResult.etablissement
    } else {
      return null
    }
  },
  numberResults: state => {
    if (state.storedStatus === 404) {
      store.commit('clearResults')
      return 0
    } else if (state.storedResults) {
      return state.storedResults.total_results
    }
  },
  totalPageNumber: state => {
    if (state.storedResults) {
      return state.storedResults.total_pages
    }
  },
  infoMessage: state => {
    const postalCodeLength = String(store.state.filters.filterPostalCode).length
    if (postalCodeLength !== 5 && postalCodeLength !== 0) {
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
  setSinglePageResults (state, value) {
    state.singlePageResult = value
  }
}

export default {
  state,
  getters,
  mutations
}
