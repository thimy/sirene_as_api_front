import store from '@/store/index.js'

const state = {
  isLoading: {
    'SIREN': true,
    'ID_ASSOCIATION': true,
    'SIRET': true,
    'RESULTS': true
  },
  error500: {
    'SIRENE': false,
    'RNA': false
  },
  noResultFound: {
    'SIRENE': false,
    'RNA': false
  },
  mainSearch: {
    'SIRENE': false,
    'RNA': false
  }
}

const mutations = {
  setLoading(state, {value, search}) {
    if (search == 'ALL') {
      state.isLoading = {
        'SIREN': value,
        'ID_ASSOCIATION': value,
        'SIRET': value,
        'RESULTS': value
      }
    } else {
      state.isLoading[search] = value
    }
  },
  setError500(state, { value, api }) {
    if (api == 'ALL') {
      state.error500 = {
        'SIRENE': value,
        'RNA': value
      }
    } else {
      state.error500[api] = value
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
    store.commit('setSinglePageResultsSirene', null)
    store.commit('setSinglePageResultsRNA', null)
    store.commit('setError500', { value: false, api: 'ALL' })
    store.commit('setNoResultFound', { value: false, api: 'ALL' })
  }
}

const getters = {
  // If any search is loading, the Etablissement page is loading :
  isEtablissementLoading: state => {
    return (state.isLoading['SIRET'] || state.isLoading['SIREN'] || state.isLoading['ID_ASSOCIATION'])
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
  },
  allAPIError500: state => {
    return state.error500.rna && state.error500.sirene
  },
  allAPINotFound: state => {
    return state.noResultFound.rna && state.noResultFound.sirene
  },
  mainSearch: state => {
    if (state.mainSearch['SIRENE']) {
      return 'SIRENE'
    } else if (state.mainSearch['RNA']) {
      return 'RNA'
    }
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}