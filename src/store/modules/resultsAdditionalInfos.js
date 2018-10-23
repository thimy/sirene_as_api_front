// This module contains code relative to Results registration
// that are not from SIRENE, SIREN/RNM or RNA
import store from '@/store/index.js'
import mockData from '@/store/__mocks__/mock791070907.json'

const state = {
  additionalResults: {
    'RNM': null,
    'RNCS': mockData
  }
}

const getters = {
  RNCSAvailable: state => {
    if (state.additionalResults['RNCS']) {
      return true
    }
    return false
  },
  RNMAvailable: state => {
    if (state.additionalResults['RNM']) {
      return true
    }
    return false
  },
  RNCSData: state => {
    if (state.additionalResults['RNCS']) {
      return state.additionalResults['RNCS'].dossier_entreprise_greffe_principal
    }
    return false
  },
  RNMData: state => {
    if (state.additionalResults['RNM']) {
      return state.additionalResults['RNM']
    }
    return false
  }
}

const mutations = {
  setAdditionalInfos: (state, {result, api}) => {
    state.additionalResults[api] = result
  },
  clearAdditionalInfos: (state, api) => {
    if (api == 'ALL') {
      state.additionalResults =
        {
          'RNM': null,
          // TODO change here to null after mock done
          'RNCS': mockData
        }
    } else {
      state.additionalResults[api] = null
    }
  }
}

const actions = {
  setResponseAdditionalInfo(dispatch, { response, api }) {
    if (response.status == 200) {
      store.commit('setAdditionalInfos', { results: response.body, api: api })
    } else {
      store.commit('clearAdditionalInfos', api)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
