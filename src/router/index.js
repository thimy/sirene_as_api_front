import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import LegalNotes from '@/components/LegalNotes'
import ApiDoc from '@/components/ApiDoc'
import CodesNAF from '@/components/CodesNAF'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      beforeEnter: (to, from, next) => {
        store.commit('changeWelcomeTextVisibility', true)
        next()
      }
    },
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
    },
    {
      path: '/mentions_legales',
      name: 'LegalNotes',
      component: LegalNotes
    },
    {
      path: '/api_doc',
      name: 'ApiDoc',
      component: ApiDoc
    },
    {
      path: '/codes_naf',
      name: 'CodesNAF',
      component: CodesNAF
    },
  ]
})
