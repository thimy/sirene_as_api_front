/*eslint-disable no-undef*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const getters = {
  adressToGet: jest.fn().mockReturnValue([{}]),
  isEtablissementLoading: jest.fn().mockReturnValue(['mock-etablissement-loading']),
  numberResults: jest.fn().mockReturnValue('mock-numberResults 6123456'),
  onlyOneResult: jest.fn().mockReturnValue([{}]),
  optionsToGet: jest.fn().mockReturnValue([{}]),
  pageNumberToGet: jest.fn().mockReturnValue([{}]),
  queryToGet: jest.fn().mockReturnValue([{}]),
  singlePageResultEtablissement: jest.fn().mockReturnValue({ siret: 'mock-siret', siren: '833057201' }),
  storedResultsEtablissements: jest.fn().mockReturnValue([{ name: 'mock-etablissement', siret: 'mock-siret1' }]),
  storedSirenChildren: jest.fn().mockReturnValue([{}]),
  storedSirenSiege: jest.fn().mockReturnValue({ siret: 'mock-storedSirenSiegeSiret' }),
  storedSpellcheck: jest.fn().mockReturnValue('mock-spellcheck'),
  suggestionAdressToGet: jest.fn().mockReturnValue([{}]),
  totalPageNumber: jest.fn().mockReturnValue('10goToClearedHomePage')
}

export const mutations = {
  changeWelcomeTextVisibility: jest.fn(),
  clearResults: jest.fn(),
  setFullText: jest.fn(),
  setLastFullText: jest.fn(),
  setNoResultFound: jest.fn(),
  setPage: jest.fn(),
  setQuerySuggestions: jest.fn(),
  setResults: jest.fn(),
  setResultsAreLoading: jest.fn(),
  setSinglePageResults: jest.fn(),
  setSirenResults: jest.fn(),
  setSiret: jest.fn(),
  setSiretLoading: jest.fn(),
  setStatus: jest.fn(),
  setStatusSiren: jest.fn(),
  setStatusSiret: jest.fn(),
  setStoredSuggestions: jest.fn()
}

export const actions = {
  executeSearchBySiren: jest.fn(),
  executeSearchBySiret: jest.fn(),
  executeSearchEtablissement: jest.fn(),
  executeSearchResults: jest.fn(),
  executeSearchResultscallAPI: jest.fn(),
  executeSearchSuggestions: jest.fn(),
  filterAndStoreSuggestions: jest.fn(),
  goToClearedHomePage: jest.fn(),
  hideWelcomeText: jest.fn(),
  redirectWhenNoResult: jest.fn(),
  requestSearch: jest.fn(),
  resetApplicationState: jest.fn(),
  setResponse: jest.fn(),
  setResponseSinglePage: jest.fn(),
  setResponseSiren: jest.fn(),
  showSearchCategories: jest.fn()
}

export const state = {
  application: jest.fn().mockReturnValue([{ noResultFound: 'mock-noResult', resultsAreLoading: 'mock-resultsAreLoading', error500: 'mock-error500'}]),
  baseAdressSuggestions: jest.fn().mockReturnValue([{}]),
  welcomeText: jest.fn().mockReturnValue([{ isWelcomeTextVisible: jest.fn().mockReturnValue([{}]) }]),
  querySuggestions: jest.fn().mockReturnValue([{}]),
  results: jest.fn().mockReturnValue({ siren: '833057201'}),
  resultsAreLoading: jest.fn().mockReturnValue('mock-resultsAreLoading'),
  route: { query: { fullText: 'mock-fullText', page: '5' }},
  search: { storedFullText: 'mock-storedFullText', storedLastFullText: 'mock-storedLastFullText'},
  singlePageResult: jest.fn().mockReturnValue([{}]),
  sirenIsLoading: jest.fn().mockReturnValue([{}]),
  sirenResults: jest.fn().mockReturnValue([{}]),
  siretIsLoading: jest.fn().mockReturnValue([{}]),
  storedResults: jest.fn().mockReturnValue([{}]),
  storedStatus: jest.fn().mockReturnValue([{}]),
  storedStatusSiren: jest.fn().mockReturnValue([{}]),
  storedStatusSiret: jest.fn().mockReturnValue([{}]),
  storedSuggestions: jest.fn().mockReturnValue([{}]),
  suggestActive: jest.fn().mockReturnValue([{}]),
  suggestions: jest.fn().mockReturnValue([{}])
}

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters)
  const mockMutations = Object.assign({}, mutations, custom.mutations)
  const mockActions = Object.assign({}, actions, custom.actions)
  const mockState = Object.assign({}, state, custom.state)

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState
    })
  }
}

export const store = __createMocks().store