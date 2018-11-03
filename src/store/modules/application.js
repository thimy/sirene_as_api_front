// This module contains code relative to Application State
import store from '@/store/index.js'
import router from '@/router/index.js'

const state = {
  // One entry here for each endpoint
  isLoading: {
    'ID_ASSOCIATION': true,
    'SIRET': true,
    'SIRENE_FULLTEXT': true,
    'RNA_FULLTEXT': true
  },
  status: {
    'RNA': null,
    'SIRENE': null,
    'RNA_FULLTEXT': null,
    'SIRENE_FULLTEXT': null
  }
}

const getters = {
  // If any search is loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.isLoading['SIRET'] || state.isLoading['ID_ASSOCIATION'])
  },
  isFullTextLoading: state => {
    return (state.isLoading['SIRENE_FULLTEXT'] || state.isLoading['RNA_FULLTEXT'])
  },
  sireneAvailable: () => {
    if (store.state.results.singlePageResult['SIRENE']) {
      return true
    }
    return false
  },
  RNAAvailable: () => {
    if (store.state.results.singlePageResult['RNA']) {
      return true
    }
    return false
  },
  mainAPIError: () => {
    return (state.status['RNA'] == 0 || state.status['RNA'] == 500 || state.status['RNA'] == 404)
      && (state.status['SIRENE'] == 0 || state.status['SIRENE'] == 500 || state.status['SIRENE'] == 404)
  },
  mainAPINotFound: () => {
    return (state.status['RNA'] == 404 && state.status['SIRENE'] == 404)
  },
  isWelcomeTextVisible: () => {
    if (store.state.route.name != 'Home') {
      return false
    }
    return true
  }
}

const mutations = {
  setLoading(state, {value, search}) {
    if (search == 'ALL') {
      state.isLoading = {
        'ID_ASSOCIATION': value,
        'SIRET': value,
        'SIRENE_FULLTEXT': value,
        'RNA_FULLTEXT': value
      }
    } else {
      state.isLoading[search] = value
    }
  },
  setStatus (state, { value, api }) {
    state.status[api] = value
  },
  clearStatus (state, api ) {
    if (api == 'ALL') {
      state.status = {
        'RNA': null,
        'SIRENE': null
      }
    } else {
      state.status[api] = null
    }
  }
}

const actions = {
  resetApplicationState() {
    store.commit('clearStatus', 'ALL')
    store.commit('setStoredSuggestions', '')
    store.commit('clearAdditionalInfos', 'ALL')
    store.commit('setSinglePageResults', { value: null, api: 'ALL' })
  },
  goToClearedHomePage () {
    router.push({ path: `/` })
    store.commit('setStoredSuggestions', '')
    store.commit('setFullText', '')
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}