const state = {
  sirenChildren: null
}

const getters = {
  storedSirenSiege: state => {
    if (state.sirenChildren && state.sirenChildren.siege_social) {
      return state.sirenChildren.siege_social
    }
    return null
  },
  storedSirenTotalResults: state => {
    return state.sirenChildren && state.sirenChildren.total_results
  },
  storedSirenChildren: state => {
    return state.sirenChildren && state.sirenChildren.other_etablissements_sirets
  }
}

const mutations = {
  setSirenResults (state, value) {
    state.sirenChildren = value
  }
}

export default {
  state,
  getters,
  mutations
}
