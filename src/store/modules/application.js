import store from '@/store/index.js'

const state = {
  // One entry here for each endpoint
  isLoading: {
    'SIREN': true,
    'ID_ASSOCIATION': true,
    'SIRET': true,
    'SIRENE_FULLTEXT': true,
    'RNA_FULLTEXT': true
  },
  // APIs used for base for further search
  mainSearch: {
    'SIRENE': false,
    'RNA': false
  }
}

const getters = {
  // If any search is loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.isLoading['SIRET'] || state.isLoading['SIREN'] || state.isLoading['ID_ASSOCIATION'])
  },
  isFullTextLoading: state => {
    return (state.isLoading['SIRENE_FULLTEXT'] || state.isLoading['RNA_FULLTEXT'])
  },
  sireneAvailable: () => {
    if (store.state.results.singlePageResult) {
      return store.state.results.singlePageResult['SIRENE']
    }
    return null
  },
  RNAAvailable: () => {
    if (store.state.results.singlePageResult) {
      return store.state.results.singlePageResult['RNA']
    }
    return null
  },
  allAPIError500: () => {
    return (store.state.results.storedStatus['RNA'] == 0 || store.state.results.storedStatus['RNA'] == 500)
      && (store.state.results.storedStatus['SIRENE'] == 0 || store.state.results.storedStatus['SIRENE'] == 500)
  },
  allAPINotFound: state => {
    return (store.state.results.storedStatus['RNA'] == 404 && store.state.results.storedStatus['SIRENE'] == 404)
  },
  mainSearch: state => {
    if (state.mainSearch['SIRENE']) {
      return 'SIRENE'
    } else if (state.mainSearch['RNA']) {
      return 'RNA'
    }
  }
}

const mutations = {
  setLoading(state, {value, search}) {
    if (search == 'ALL') {
      state.isLoading = {
        'SIREN': value,
        'ID_ASSOCIATION': value,
        'SIRET': value,
        'SIRENE_FULLTEXT': value,
        'RNA_FULLTEXT': value
      }
    } else {
      state.isLoading[search] = value
    }
  },
  setNoResultFound(state, { value, api }) {
    if (api == 'ALL') {
      state.noResultFound = {
        'SIRENE': value,
        'RNA': value
      }
    } else {
      state.noResultFound[api] = value
    }
  },
  setError500(state, { value, api }) {
    if (api == 'ALL') {
      state.error500 = {
        'SIRENE': value,
        'RNA': value,
        'RNCS': value
      }
    } else {
      state.error500[api] = value
    }
  },
  setMainSearch(state, { value, search }) {
    state.mainSearch = {
      'SIRENE': false,
      'RNA': false
    }
    state.mainSearch[search] = value
  }
}

const actions = {
  resetApplicationState() {
    store.dispatch('hideWelcomeText')
    store.commit('setStoredSuggestions', '')
    store.commit('setSinglePageResults', { value: null, api: 'ALL' })
    store.commit('setError500', { value: false, api: 'ALL' })
    store.commit('setNoResultFound', { value: false, api: 'ALL' })
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}