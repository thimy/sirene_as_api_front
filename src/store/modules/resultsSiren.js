const state = {
  sirenResults: null
}

const getters = {
  storedSirenSiege: state => {
    if (!state.sirenResults || !state.sirenResults.siege_social) {
      return null
    }
    return state.sirenResults.siege_social[0]
  },
  storedSirenTotalResults: state => {
    return state.sirenResults.total_results
  },
  storedSirenChildren: state => {
    return state.sirenResults.other_etablissements_sirets
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
