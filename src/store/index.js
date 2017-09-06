
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import filters from './modules/filters'
import results from './modules/results'
import search from './modules/search'
import welcomeText from './modules/welcomeText'

// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)
Vue.use(VueResource)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    filters,
    results,
    search,
    welcomeText
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
