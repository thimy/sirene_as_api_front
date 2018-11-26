// This module contains code relative to Results registration
// that are not from SIRENE, SIREN/RNM or RNA
import store from '@/store/index.js'

const state = {
  additionalResults: {
    'RNM': null,
    'RNCS': null
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
  setAdditionalInfos: (state, {results, api}) => {
    state.additionalResults[api] = results
  },
  clearAdditionalInfos: (state, api) => {
    if (api == 'ALL') {
      state.additionalResults =
        {
          'RNM': null,
          'RNCS': null
        }
    } else {
      state.additionalResults[api] = null
    }
  }
}

const actions = {
  async setResponseAdditionalInfo(dispatch, { response, api }) {
    store.commit('setStatusAdditionalAPI', {value: response.status, endpoint: 'RNCS'})
    if (response.status == 200) {
      store.commit('setAdditionalInfos', { results: response.body, api: api })
      // TEMPORARY HACK : RNM is returning 200 even in case of empty JSON.
      // This will change soon but in the meantime we have manage this.
      if (api == 'RNM' && response.body.ID == null) {
        store.commit('clearAdditionalInfos', 'RNM')
      }
      // End of temporary hack
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
