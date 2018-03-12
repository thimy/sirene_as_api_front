import Search from '@/store/modules/search'
import store from '@/store/index.js'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import router from '@/router/index.js'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('@/store/modules/search.js')
jest.mock('@/store/index.js', () => ({
  getters: {
    queryToGet: 'mock-query-',
    optionsToGet: 'mock-options-',
    pageNumberToGet: 'mock-pageNumberToGet-'
  },
  state: {
    route: {
      query: {
        fullText: 'mock-fullText-',
        page: 'mock-pageNumber-'
      }
    }
  },
  commit: jest.fn(),
  dispatch: jest.fn()
}))

jest.mock('@/router/index.js', () => ({
  push: jest.fn()
}))

describe('search.js getters', () => {

  // This state is in the tested module and therefore is separated from outside module mocks
  const state = {
    baseAdress: 'http://mock-domain.com/'
  }

  test('The adress getter gets the right adress', () => {
    expect(Search.getters.adressToGet(state)).toBe('http://mock-domain.com/mock-query-')
  })

  test('The query getter builds the query correctly', () => {
    expect(Search.getters.queryToGet()).toBe('mock-fullText-mock-options-')
  })

  test('The page getter gets the right page string', () => {
    expect(Search.getters.pageNumberToGet()).toBe('?page=mock-pageNumber-')
  })

  test('The options getter gets the right options', () => {
    expect(Search.getters.optionsToGet()).toBe('mock-pageNumberToGet-')
  })
})

describe('search.js actions', () => {
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

  test('Action executeSearchResult launch a reset of the application state')
  test('Action executeSearchResult set up loading screen then unset it')
  test('Action executeSearchResult send a request to the API')
  test('Action executeSearchResult: if the API call is successful, set the right response')
  test("Action executeSearchResult: if the API call is NOT successful,\
    and pageNumber > 1, sets the page to 1 and execute search")
  test("Action executeSearchResult: if the API call is NOT successful,\
    and pageNumber < 1, sets the negative response")
})
