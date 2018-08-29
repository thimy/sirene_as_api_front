import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import LegalNotes from '@/components/LegalNotes'
import ApiDocSirene from '@/components/ApiDocSirene'
import CodesNAF from '@/components/apiDocSirene/CodesNAF'
import ApiDocRNA from '@/components/ApiDocRNA'

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
      path: '/etablissement/:searchId',
      name: 'Etablissement',
      component: Etablissement
    },
    {
      path: '/mentions_legales',
      name: 'LegalNotes',
      component: LegalNotes
    },
    {
      path: '/api_doc_sirene',
      name: 'ApiDocSirene',
      component: ApiDocSirene
    },
    {
      path: '/api_doc_rna',
      name: 'ApiDocRNA',
      component: ApiDocRNA
    },
    {
      path: '/codes_naf',
      name: 'CodesNAF',
      component: CodesNAF
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when arriving on a component
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0}
    }
  }
})
