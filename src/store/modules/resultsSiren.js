import store from '@/store/index.js'

const state = {
  sirenResults: null
}

// endpoint Siren gives results for RNM and SirenChildren
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
  statusRNM: state => {
    if (state.sirenResults) {
      return state.sirenResults.repertoire_national_metiers.status
    }
    return null
  },
  storedRNM: state => {
    if (state.sirenResults) {
      return state.sirenResults.repertoire_national_metiers.data
    }
    return null
  },
  storedSirenChildren: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.data.other_etablissements_sirets
    }
  },
  RNMAvailable: state => {
    if (state.sirenResults &&  state.sirenResults.repertoire_national_metiers.status == 200) {
      return true
    }
    return false
  },
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
