import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Entreprise from '@/components/Entreprise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/entreprise/:siret',
      name: 'Entreprise',
      component: Entreprise
    }
  ]
})
