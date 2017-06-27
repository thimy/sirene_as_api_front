import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storedResults: null,
    storedStatus: null,
    storedFullText: '',
    baseAdress: 'http://localhost:3000/full_text/',
    pageNumber: 1
  },
  getters: {
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
      return '?page='.concat(store.state.pageNumber)
    },
    adressToGet: state => {
      return store.state.baseAdress.concat(store.state.storedFullText).concat(store.getters.pageNumberToGet)
    }
  },
  mutations: {
    setResults (state, value) {
      state.storedResults = value
    },
    clearResults (state) {
      state.storedResults = null
    },
    setFullText (state, value) {
      state.storedFullText = value
    },
    executeSearch (state) {
      Vue.http.get(store.getters.adressToGet).then(response => {
        state.storedStatus = response.status
        state.storedResults = response.body
      }, response => {
        state.storedStatus = response.status
      })
    }
  }
})
export default store
