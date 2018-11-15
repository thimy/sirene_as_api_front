// This module contains code relative to Application State
import store from '@/store/index.js'
import router from '@/router/index.js'
import cloneDeep from 'lodash/cloneDeep'
import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import includes from 'lodash/includes'
import every from 'lodash/every'
import flatten from 'lodash/flatten'

// Deep-cloning endpoints from config
const endpoints = cloneDeep(process.env.ENDPOINTS)

const errorCodes = ['500', '422']
const notFoundCodes = ['404']
const badCodes = flatten(errorCodes, notFoundCodes)

const state = {
  endpoints: endpoints,
  isLoading: {
    fullText: mapValues(endpoints.fullText, () => false),
    etablissementMain:  mapValues(endpoints.etablissementMain, () => false),
    etablissementAdditional:  mapValues(endpoints.etablissementAdditional, () => false)
  },
  status: {
    fullText: mapValues(endpoints.fullText, () => null),
    etablissementMain:  mapValues(endpoints.etablissementMain, () => null),
    etablissementAdditional:  mapValues(endpoints.etablissementAdditional, () => null)
  }
}

const getters = {
  // Getters to get fullText, Etablissement (main APIs) et Etablissement (secondary API)
  // 4 states : Loading, Error, Not found, Not working
  fullTextLoading: state => {
    return includes(values(state.isLoading.fullText), true)
  },
  fullTextError: state => { // Removing values function would work ?
    return every(state.status.fullText, errorCodes)
  },
  fullTextNotFound: state => {
    return every(values(state.status.fullText), notFoundCodes)
  },
  fullTextNotWorking: state => {
    return every(values(state.status.fullText), badCodes)
  },

  // Main endpoints (RNA_ID and SIRENE_SIRET)
  // One main API is loading = page Etablissement not ready
  mainAPISLoading: (state) => {
    return includes(values(state.isLoading.etablissementMain), true)
  },
  mainAPISError: (state) => {
    return includes(values(state.status.etablissementMain), errorCodes)
  },
  mainAPISNotWorking: (state) => {
    return includes(values(state.status.etablissementMain), badCodes)
  },
  mainAPISNotFound: (state) => {
    return includes(values(state.status.etablissementMain), notFoundCodes)
  },

  // Additional informations endpoints
  additionalAPILoading: (state) => {
    return api => {
      return includes(badCodes, state.isLoading.etablissementAdditional[api])
    }
  },
  additionalAPIError: (state) => {
    return api => {
      return includes(errorCodes, state.status.etablissementAdditional[api])
    }
  },
  additionalAPINotWorking: (state) => {
    return api => {
      return includes(badCodes, state.status.etablissementAdditional[api])
    }
  },
  additionalAPINotFound: (state) => {
    return api => {
      return includes(notFoundCodes, state.status.etablissementAdditional[api])
    }
  },

  isWelcomeTextVisible: () => {
    if (store.state.route.name != 'Home') {
      return false
    }
    return true
  },
  // TODO: isBackToResultsButtonVisible:
}

const mutations = {
  setLoadingFullText(state, {value, endpoint}) {
    if (endpoint == 'ALL') {
      state.isLoading.fullText = mapValues(endpoints, () => value)
    } else {
      state.isLoading.fullText[endpoint] = value
    }
  },
  setLoadingMainAPI(state, {value, endpoint}) {
    if (endpoint == 'ALL') {
      state.isLoading.etablissementMain = mapValues(endpoints, () => value)
    } else {
      state.isLoading.etablissementMain[endpoint] = value
    }
  },
  setLoadingAdditionalAPI(state, {value, endpoint}) {
    if (endpoint == 'ALL') {
      state.isLoading.etablissementAdditional = mapValues(endpoints, () => value)
    } else {
      state.isLoading.etablissementAdditional[endpoint] = value
    }
  },
  setStatusFullText (state, { value, endpoint }) {
    if (endpoint == 'ALL') {
      state.status.fullText = mapValues(endpoints, () => value)
    } else {
      state.status.fullText[endpoint] = value
    }
  },
  setStatusMainAPI (state, { value, endpoint }) {
    if (endpoint == 'ALL') {
      state.status.etablissementMain = mapValues(endpoints, () => value)
    } else {
      state.status.etablissementMain[endpoint] = value
    }
  },
  setStatusAdditionalAPI (state, { value, endpoint }) {
    if (endpoint == 'ALL') {
      state.status.etablissementAdditional = mapValues(endpoints, () => value)
    } else {
      state.status.etablissementAdditional[endpoint] = value
    }
  }
}

const actions = {
  clearAllStatus() {
    store.commit('setStatusFullText', { value: '', endpoint: 'ALL' })
    store.commit('setStatusMainAPI', { value: '', endpoint: 'ALL' })
    store.commit('setStatusAdditionalAPI', { value: '', endpoint: 'ALL' })
  },
  resetApplicationState() {
    store.dispatch('clearAllStatus')
    store.commit('setStoredSuggestions', '')
    store.commit('clearAdditionalInfos', 'ALL')
    store.commit('setSinglePageResults', { value: null, api: 'ALL' })
  },
  goToClearedHomePage () {
    router.push({ path: `/` })
    store.commit('setStoredSuggestions', '')
    store.commit('setFullText', '')
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}