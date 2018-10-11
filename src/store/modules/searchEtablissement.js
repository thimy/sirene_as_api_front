import Vue from 'vue'
import store from '@/store/index.js'
import regExps from '@/components/mixins/regExps.js'

const state = {
  baseAdressSiret: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_SIRET,
    'RNA': process.env.BASE_ADRESS_RNA_SIRET
  },
  baseAdressRNAId: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_ID_ASSOCIATION,
    'RNA': process.env.BASE_ADRESS_RNA_ID_ASSOCIATION
  },
  baseAdressSiren: process.env.BASE_ADRESS_SIRENE_SIREN,
}

const actions = {
  async executeSearchEtablissement(dispatch, searchId) {
    await store.dispatch('resetApplicationState')
    const natureSearchId = regExps.methods.analyzeSearchId(searchId)

    switch (natureSearchId) {
      case 'SIRET':
        await store.dispatch('searchEtablissementFromSiret', searchId)
        break
      case 'SIREN':
        await store.dispatch('searchEtablissementFromSiren', searchId)
        break
      case 'ID_ASSOCIATION':
        await store.dispatch('searchEtablissementFromIdAssociation', searchId)
        break
      default:
        store.commit('setNoResultFound', { value: true, api: 'ALL' })
    }
    store.commit('setLoading', { value: false, search: 'ALL' })
  },

  async searchEtablissementFromSiret(dispatch, searchId) {
    await store.commit('setMainSearch', { value: true, search: 'SIRENE' })
    await store.dispatch('executeSearchBySiret', { siret: searchId, api: 'SIRENE' })
    store.dispatch('executeSearchBySiren', store.getters.singlePageEtablissementSirene.siren)
    store.dispatch('fromSireneRequestOtherAPIs', searchId)
  },

  async searchEtablissementFromSiren(dispatch, searchId) {
    await store.commit('setMainSearch', { value: true, search: 'SIRENE' })
    await store.dispatch('executeSearchBySiren', searchId)
    store.dispatch('executeSearchBySiret', { siret: store.getters.storedSirenSiege.siret, api: 'SIRENE' })
    store.dispatch('fromSireneRequestOtherAPIs', store.getters.storedSirenSiege.siret)
  },

  async searchEtablissementFromIdAssociation(dispatch, searchId) {
    store.commit('setMainSearch', { value: true, search: 'RNA' })
    await store.dispatch('executeSearchByIdAssociation', {id: searchId, api: 'RNA'})
    store.dispatch('fromRNARequestOtherAPIs', searchId)
  },

  async executeSearchBySiret(dispatch, { siret, api }) {
    await store.commit('setLoading', { value: true, search: 'SIRET' })
    await store.dispatch('sendAPIRequest', state.baseAdressSiret[api] + siret)
    .then(response => {
      store.dispatch('setResponseEtablissement', {response: response, api: api})
    })
    .catch(notFound => {
      store.dispatch('setResponseEtablissement', {response: notFound, api: api})
    })
    store.commit('setLoading', { value: false, search: 'SIRET' })
  },

  async executeSearchByIdAssociation(dispatch, { id, api }) {
    await store.commit('setLoading', { value: true, search: 'ID_ASSOCIATION' })
    await store.dispatch('sendAPIRequest', state.baseAdressRNAId[api] + id)
      .then(response => {
        store.dispatch('setResponseEtablissement', {response: response, api: api})
      })
      .catch(notFound => {
        store.dispatch('setResponseEtablissement', {response: notFound, api: api})
      })
    store.commit('setLoading', { value: false, search: 'ID_ASSOCIATION' })
  },

  // This function is API-Sirene only
  async executeSearchBySiren(dispatch, siren) {
    await store.commit('setLoading', { value: true, search: 'SIREN' })
    await store.dispatch('sendAPIRequest', dispatch.state.baseAdressSiren + siren)
      .then(response => {
        store.dispatch('setResponseSiren', response)
      })
      .catch((notFound) => {
        store.dispatch('setResponseSiren', notFound)
      })
    store.commit('setLoading', { value: false, search: 'SIREN' })
  },

  sendAPIRequest: async function (dispatch, query) {
    return await Vue.http.get(query)
  }
}

export default {
  state,
  actions
}
