import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import LegalNotes from '@/components/LegalNotes'
import ApiDoc from '@/components/ApiDoc'
import ApiDocSirene from '@/components/apiDoc/ApiDocSirene'
import ApiDocRNA from '@/components/apiDoc/ApiDocRNA'
import CodesNAF from '@/components/apiDoc/apiDocSirene/CodesNAF'

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
      path: '/api_doc',
      name: 'ApiDoc',
      component: ApiDoc
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
