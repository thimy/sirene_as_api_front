const state = {
  sirenResults: null
}

const getters = {
  storedSirenSiege: state => {
    if (state.sirenResults && state.sirenResults.siege_social) {
      return state.sirenResults.siege_social[0]
    }
    return null
  },
  storedSirenTotalResults: state => {
    return state.sirenResults && state.sirenResults.total_results
  },
  storedSirenChildren: state => {
    return state.sirenResults && state.sirenResults.other_etablissements_sirets
  }
}

const mutations = {
  setSirenResults (state, value) {
    state.sirenResults = value
  }
}

export default {
  state,
  getters,
  mutations
}
