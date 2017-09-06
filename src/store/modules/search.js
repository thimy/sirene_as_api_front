import Vue from 'vue'
import store from '../index.js'

const state = {
  storedFullText: '',
  baseAdress: 'http://sirene.entreprise.api.gouv.fr/full_text/', // TODO : replace by HTTPS
  baseAdressSiret: 'http://sirene.entreprise.api.gouv.fr/siret/', // TODO : replace by HTTPS
  pageNumber: 1
}

const getters = {
  pageNumberToGet: state => {
    return '?page='.concat(state.pageNumber)
  },
  adressToGet: state => {
    return state.baseAdress.concat(state.storedFullText).concat(store.getters.optionsToGet)
  },
  optionsToGet: state => {
    return store.getters.pageNumberToGet.concat(store.getters.filtersToGet)
  },
  filtersToGet: state => {
    var filters = ''
    if (store.state.filters.filterPostalCode !== '') {
      filters = filters.concat('&code_postal=').concat(state.filterPostalCode)
    }
    if (store.state.filters.filterActivityCode !== '') {
      filters = filters.concat('&activite_principale=').concat(state.filterActivityCode)
    }
    return filters
  }
}

const mutations = {
  setFullText (state, value) {
    state.storedFullText = value
  },
  executeSearch (state) {
    console.log(store.state.filters.filterPostalCode)
    if (store.getters.infoMessage !== '') {
      return
    }
    store.commit('changeWelcomeTextVisibility', false)
    Vue.http.get(store.getters.adressToGet).then(response => {
      store.state.results.storedStatus = response.status
      store.state.results.storedResults = response.body
    }, response => {
      if (state.pageNumber !== 1) {
        state.pageNumber = 1
        store.commit('executeSearch')
      } else {
        store.state.results.storedStatus = response.status
      }
    })
  },
  executeSearchBySiret (state, siret) {
    Vue.http.get(state.baseAdressSiret.concat(siret)).then(response => {
      store.state.results.singlePageResult = response.body
      // state.storedResults = response.body
    }, response => {
      store.state.results.singlePageResult = null
      // error callback
      // state.baseAdress.concat('?page=1&siret=').concat(siret)
    })
  }
}

export default {
  state,
  getters,
  mutations
}
