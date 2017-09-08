import Vue from 'vue'
import constants from '@/constants'
import store from '@/store/index.js'

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
    if (store.state.filters.filterActivityCode) {
      filters = filters + '&activite_principale=' + state.filterActivityCode
    }
    return filters
  }
}

const mutations = {
  setFullText (state, value) {
    state.storedFullText = value
  },
  setPage (state, value) {
    state.pageNumber = value
  },
  executeSearchBySiret (state, siret) {
    Vue.http.get(state.baseAdressSiret + siret).then(response => {
      store.commit('setSinglePageResults', response.body)
    }, response => {
      store.commit('setSinglePageResults', null)
    })
  }
}

const actions = {
  executeSearch () {
    if (store.getters.infoMessage) {
      return false
    }
    store.dispatch('hideWelcomeText')
    Vue.http.get(store.getters.adressToGet).then(response => {
      store.commit('setResults', response.body)
      store.commit('setStatus', response.status)
    }, response => {
      if (state.pageNumber > 1) {
        store.commit('setPage', 1)
        store.dispatch('executeSearch')
      } else {
        store.commit('setStatus', response.status)
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
