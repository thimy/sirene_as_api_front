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
    'SIRENE_FULLTEXT': null,
    'RNCS': null
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
    // RNA Deactivated, TODO: reactivate post demo
    // return (state.status['RNA'] == 404 && state.status['SIRENE'] == 404)
    return (state.status['SIRENE'] == 404)
  },
  FullTextMainAPINotFound: () => {
    return (state.status['RNA_FULLTEXT'] == 404 && state.status['SIRENE_FULLTEXT'] == 404)
  },
  isWelcomeTextVisible: () => {
    if (store.state.route.name != 'Home') {
      return false
    }
    return true
  },
  isRNCSError: () => {
    if (state.status['RNCS'] == 404 || state.status['RNCS'] == 500 || state.status['RNCS'] == 422) {
      return true
    }
    return false
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
        'SIRENE': null,
        'RNCS': null
      }
    } else {
      state.status[api] = null
    }
  },
  setNoResultFound (state, api) {
    if (api == 'ALL') {
      state.status = {
        'RNA': 404,
        'SIRENE': 404
      }
    } else {
      state.status[api] = 404
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