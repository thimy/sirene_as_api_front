import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storedResults: null,
    singlePageResult: null,
    storedStatus: null,
    storedFullText: '',
    baseAdress: 'http://localhost:3000/full_text/',
    baseAdressSiret: 'http://localhost:3000/siret/',
    pageNumber: 1,
    filterPostalCode: '',
    filterActivityCode: ''
  },
  getters: {
    singlePageResultEtablissement: state => {
      if (state.singlePageResult !== null) {
        return state.singlePageResult.etablissement
      } else {
        return null
      }
    },
    infoMessage: state => {
      var postalCodeLength = String(state.filterPostalCode).length
      if (postalCodeLength !== 5 && postalCodeLength !== 0) {
        return 'En attente du code postal...'
      } else {
        return ''
      }
    },
    storedResultsEtablissements: state => {
      if (state.storedResults !== null) {
        return state.storedResults.etablissement
      } else {
        return null
      }
    },
    numberResults: state => {
      if (state.storedStatus === 404) {
        store.commit('clearResults')
        return 0
      } else if (state.storedResults !== null) {
        return state.storedResults.total_results
      }
    },
    totalPageNumber: state => {
      if (state.storedResults !== null) {
        return state.storedResults.total_pages
      }
    },
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
      if (state.filterPostalCode !== '') {
        filters = filters.concat('&code_postal=').concat(state.filterPostalCode)
      }
      if (state.filterActivityCode !== '') {
        filters = filters.concat('&activite_principale=').concat(state.filterActivityCode)
      }
      return filters
    }
  },
  mutations: {
    setResults (state, value) {
      state.storedResults = value
    },
    clearResults (state) {
      state.storedResults = null
    },
    clearFilters (state) {
      state.filterPostalCode = ''
      state.filterActivityCode = ''
    },
    setFullText (state, value) {
      state.storedFullText = value
    },
    setSearchFilters (state, filterSearch) {
      if (filterSearch.name === 'Code Postal') {
        state.filterPostalCode = filterSearch.value
      }
      if (filterSearch.name === 'Activite Principale') {
        state.filterActivityCode = filterSearch.value
      }
    },
    executeSearch (state) {
      if (store.getters.infoMessage !== '') {
        return
      }
      Vue.http.get(store.getters.adressToGet).then(response => {
        state.storedStatus = response.status
        state.storedResults = response.body
      }, response => {
        if (state.pageNumber !== 1) {
          state.pageNumber = 1
          store.commit('executeSearch')
        } else {
          state.storedStatus = response.status
        }
      })
    },
    executeSearchBySiret (state, siret) {
      Vue.http.get(store.state.baseAdressSiret.concat(siret)).then(response => {
        state.singlePageResult = response.body
        // state.storedResults = response.body
      }, response => {
        state.singlePageResult = null
        // error callback
        // store.state.baseAdress.concat('?page=1&siret=').concat(siret)
      })
    }
  }
})
export default store
