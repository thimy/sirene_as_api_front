import Vue from 'vue'
import store from '@/store/index.js'
import router from '@/router/index.js'
import regExps from '@/components/mixins/regExps.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  storedSiret: '',
  pageNumber: 1,
  baseAdress: process.env.BASE_ADRESS_SIRENE_FULLTEXT,
  baseAdressSiret: process.env.BASE_ADRESS_SIRENE_SIRET,
  baseAdressSiren: process.env.BASE_ADRESS_SIRENE_SIREN
}

const getters = {
  adressToGet: state => {
    return state.baseAdress + store.getters.queryToGet
  },
  queryToGet: state => {
    return store.state.route.query.fullText + store.getters.optionsToGet
  },
  pageNumberToGet: state => {
    return '?page=' + state.pageNumber
  },
  optionsToGet: state => {
    return store.getters.pageNumberToGet
  },
  storedFullText: state => {
    return state.storedFullText
  },
  pageNumber: state => {
    return state.pageNumber
  }
}

const mutations = {
  setFullText (state, value) {
    state.storedFullText = value
  },
  setLastFullText (state, value) {
    state.storedLastFullText = value
  },
  setSiret (state, value) {
    state.storedSiret = value
  },
  setPage (state, value) {
    state.pageNumber = value
  }
}

const actions = {
  requestSearch () {
    router.push({ path: '/search',
      query: {
        fullText: state.storedFullText,
        page: state.pageNumber
      }
    })
    store.dispatch('executeSearchResults')
    // We save the last fulltext searched, so Results page display correctly name of last search
    store.commit('setLastFullText', state.storedFullText)
  },
  // Calling this action directly won't update the router
  async executeSearchResults () {
    await store.dispatch('resetApplicationState')
    // We start the loader here and stop later during action setResponse
    await store.commit('setResultsAreLoading', true)
    store.dispatch('executeSearchResultsCallAPI')
  },
  async executeSearchResultsCallAPI() {
    store.dispatch('sendAPIRequest', store.getters.adressToGet)
      .then(response => {
        store.dispatch('setResponse', response)
      })
      .catch(async notFound => {
        if (state.pageNumber > 1) {
          await store.commit('setPage', 1)
          store.dispatch('requestSearch')
        } else {
          store.dispatch('setResponse', notFound)
        }
      })
  },
  async executeSearchEtablissement(dispatch, searchId) {
    await store.dispatch('resetApplicationState')
    const isSiret = regExps.methods.isSiret(searchId)
    const isSiren = regExps.methods.isSiren(searchId)
    // const isAssociationID = regExps.methods.isAssociationID(searchId)

    if (isSiret) {
      await store.dispatch('executeSearchBySiret', searchId)
      store.dispatch('executeSearchBySiren', store.getters.singlePageEtablissementSirene.siren)
    } else if (isSiren) {
      await store.dispatch('executeSearchBySiren', searchId)
      store.dispatch('executeSearchBySiret', store.getters.storedSirenSiege.siret)
    } else {
      store.commit('setNoResultFound', true)
    }
  },
  async executeSearchBySiret(dispatch, siret) {
    await store.commit('setSiretLoading', true)
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSiret + siret)
    .then(response => {
        store.dispatch('setResponseSinglePage', {response: response, api: 'SIRENE'})
      })
      .catch(notFound => {
        store.dispatch('setResponseSinglePage', {response: notFound, api: 'SIRENE'})
      })
    store.commit('setSiretLoading', false)
  },
  async executeSearchBySiren(dispatch, siren) {
    await store.commit('setSirenLoading', true)
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSiren + siren)
      .then(response => {
        store.dispatch('setResponseSiren', response)
      })
      .catch((notFound) => {
        store.dispatch('setResponseSiren', notFound)
      })
    store.commit('setSirenLoading', false)
  },
  sendAPIRequest: async function (dispatch, query) {
    return await Vue.http.get(query)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
