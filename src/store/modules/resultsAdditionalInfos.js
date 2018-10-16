// This module contains code relative to Results registration
// that are not from SIRENE, SIREN/RNM or RNA
import store from '@/store/index.js'
import mockData from '@/store/__mocks__/mock791070907.json'

const state = {
  resultsRNCS: mockData
}

const getters = {
  RNCSAvailable: state => {
    if (state.resultsRNCS) {
      return true
    }
  },
  RNCSData: state => {
    if (state.resultsRNCS) {
      return state.resultsRNCS.dossier_entreprise_greffe_principal
    }
  }
}

const mutations = {
  setRNCSResults: (state, result) => {
    state.resultsRNCS = result
  },
  clearRNCSResults: state => {
    state.resultsRNCS = null
  }
}

const actions = {
  setResponseRNCS(dispatch, response) {
    if (response.status == 200) {
      store.commit('setRNCSResults', response.body)
    } else {
      store.commit('clearRNCSResults')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
