import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'

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
      path: '/entreprise/:searchId',
      name: 'Etablissement',
      component: Etablissement
    }
  ]
})
