import Search from '@/store/modules/search'
import store from '@/store/index.js'
import router from '@/router/index.js'
import Vue from 'vue'

jest.mock('@/store/modules/search.js')
jest.mock('@/store/index.js', () => ({
  getters: {
    adressToGet: 'mock-adressToGet-',
    queryToGet: 'mock-query-',
    optionsToGet: 'mock-options-',
    pageNumberToGet: 'mock-pageNumberToGet-',
    singlePageResultEtablissement: {
      siren: 'mock-siren'
    },
    storedSirenSiege: {
      siret: 'mock-siret'
    }
  },
  state: {
    pageNumber: 1,
    route: {
      query: {
        fullText: 'mock-fullText-',
        page: 'mock-pageNumber-'
      }
    }
  },
  commit: jest.fn(),
  dispatch: jest.fn()
    .mockImplementation(function () { return Promise.resolve('good-dispatch') })
}))

jest.mock('@/router/index.js', () => ({
  push: jest.fn()
}))


describe('search.js getters', () => {
  // This state is in the tested module and therefore is separated from outside module mocks
  const state = {
    baseAdress: 'http://mock-domain.com/',
    pageNumber: 'mock-pageNumber-'
  }

  test('The adress getter gets the right adress', () => {
    expect(Search.getters.adressToGet(state)).toBe('http://mock-domain.com/mock-query-')
  })

  test('The query getter builds the query correctly', () => {
    expect(Search.getters.queryToGet()).toBe('mock-fullText-mock-options-')
  })

  test('The page getter gets the right page string', () => {
    expect(Search.getters.pageNumberToGet(state)).toBe('?page=mock-pageNumber-')
  })

  test('The options getter gets the right options', () => {
    expect(Search.getters.optionsToGet()).toBe('mock-pageNumberToGet-')
  })
})

describe('search.js mutations', () => {
  const state = {
    storedFullText: 0,
    storedLastFullText: 0,
    storedSiret: 0,
    pageNumber: 0
  }
  test('The setFullText mutation works', () => {
    Search.mutations.setFullText(state, 1)
    expect(state.storedFullText).toBe(1)
  })

  test('The setLastFullText mutation works', () => {
    Search.mutations.setLastFullText(state, 1)
    expect(state.storedLastFullText).toBe(1)
  })

  test('The setSiret mutation works', () => {
    Search.mutations.setSiret(state, 1)
    expect(state.storedSiret).toBe(1)
  })

  test('The setPage mutation works', () => {
    Search.mutations.setPage(state, 1)
    expect(state.pageNumber).toBe(1)
  })
})

describe('search.js action requestSearch', () => {
  test('Action requestSearch launch a search', () => {
    Search.actions.requestSearch()
    expect(store.dispatch).toHaveBeenCalledWith('executeSearchResults')
  })

  test('Action requestSearch set fullText as lastFullText', () => {
    Search.state.storedFullText = 'mock-storedFullText'
    Search.actions.requestSearch()
    expect(store.commit).toHaveBeenCalledWith('setLastFullText', 'mock-storedFullText')
  })

  test('Action requestSearch push the router with the right params', () =>{
    Search.state.storedFullText = 'mock-storedFullText'
    Search.state.pageNumber = 'mock-pageNumber'
    const push_params = {
      path: '/search',
      query: {
        fullText: 'mock-storedFullText',
        page: 'mock-pageNumber'
      }
    }
    Search.actions.requestSearch()
    expect(router.push).toHaveBeenCalledWith(push_params)
  })
})

describe('search.js action executeSearchResults', () => {
  test('Action executeSearchResults set up loading screen then unset it', done => {
    Search.actions.executeSearchResults().then(() => {
      expect(store.commit).toHaveBeenCalledWith('setResultsAreLoading', true)
      expect(store.commit).toHaveBeenCalledWith('setResultsAreLoading', false)
      done()
    })
  })

  test('Action executeSearchResults launch a reset of the application state', done => {
    Search.actions.executeSearchResults().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('resetApplicationState')
      done()
    })
  })

  test('Action executeSearchResults call the API caller function', done => {
    Search.actions.executeSearchResults().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchResultsCallAPI')
      done()
    })
  })

  test('Action executeSearchResultsCallAPI send a request to the API', done => {
    Search.actions.executeSearchResultsCallAPI().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('sendAPIRequest', 'mock-adressToGet-')
      done()
    })
  })

  test('Action executeSearchResultsCallAPI: if the API call is successful, set the right response', () => {
    Search.actions.executeSearchResultsCallAPI().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponse', 'good-dispatch')
    })
  })

  test("Action executeSearchResultsCallAPI: if the API call is NOT successful, and pageNumber = 1,\
  sets the negative response", () => {
    store.dispatch = jest.fn()
      .mockImplementation(function () { return Promise.resolve('good-dispatch') })
      .mockImplementationOnce(function () { return Promise.reject('bad-dispatch') })
    Search.actions.executeSearchResultsCallAPI().catch(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponse', 'bad-dispatch')
    })
  })

  test("Action executeSearchResultsCallAPI: if the API call is NOT successful, and pageNumber > 1,\
  sets the page to 1 and execute search", () => {
    store.state.pageNumber = 2
    store.dispatch = jest.fn()
      .mockImplementation(function () { return Promise.resolve('good-dispatch') })
      .mockImplementationOnce(function () { return Promise.reject('bad-dispatch') })

    Search.actions.executeSearchResultsCallAPI().catch(() => {
      expect(store.commit).toHaveBeenCalledWith('setPage', 1)
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchResultsCallAPI')
    })
  })
})

jest.mock('@/components/mixins/regExps.js', () => ({
  methods: {
    isSiret: jest.fn().mockImplementation(() => { return true })
      .mockImplementationOnce(() => { return true })
      .mockImplementationOnce(() => { return true })
      .mockImplementationOnce(() => { return false })
      .mockImplementationOnce(() => { return false }),
    isSiren: jest.fn().mockImplementation(() => { return true })
      .mockImplementationOnce(() => { return true })
      .mockImplementationOnce(() => { return false })
      .mockImplementationOnce(() => { return true })
      .mockImplementationOnce(() => { return false }),
  }
}))

// Warning : Because of mockImplementationOnce, the test order here is important
describe('search.js action  executeSearchEtablissement', () => {
  const searchId = 'mock-searchId'
  const dispatch = 'mock-dispatch'
  test('isSiret true, isSiren true', done => {
    Search.actions.executeSearchEtablissement(dispatch, searchId).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiret', 'mock-searchId')
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiren', 'mock-siren')
      done()
    })
  })

  test('isSiret true, isSiren false', done => {
    Search.actions.executeSearchEtablissement(dispatch, searchId).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiret', 'mock-searchId')
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiren', 'mock-siren')
      done()
    })
  })

  test('isSiret false, isSiren true', done => {
    Search.actions.executeSearchEtablissement(dispatch, searchId).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiren', 'mock-searchId')
      expect(store.dispatch).toHaveBeenCalledWith('executeSearchBySiret', 'mock-siret')
      done()
    })
  })

  test('isSiret false, isSiren false', done => {
    Search.actions.executeSearchEtablissement(dispatch, searchId).then(() => {
      expect(store.commit).toHaveBeenCalledWith('setNoResultFound', true)
      done()
    })
  })

  test('action executeSearchEtablissement launch a reset of the application state', done => {
    Search.actions.executeSearchEtablissement().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('resetApplicationState')
      done()
    })
  })
})

describe('search.js action  executeSearchBySiret', () => {
  const siret = 'mock-siret'
  const dispatch = {
    state: {
      baseAdressSiret: 'mock-baseAdressSiret-',
      baseAdressSiren: 'mock-baseAdressSiren-'
    }
  }
  test('Sets the siret loading on and then unset it', done => {
    Search.actions.executeSearchBySiret(dispatch, siret).then(() => {
      expect(store.commit).toHaveBeenCalledWith('setSiretLoading', true)
      expect(store.commit).toHaveBeenCalledWith('setSiretLoading', false)
      done()
    })
  })

  test('It calls sendAPIrequest', done => {
    Search.actions.executeSearchBySiret(dispatch, siret).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('sendAPIRequest', 'mock-baseAdressSiret-mock-siret')
      done()
    })
  })

  test('It sets the correct response if successful', done => {
    Search.actions.executeSearchBySiret(dispatch, siret).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponseSinglePage', 'good-dispatch')
      done()
    })
  })

  test('It sets the response if unsuccessful', () => {
    store.dispatch = jest.fn()
      .mockImplementation(function () { return Promise.resolve('good-dispatch') })
      .mockImplementationOnce(function () { return Promise.reject('bad-dispatch') })
    Search.actions.executeSearchBySiret(dispatch, siret).catch(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponseSinglePage', 'bad-dispatch')
    })
  })
})

describe('search.js action  executeSearchBySiren', () => {
  const siren = 'mock-siren'
  const dispatch = {
    state: {
      baseAdressSiret: 'mock-baseAdressSiret-',
      baseAdressSiren: 'mock-baseAdressSiren-'
    }
  }
  test('Sets the siren loading on and then unset it', done => {
    Search.actions.executeSearchBySiren(dispatch, siren).then(() => {
      expect(store.commit).toHaveBeenCalledWith('setSirenLoading', true)
      expect(store.commit).toHaveBeenCalledWith('setSirenLoading', false)
      done()
    })
  })

  test('It calls sendAPIrequest', done => {
    Search.actions.executeSearchBySiren(dispatch, siren).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('sendAPIRequest', 'mock-baseAdressSiren-mock-siren')
      done()
    })
  })

  test('It sets the correct response when successful', done => {
    Search.actions.executeSearchBySiren(dispatch, siren).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponseSiren', 'good-dispatch')
      done()
    })
  })

  test('It sets the response if unsuccessful', () => {
    store.dispatch = jest.fn()
      .mockImplementation(function () { return Promise.resolve('good-dispatch') })
      .mockImplementationOnce(function () { return Promise.reject('bad-dispatch') })

    Search.actions.executeSearchBySiren(dispatch, siren).catch(() => {
      expect(store.dispatch).toHaveBeenCalledWith('setResponseSiren', 'bad-dispatch')
    })
  })
})

jest.mock('vue', () => ({
  http: {
    get: jest.fn().mockImplementation((query) => query + '-was-called')
  }
}))

describe('search.js action  sendAPIRequest', () => {
  const query = 'mock-query'
  const dispatch = 'mock-dispatch'
  test('It calls Vue http query', () => {
    Search.actions.sendAPIRequest(dispatch, query)
    expect(Vue.http.get).toHaveBeenCalledWith(query)
  })
})