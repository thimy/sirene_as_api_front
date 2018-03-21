import Search from '@/components/Search.vue'
import { createLocalVue, shallow, mount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')
jest.mock('@/router/index.js')

describe('Results.vue', () => {
  let storeMocks
  let wrapperSearch
  let search
  let $route

  beforeEach(() => {
    $route = {
      params: 'mock-params',
      push: jest.fn(),
      path: 'mock-path',
      query: {
        page: 2,
        fullText: 'mock-fullText'
      }
    }

    storeMocks = createStoreMocks()

    wrapperSearch = shallow(Search, {
      localVue,
      store: storeMocks.store,
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    search = wrapperSearch.vm
  })

  test('$route is watched, and will requestSearch if there is a fullText', () => {
    wrapperSearch.update(() => {
      expect(wrapperSearch.vm.$store.actions.requestSearch.mock.calls).toHaveLength(0)
    })
  })

  test('$route is watched, but wont requestSearch if there is not a fullText', () => {
    wrapperSearch = shallow(Search, {
      localVue,
      store: new Vuex.Store({
        state: storeMocks.state,
        getters: storeMocks.getters,
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearch: jest.fn()
        }
      }),
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    wrapperSearch.update(() => {
      expect(wrapperSearch.vm.$store.actions.requestSearch.mock.calls).toHaveLength(0)
    })
  })

  test('Computed value isSearchNotEmpty check if search is not empty', () => {
    storeMocks.store.state.storedFullText = ''
    wrapperSearch.update()
    expect(wrapperSearch.vm.isSearchNotEmpty).toBeFalsy()
    storeMocks.store.state.storedFullText = 'placeholder'
    wrapperSearch.update()
    expect(wrapperSearch.vm.isSearchNotEmpty).toBeTruthy()
  })

  test('Computed value showWelcomeText works', () => {
    expect(search.showWelcomeText).toBe(search.$store.state.welcomeText.isWelcomeTextVisible)
  })

  test('Computed value showBackToResultsButton is truthy only on etablissement page, \
      if numberResults > 1, and storedStatus === 200', () => {
    $route = {
      params: 'mock-params',
      push: jest.fn(),
      path: '/entreprise/mock-searchId',
      query: {
        page: 2,
        fullText: 'mock-fullText'
      }
    }
    wrapperSearch = shallow(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            storedStatus: 200
          },
          search: {
            storedFullText: 'mock-storedFullText'
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearch: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        },
      }),
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    expect(wrapperSearch.vm.showBackToResultsButton).toBeTruthy()
  })

  test('Computed value showBackToResultsButton is falsy if not on etablissement page, \
      if numberResults > 1, and storedStatus === 200', () => {
    $route = {
      params: 'mock-params',
      push: jest.fn(),
      path: '/results/mock-params',
      query: {
        page: 2,
        fullText: 'mock-fullText'
      }
    }
    wrapperSearch = shallow(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            storedStatus: 200
          },
          search: {
            storedFullText: 'mock-storedFullText'
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearch: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        },
      }),
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy()
  })

  test('Computed value showBackToResultsButton is falsy if on etablissement page, \
    if numberResults === 1, and storedStatus === 200', () => {
    $route = {
      params: 'mock-params',
      push: jest.fn(),
      path: '/results/mock-params',
      query: {
        page: 2,
        fullText: 'mock-fullText'
      }
    }
    wrapperSearch = shallow(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            storedStatus: 200
          },
          search: {
            storedFullText: 'mock-storedFullText'
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearch: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        },
      }),
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy()
  })
  test('Computed value showBackToResultsButton is falsy only on etablissement page, \
    if numberResults > 1, and storedStatus !== 200', () => {
    $route = {
      params: 'mock-params',
      push: jest.fn(),
      path: '/entreprise/mock-searchId',
      query: {
        page: 2,
        fullText: 'mock-fullText'
      }
    }
    wrapperSearch = shallow(Search, {
      localVue,
      store: new Vuex.Store({
        state: {
          welcomeText: {
            isWelcomeTextVisible: true
          },
          results: {
            storedStatus: 404
          },
          search: {
            storedFullText: 'mock-storedFullText'
          }
        },
        mutations: {
          setPage: jest.fn(),
          setFullText: jest.fn()
        },
        actions: {
          requestSearch: jest.fn()
        },
        getters: {
          numberResults: jest.fn().mockReturnValue(2)
        },
      }),
      mocks: { $route },
      stubs: ['router-link', 'router-view']
    })
    expect(wrapperSearch.vm.showBackToResultsButton).toBeFalsy()
  })

  test('At creation, if there is a query page, we set the correct page', () => {
    expect(storeMocks.mutations.setPage).toHaveBeenCalledWith(storeMocks.state, 2)
  })

  test('At creation, if there is fullText in route query, we set it and launch search', () => {
    expect(storeMocks.mutations.setFullText).toHaveBeenCalledWith(storeMocks.state, 'mock-fullText')
    expect(storeMocks.actions.requestSearch).toHaveBeenCalled()
  })

  // TODO: test when router-link will be testable
  test('Clicking back to results buttons goes back to result page')
})

describe('Search.vue snapshot', () => {
  const storeMocks = createStoreMocks()

  const $route = {
    params: 'mock-params',
    push: jest.fn(),
    path: 'mock-path',
    query: {
      page: 2,
      fullText: 'mock-fullText'
    }
  }

  const wrapperSearch = mount(Search, {
    localVue,
    store: storeMocks.store,
    mocks: { $route },
    stubs: ['router-link', 'router-view']
  })

  test('It match the snapshot when there arent results', () => {
    expect(wrapperSearch.vm.$el).toMatchSnapshot()
  })

  // TODO: test when router-link will be testable
  test('It match the snapshot when there are results')
})