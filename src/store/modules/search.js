import Vue from 'vue'
import store from '@/store/index.js'
import router from '@/router/index.js'
import regExps from '@/components/mixins/regExps.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  storedSiret: '',
  pageNumber: 1,

  baseAdressSiret: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_SIRET,
    'RNA': process.env.BASE_ADRESS_RNA_SIRET
  },
  baseAdressFullText: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_FULLTEXT,
    'RNA': process.env.BASE_ADRESS_RNA_FULLTEXT
  },
  baseAdressSireneSiren: process.env.BASE_ADRESS_SIRENE_SIREN,
  baseAdressRNAId: process.env.BASE_ADRESS_RNA_ID
}

const getters = {
  adressToGetFulltext: function (state, api) {
    return state.baseAdressFullText[api] + store.getters.queryToGet
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
    store.dispatch('executeSearchResultsCallAPI', 'SIRENE') //TODO: change here later
  },
  async executeSearchResultsCallAPI(dispatch, api) {
    store.dispatch('sendAPIRequest', store.getters.adressToGetFullText(api))
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
    const natureSearchId = regExps.methods.analyzeSearchId(searchId)

    switch (natureSearchId) {
      case 'SIRET':
        await store.dispatch('executeSearchBySiret', { siret: searchId, api: 'SIRENE' })
        store.dispatch('executeSearchBySiren', store.getters.singlePageEtablissementSirene.siren)
        break
      case 'SIREN':
        await store.dispatch('executeSearchBySiren', searchId)
        store.dispatch('executeSearchBySiret', store.getters.storedSirenSiege.siret)
        break
      case 'ID_ASSOCIATION':
        await store.dispatch('executeSearchByIdAssociation', searchId)
        break
      default:
        store.commit('setNoResultFound', true)
    }
  },
  async executeSearchBySiret(dispatch, { siret, api }) {
    await store.commit('setSiretLoading', true)
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSiret[api] + siret)
    .then(response => {
        store.dispatch('setResponseSinglePage', {response: response, api: api})
      })
      .catch(notFound => {
        store.dispatch('setResponseSinglePage', {response: notFound, api: api})
      })
    store.commit('setSiretLoading', false)
  },
  // This function is API-RNA only
  async executeSearchByIdAssociation(dispatch, id) {
    await store.commit('setIdAssociationLoading', true)
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressRNAId + id)
      .then(response => {
        store.dispatch('setResponseSinglePage', {response: response, api: 'RNA'})
      })
      .catch(notFound => {
        store.dispatch('setResponseSinglePage', {response: notFound, api: 'RNA'})
      })
    store.commit('setIdAssociationLoading', false)
    store.commit('setSirenLoading', false) // TODO: Replace theses lines by complementary search
    store.commit('setSiretLoading', false)
  },
  // This function is API-Sirene only
  async executeSearchBySiren(dispatch, siren) {
    await store.commit('setSirenLoading', true)
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSireneSiren + siren)
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
