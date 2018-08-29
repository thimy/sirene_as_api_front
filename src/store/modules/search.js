// TODO: Factorize this : searchFullText, searchEtablissement
import Vue from 'vue'
import store from '@/store/index.js'
import router from '@/router/index.js'
import regExps from '@/components/mixins/regExps.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  pageNumber: 1,

  baseAdressSiret: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_SIRET,
    'RNA': process.env.BASE_ADRESS_RNA_SIRET
  },
  baseAdressFullText: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_FULLTEXT,
    'RNA': process.env.BASE_ADRESS_RNA_FULLTEXT
  },
  baseAdressRNAId: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_ID_ASSOCIATION,
    'RNA': process.env.BASE_ADRESS_RNA_ID_ASSOCIATION
  },
  baseAdressSireneSiren: process.env.BASE_ADRESS_SIRENE_SIREN,
}

const getters = {
  adressToGetFullText: function (state, api) {
    return state.baseAdressFullText[api] + store.getters.queryToGet
  },
  queryToGet: () => {
    return store.state.route.query.fullText + store.getters.optionsToGet
  },
  pageNumberToGet: state => {
    return '?page=' + state.pageNumber
  },
  optionsToGet: () => {
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
  setPage (state, value) {
    state.pageNumber = value
  }
}

const actions = {
  requestSearchFullText () {
    router.push({ path: '/search',
      query: {
        fullText: state.storedFullText,
        page: state.pageNumber
      }
    })
    store.dispatch('executeSearchFullText')
    // We save the last fulltext searched, so Results page display correctly name of last search
    store.commit('setLastFullText', state.storedFullText)
  },
  async executeSearchFullText () {
    await store.dispatch('resetApplicationState')
    await store.commit('setLoading', { value: true, search: 'RESULTS' })
    await store.dispatch('searchFullTextCallAPI', 'SIRENE') //TODO: change here later for multiple-api fulltext
    store.commit('setLoading', { value: false, search: 'RESULTS' })
  },
  async searchFullTextCallAPI(dispatch, api) {
    store.dispatch('sendAPIRequest', getters.adressToGetFullText(state, api))
      .then(response => {
        store.dispatch('setResponseFullText', response)
      })
      .catch(async notFound => {
        if (state.pageNumber > 1) {
          await store.commit('setPage', 1)
          store.dispatch('requestSearchFullText')
        } else {
          store.dispatch('setResponseFullText', notFound)
        }
      })
  },
  async executeSearchEtablissement(dispatch, searchId) {
    await store.dispatch('resetApplicationState')
    const natureSearchId = regExps.methods.analyzeSearchId(searchId)

    switch (natureSearchId) {
      case 'SIRET':
        store.commit('setMainSearch', { value: true, search: 'SIRENE' })
        await store.dispatch('executeSearchBySiret', { siret: searchId, api: 'SIRENE' })
        store.dispatch('executeSearchBySiren', store.getters.singlePageEtablissementSirene.siren)
        store.dispatch('fromSireneRequestOtherAPIs', searchId)
        break
      case 'SIREN':
        store.commit('setMainSearch', { value: true, search: 'SIRENE' })
        await store.dispatch('executeSearchBySiren', searchId)
        store.dispatch('executeSearchBySiret', { siret: store.getters.storedSirenSiege.siret, api: 'SIRENE' })
        store.dispatch('fromSireneRequestOtherAPIs', store.getters.storedSirenSiege.siret)
        break
      case 'ID_ASSOCIATION':
        store.commit('setMainSearch', { value: true, search: 'RNA' })
        await store.dispatch('executeSearchByIdAssociation', {id: searchId, api: 'RNA'})
        store.dispatch('fromRNARequestOtherAPIs', searchId)
        break
      default:
        store.commit('setNoResultFound', { value: true, api: 'ALL' })
    }
    store.commit('setLoading', { value: false, search: 'ALL' })
  },
  async executeSearchBySiret(dispatch, { siret, api }) {
    await store.commit('setLoading', { value: true, search: 'SIRET' })
    await store.dispatch('sendAPIRequest', state.baseAdressSiret[api] + siret)
    .then(response => {
      store.dispatch('setResponseSinglePage', {response: response, api: api})
    })
    .catch(notFound => {
      store.dispatch('setResponseSinglePage', {response: notFound, api: api})
    })
    store.commit('setLoading', { value: false, search: 'SIRET' })
  },
  async executeSearchByIdAssociation(dispatch, { id, api }) {
    await store.commit('setLoading', { value: true, search: 'ID_ASSOCIATION' })
    await store.dispatch('sendAPIRequest', state.baseAdressRNAId[api] + id)
      .then(response => {
        store.dispatch('setResponseSinglePage', {response: response, api: api})
      })
      .catch(notFound => {
        store.dispatch('setResponseSinglePage', {response: notFound, api: api})
      })
    store.commit('setLoading', { value: false, search: 'ID_ASSOCIATION' })
  },
  // This function is API-Sirene only
  async executeSearchBySiren(dispatch, siren) {
    await store.commit('setLoading', { value: true, search: 'SIREN' })
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSireneSiren + siren)
      .then(response => {
        store.commit('setSirenResults', response.body)
      })
      .catch((notFound) => {
        store.commit('setSirenResults', notFound)
      })
    store.commit('setLoading', { value: false, search: 'SIREN' })
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
