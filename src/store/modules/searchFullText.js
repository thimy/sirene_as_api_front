import store from '@/store/index.js'
import router from '@/router/index.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  pageNumber: 1,

  baseAdressFullText: {
    'SIRENE': process.env.BASE_ADRESS_SIRENE_FULLTEXT,
    'RNA': process.env.BASE_ADRESS_RNA_FULLTEXT
  }
}

const getters = {
  adressToGetFullText: (state, api) => {
    return state.baseAdressFullText[api] + store.getters.queryToGet
  },
  queryToGet: () => {
    return store.state.route.query.fullText + store.getters.optionsToGet
  },
  pageNumberToGet: state => {
    return '?per_page=5&page=' + state.pageNumber
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
  async requestSearchFullText () {
    router.push({ path: '/search',
      query: {
        fullText: state.storedFullText,
        page: state.pageNumber
      }
    })
    store.dispatch('searchFullText')
    // We save the last fulltext searched, so Results page display correctly name of last search
    store.commit('setLastFullText', state.storedFullText)
  },

  async searchFullText () {
    await store.dispatch('resetApplicationState')
    await store.commit('setLoading', { value: true, search: 'FULLTEXT' })
    store.dispatch('executeSearchFullText', 'SIRENE')
    store.dispatch('executeSearchFullText', 'RNA')
  },

  async executeSearchFullText(dispatch, api) { // TODO: Find alternatives to commented code (doesnt work with double fulltext)
    store.dispatch('sendAPIRequest', getters.adressToGetFullText(state, api))
      .then(response => {
        store.dispatch('setResponseFullText', { response: response, api: api })
      })
      .catch(async notFound => {
        // if (state.pageNumber > 1) {
        //   await store.commit('setPage', 1)
        //   store.dispatch('requestSearchFullText')
        // } else {
        store.dispatch('setResponseFullText', { response: notFound, api: api })
        // }
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}