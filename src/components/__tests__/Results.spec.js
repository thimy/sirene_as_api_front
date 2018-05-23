import Results from '@/components/Results.vue'
import { createLocalVue, shallow, mount, RouterLinkStub } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('Results.vue', () => {
  let storeMocks
  let wrapperResults
  let results
  let $router
  
  beforeEach(() => {
    $router = {
      params: 'mock-params',
      push: jest.fn()
    }

    storeMocks = createStoreMocks()
    
    wrapperResults = shallow(Results, {
      localVue,
      store: storeMocks.store,
      stubs: ['router-link', 'router-view'],
      mocks: { $router }
    })
    results = wrapperResults.vm
  })

  test('Computed value isSearchNotEmpty check if search is not empty', () =>{
    storeMocks.store.state.search.storedFullText = ''
    expect(results.isSearchNotEmpty).toBeFalsy()
    storeMocks.store.state.search.storedFullText = 'placeholder'
    expect(results.isSearchNotEmpty).toBeTruthy()
  })

  test('Computed value storedResultsEtablissements return the right getter', () => {
    expect(results.storedResultsEtablissements).toBe(storeMocks.store.getters.storedResultsEtablissements)
  })

  test('Computed value NumberResult return the right getter', () => {
    expect(results.numberResults).toBe(storeMocks.store.getters.numberResults)
  })

  jest.mock('@/store/index.js', () => ({
    getters: {
      numberResults: jest.fn().mockReturnValue(0)
    }
  }))

  test('Computed value showNoResultMessage compute correctly', () => {
    expect(results.showNoResultMessage).toBeFalsy()
    wrapperResults = shallow(Results, {
      localVue,
      store: {
        state: {
          search: 'mock-search',
          application: 'mock-application'
        },
        getters: {
          numberResults: 0
        }
      },
      stubs: ['router-link', 'router-view'],
      mocks: { $router }
    })
    expect(wrapperResults.vm.showNoResultMessage).toBeTruthy()
  })

  // Here we should expect 6 123 456 not 6,123,456 vue Jest is currently bugging with Intl
  test('Computed value resultNumberSentence forms the right sentence', () => {
    expect(results.resultsNumberSentence).toBe("6,123,456 résultats pour \"mock-storedLastFullText\"")
    wrapperResults = shallow(Results, {
      localVue,
      store: {
        state: {
          search: 'mock-search',
          application: 'mock-application'
        },
        getters: {
          numberResults: undefined
        }
      },
      stubs: ['router-link', 'router-view'],
      mocks: { $router }
    })
    expect(wrapperResults.vm.resultsNumberSentence).toBe('')
  })

  test('Computed value resultsAreLoading return the right getter', () => {
    expect(results.resultsAreLoading).toBe(storeMocks.store.state.application.resultsAreLoading)
  })

  test('Computed value serverError return the right getter', () => {
    expect(results.serverError).toBe(storeMocks.store.state.application.serverError)
  })

  test('If only one result, push router to page Etablissement with the right searchId', async () => {
    $router = {
      params: 'mock-params',
      push: jest.fn()
    }

    wrapperResults = shallow(Results, {
      localVue,
      store: {
        state: {
          search: 'mock-search',
          application: 'mock-application'
        },
        getters: {
          numberResults: 1,
          onlyOneResult: true,
          storedResultsEtablissements: [{ name: 'mock-etablissement', siret: 'mock-siret1' }]
        }
      },
      stubs: ['router-link', 'router-view'],
      mocks: { $router }
    })
    wrapperResults.update()
    expect(wrapperResults.vm.$router.push).toHaveBeenCalledWith({ "name": "Etablissement", "params": { "searchId": 'mock-siret1' } })
  })

  test('If more than one result, doest push router', () => {
    wrapperResults = shallow(Results, {
      localVue,
      store: {
        state: {
          search: 'mock-search',
          application: 'mock-application'
        },
        getters: {
          numberResults: 5,
          onlyOneResult: false,
          storedResultsEtablissements: [{ name: 'mock-etablissement', siret: 'mock-siret1' }]
        }
      },
      stubs: ['router-link', 'router-view'],
      mocks: { $router }
    })
    wrapperResults.update()
    expect(wrapperResults.vm.$router.push.mock.calls).toHaveLength(0)
  })

  // TODO: Test when able to test router-link
  test('Clicking on a result goes to this etablissement page')
})

describe('Results.vue snapshot testing', () => {
  // Snapshot testing
  localVue.component('router-link', RouterLinkStub);
  const $router = {
    params: 'mock-params',
    push: jest.fn()
  }
  const wrapperResults = mount(Results, {
    localVue,
    store: {
      state: {
        search: 'mock-search',
        application: 'mock-application',
        route: {
          query: 'mock-query'
        }
      },
      getters: {
        numberResults: 1,
        onlyOneResult: true,
        storedResultsEtablissements: [{ name: 'mock-etablissement', siret: 'mock-siret1' }]
      }
    },
    mocks: { $router }
  })

  test('It match the snapshot', () => {
    expect(wrapperResults.vm.$el).toMatchSnapshot()
  })
})

