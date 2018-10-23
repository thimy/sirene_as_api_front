// This module contains code relative to Results registration
// only the ones from SIREN endpoint
import store from '@/store/index.js'

const state = {
  sirenResults: null
}

const getters = {
  storedSirenSiege: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.data.siege_social
    }
    return null
  },
  storedSirenTotalResults: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.data.total_results
    }
    return null
  },
  statusSiren: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.status
    }
    return null
  },
  storedSirenChildren: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.data.other_etablissements_sirets
    }
  }
}

const mutations = {
  setSirenResults (state, value) {
    state.sirenResults = value
  },
  clearSirenResults (state) {
    state.sirenResults = null
  }
}

const actions = {
  setResponseSiren(dispatch, response) {
    if (response.status == 200) {
      store.commit('setSirenResults', response.body)
    } else {
      store.commit('clearSirenResults')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
