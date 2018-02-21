
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import application from './modules/application'
import filters from './modules/filters'
import results from './modules/results'
import resultsSiren from './modules/resultsSiren'
import search from './modules/search'
import suggestions from './modules/suggestions'
import categories from './modules/categories'
import welcomeText from './modules/welcomeText'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  modules: {
    application,
    filters,
    results,
    resultsSiren,
    search,
    suggestions,
    categories,
    welcomeText
  }
})
