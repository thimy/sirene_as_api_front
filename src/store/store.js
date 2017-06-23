import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  // actions: {
  // },
  // modules: {
  //
  // }
  state: {
    storedResults: null,
    storedFullText: null,
    baseAdress: 'http://localhost:3000/full_text/',
    testAdress: 'http://localhost:3000/full_text/test' // TODO: virer
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
      if (state.storedResults !== null) {
        return 1
      } else {
        return 0
      }
    },
    adressToGet: state => {
      return store.state.baseAdress.concat(store.state.storedFullText)
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
        state.storedResults = response.body
      }, response => {
        // TODO: error callback
      })
    }
  }
})
export default store
