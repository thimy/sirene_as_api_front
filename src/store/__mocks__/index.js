/*eslint-disable no-undef*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const getters = {
  adressToGet: jest.fn().mockReturnValue([{}]),
  numberResults: jest.fn().mockReturnValue([{}]),
  isEtablissementLoading: jest.fn().mockReturnValue([ 'mock-etablissement-loading' ]),
  queryToGet: jest.fn().mockReturnValue([{}]),
  optionsToGet: jest.fn().mockReturnValue([{}]),
  pageNumberToGet: jest.fn().mockReturnValue([{}]),
  singlePageResultEtablissement: jest.fn().mockReturnValue([{ siret: 'mock-siret' }]),
  storedSirenSiege: jest.fn().mockReturnValue([{ siret: jest.fn().mockReturnValue([{}])}]),
  storedSpellcheck: jest.fn().mockReturnValue([{}]),
  storedResultsEtablissements: jest.fn().mockReturnValue([{}]),
  totalPageNumber: jest.fn().mockReturnValue([{}]),
  onlyOneResult: jest.fn().mockReturnValue([{}]),
  suggestionAdressToGet: jest.fn().mockReturnValue([{}])
}

export const mutations = {
  clearResults: jest.fn(),
  setFullText: jest.fn(),
  setQuerySuggestions: jest.fn(),
  setResultsAreLoading: jest.fn(),
  setSiretLoading: jest.fn(),
  setNoResultFound: jest.fn(),
  setResults: jest.fn(),
  setStatus: jest.fn(),
  setStatusSiret: jest.fn(),
  setStatusSiren: jest.fn(),
  setSinglePageResults: jest.fn(),
  setSirenResults: jest.fn(),
  setLastFullText: jest.fn(),
  setSiret: jest.fn(),
  setPage: jest.fn(),
  setStoredSuggestions: jest.fn(),
  setSuggestActive: jest.fn(),
  changeWelcomeTextVisibility: jest.fn()
}

export const actions = {
  executeSearchBySiret: jest.fn(),
  executeSearchBySiren: jest.fn(),
  executeSearchSuggestions: jest.fn(),
  executeSearchEtablissement: jest.fn(),
  executeSearchResults: jest.fn(),
  executeSearchResultscallAPI: jest.fn(),
  goToClearedHomePage: jest.fn(),
  requestSearch: jest.fn(),
  resetApplicationState: jest.fn(),
  setResponse: jest.fn(),
  setResponseSinglePage: jest.fn(),
  setResponseSiren: jest.fn(),
  redirectWhenNoResult: jest.fn(),
  filterAndStoreSuggestions: jest.fn(),
  hideWelcomeText: jest.fn(),
  showSearchCategories: jest.fn()
}

export const state = {
  results: jest.fn().mockReturnValue([{}]),
  search: jest.fn().mockReturnValue([{}]),
  suggestions: jest.fn().mockReturnValue([{}]),
  application: jest.fn().mockReturnValue([{ noResultFound: 'mock-noResult', error500: 'mock-error500'}]),
  resultsAreLoading: jest.fn().mockReturnValue([{}]),
  sirenIsLoading: jest.fn().mockReturnValue([{}]),
  siretIsLoading: jest.fn().mockReturnValue([{}]),
  storedSuggestions: jest.fn().mockReturnValue([{}]),
  baseAdressSuggestions: jest.fn().mockReturnValue([{}]),
  querySuggestions: jest.fn().mockReturnValue([{}]),
  suggestActive: jest.fn().mockReturnValue([{}]),
  storedResults: jest.fn().mockReturnValue([{}]),
  singlePageResult: jest.fn().mockReturnValue([{}]),
  storedStatus: jest.fn().mockReturnValue([{}]),
  storedStatusSiret: jest.fn().mockReturnValue([{}]),
  storedStatusSiren: jest.fn().mockReturnValue([{}]),
  sirenResults: jest.fn().mockReturnValue([{}]),
  isWelcomeTextVisible: jest.fn().mockReturnValue([{}])
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
    }),
  }
}

export const store = __createMocks().store