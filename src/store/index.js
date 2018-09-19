
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import application from './modules/application'
import results from './modules/results'
import resultsSirenChildren from './modules/resultsSirenChildren'
import searchFullText from './modules/searchFullText'
import searchEtablissement from './modules/searchEtablissement'
import searchAdditionalInfo from './modules/searchAdditionalInfo'
import suggestions from './modules/suggestions'
import welcomeText from './modules/welcomeText'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  modules: {
    application,
    results,
    resultsSirenChildren,
    searchFullText,
    searchEtablissement,
    searchAdditionalInfo,
    suggestions,
    welcomeText
  }
})
