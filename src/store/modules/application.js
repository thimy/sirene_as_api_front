import store from '@/store/index.js'

const state = {
  isLoading: {
    'SIREN': true,
    'ID_ASSOCIATION': true,
    'SIRET': true,
    'RESULTS': true
  },
  error500: {
    sirene: false,
    rna: false
  },
  noResultFound: {
    sirene: false,
    rna: false
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
  // TODO: put this in action, and/or factorize as object
  setError500(state, { value, api }) {
    if (api == 'ALL') {
      state.error500.sirene = value
      state.error500.rna = value
    } else if (api == 'SIRENE') {
      state.error500.sirene = value
    } else if (api == 'RNA') {
      state.error500.rna = value
    }
  },
  // TODO: put this in action, and/or factorize as object
  setNoResultFound(state, { value, api }) {
    if (api == 'ALL') {
      state.noResultFound.sirene = value
      state.noResultFound.rna = value
    } else if (api == 'SIRENE') {
      state.noResultFound.sirene = value
    } else if (api == 'RNA') {
      state.noResultFound.rna = value
    }
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
    state.error500.rna && state.error500.sirene
  },
  allAPINotFound: state => {
    state.noResultFound.rna && state.noResultFound.sirene
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}