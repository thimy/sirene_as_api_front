
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
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
    filters,
    results,
    resultsSiren,
    search,
    suggestions,
    categories,
    welcomeText
  }
})
