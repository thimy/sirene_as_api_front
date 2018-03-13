import Vue from 'vue'
import store from '@/store/index.js'
import router from '@/router/index.js'
import regExps from '@/components/mixins/regExps.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  storedSiret: '',
  pageNumber: 1,
  baseAdress: process.env.BASE_ADRESS,
  baseAdressSiret: process.env.BASE_ADRESS_SIRET,
  baseAdressSiren: process.env.BASE_ADRESS_SIREN
}

const getters = {
  adressToGet: state => {
    return state.baseAdress + store.getters.queryToGet
  },
  queryToGet: state => {
    return store.state.route.query.fullText + store.getters.optionsToGet
  },
  pageNumberToGet: state => {
    return '?page=' + store.state.route.query.page
  },
  optionsToGet: state => {
    return store.getters.pageNumberToGet
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
    await store.commit('setResultsAreLoading', true)
    await store.dispatch('executeSearchResultsCallAPI')
    store.commit('setResultsAreLoading', false)
  },
  async executeSearchResultsCallAPI() {
    store.dispatch('sendAPIRequest', store.getters.adressToGet)
      .then(response => {
        store.dispatch('setResponse', response)
      })
      .catch(notFound => {
        if (store.state.pageNumber > 1) {
          store.commit('setPage', 1)
          store.dispatch('executeSearchResultsCallAPI')
        } else {
          store.dispatch('setResponse', notFound)
        }
      })
  },
  async executeSearchEtablissement(dispatch, searchId) {
    await store.dispatch('resetApplicationState')
    const isSiret = regExps.methods.isSiret(searchId)
    const isSiren = regExps.methods.isSiren(searchId)

    if (isSiret) {
      await store.dispatch('executeSearchBySiret', searchId)
      store.dispatch('executeSearchBySiren', store.getters.singlePageResultEtablissement.siren)
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
        store.dispatch('setResponseSinglePage', response)
      })
      .catch(notFound => {
        store.dispatch('setResponseSinglePage', notFound)
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
