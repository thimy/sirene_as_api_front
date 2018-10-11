// TODO Factorize pagination stuff
import store from '@/store/index.js'

const state = {
  // Fulltext Results, only for SIRENE and RNA
  storedResults: {
    'RNA': null,
    'SIRENE': null
  },
  // singlePageResult is based on either SIRENE or RNA
  singlePageResult: {
    'RNA': null,
    'SIRENE':  null
  },
  // Every API have a status
  storedStatus: {
    'RNA': null,
    'SIRENE': null
  }
}

const getters = {
  storedSpellcheckSirene: state => {
    if (state.storedStatus['SIRENE'] && state.storedResults['SIRENE']) {
      return state.storedResults['SIRENE'].spellcheck
    }
    return null
  },
  storedSpellcheckRNA: state => {
    if (state.storedStatus['RNA'] && state.storedResults['RNA']) {
      return state.storedResults['RNA'].spellcheck
    }
    return null
  },
  storedResultsEntreprises: state => {
    if (state.storedResults['SIRENE']) {
      return state.storedResults['SIRENE'].etablissement
    }
    return null
  },
  storedResultsAssociations: state => {
    if (state.storedResults['RNA']) {
      return state.storedResults['RNA'].association
    }
    return null
  },
  singlePageEtablissementSirene: () => { // ex-singlePageResultEtablissement
    if (store.state.results.singlePageResult['SIRENE']) {
      return store.state.results.singlePageResult['SIRENE'].etablissement
    }
    return null
  },
  singlePageEtablissementRNA: () => {
    if (store.state.results.singlePageResult['RNA']) {
      return store.state.results.singlePageResult['RNA'].association
    }
    return null
  },
  numberResultsFullTextSirene: state => {
    if (state.storedResults['SIRENE'] && state.storedStatus['SIRENE'] != 404) {
      return state.storedResults['SIRENE'].total_results
    } else {
      return 0
    }
  },
  numberResultsFullTextRNA: state => {
    if (state.storedResults['RNA'] && state.storedStatus['RNA'] != 404) {
      return state.storedResults['RNA'].total_results
    } else {
      return 0
    }
  },
  totalPageNumberSirene: state => {
    if (state.storedResults['SIRENE'] && state.storedResults['SIRENE'].total_pages) {
      return state.storedResults['SIRENE'].total_pages
    } else {
      return 0
    }
  },
  totalPageNumberRNA: state => {
    if (state.storedResults['RNA'] && state.storedResults['RNA'].total_pages) {
      return state.storedResults['RNA'].total_pages
    } else {
      return 0
    }
  },
  // If only one result in fulltext search, send the searchId of result
  singleResult: () => {
    if (store.getters.numberResultsFullTextSirene === 1 && store.getters.numberResultsFullTextRNA === 0) {
      return state.storedResults['SIRENE'].etablissement[0]['siret']
    }
    if (store.getters.numberResultsFullTextSirene === 0 && store.getters.numberResultsFullTextRNA === 1) {
      return state.storedResults['RNA'].association[0]['id']
    }
    return null
  }
}

const mutations = {
  setResults (state, { value, api }) {
    state.storedResults[api] = value
  },
  clearResults (state, api) {
    if (api == 'ALL') {
      state.singlePageResult = {
        'RNA': null,
        'SIRENE':  null
      }
      return
    }
    state.storedResults[api] = null
  },
  setStatus (state, { value, api }) {
    state.storedStatus[api] = value
  },
  setSinglePageResults (state, { value, api }) {
    if (api == 'ALL') {
      state.singlePageResult = {
        'RNA': value,
        'SIRENE':  value
      }
      return
    }
    state.singlePageResult[api] = value
  }
}

const actions = {
  async setResponseFullText(dispatch, { response, api }) {
    await store.commit('setResults', { value: response.body, api: api })
    await store.commit('setStatus', { value: response.status, api: api })
    store.commit('setLoading', { value: false, search: 'FULLTEXT' })
  },
  setResponseEtablissement(dispatch, { response, api }) {
    if (response.status === 500 || response.status === 0 || response.status === 404) {
      store.dispatch('setNegativeResponse', { response: response, api: api })
      return
    }
    store.commit('setSinglePageResults', { value: response.body, api: api })
  },
  setNegativeResponse(dispatch, { response, api }) {
    if (response.status === 500 || response.status === 0) {
      store.commit('setError500', { value: true, api: api })
    }
    if (response.status === 404) {
      store.commit('setNoResultFound', { value: true, api: api })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
