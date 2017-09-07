import Vue from 'vue'
import store from '@/store/index.js'
import constants from '@/constant'

const state = {
  storedFullText: '',
  baseAdress: constants.baseAdress,
  baseAdressSiret: constants.baseAdressSiret,
  pageNumber: 1
}

const getters = {
  pageNumberToGet: state => {
    return '?page=' + state.pageNumber
  },
  adressToGet: state => {
    return state.baseAdress + state.storedFullText + store.getters.optionsToGet
  },
  optionsToGet: state => {
    return store.getters.pageNumberToGet + store.getters.filtersToGet
  },
  filtersToGet: state => {
    let filters = ''
    if (store.state.filters.filterPostalCode !== '') {
      filters = filters + '&code_postal=' + state.filterPostalCode
    }
    if (store.state.filters.filterActivityCode !== '') {
      filters = filters + '&activite_principale=' + state.filterActivityCode
    }
    return filters
  }
}

const mutations = {
  setFullText (state, value) {
    state.storedFullText = value
  },
  executeSearchBySiret (state, siret) {
    Vue.http.get(state.baseAdressSiret + siret).then(response => {
      store.state.results.singlePageResult = response.body
    }, response => {
      store.state.results.singlePageResult = null
    })
  }
}

const actions = {
  executeSearch (state) {
    if (store.getters.infoMessage !== '') {
      return false
    }
    store.commit('changeWelcomeTextVisibility', false)
    Vue.http.get(store.getters.adressToGet).then(response => {
      store.state.results.storedStatus = response.status
      store.state.results.storedResults = response.body
    }, response => {
      if (state.pageNumber > 1) {
        state.pageNumber = 1
        store.dispatch('executeSearch')
      } else {
        store.state.results.storedStatus = response.status
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
