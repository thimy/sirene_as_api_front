
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import application from './modules/application'
import results from './modules/results'
import resultsSiren from './modules/resultsSiren'
import search from './modules/search'
import suggestions from './modules/suggestions'
import welcomeText from './modules/welcomeText'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  modules: {
    application,
    results,
    resultsSiren,
    search,
    suggestions,
    welcomeText
  }
})
