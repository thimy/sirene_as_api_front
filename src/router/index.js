import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results'
// import store from '@/store/index.js'
// import Search from '@/components/Search'
import Entreprise from '@/components/Entreprise'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/search?*',
      name: 'Search',
      component: Results
    },
    {
      path: '/search',
      name: 'SearchEmpty',
      component: Results
    },
    {
      path: '/entreprise/:siret',
      name: 'Entreprise',
      component: Entreprise
    }
  ]
})
