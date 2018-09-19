/*eslint-disable no-undef*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  application: jest.fn().mockReturnValue([{
    isLoading: {
      'SIREN': jest.fn().mockReturnValue([{}]),
      'ID_ASSOCIATION': jest.fn().mockReturnValue([{}]),
      'SIRET': jest.fn().mockReturnValue([{}]),
      'FULLTEXT': jest.fn().mockReturnValue([{}])
    },
    error500: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    },
    noResultFound: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    },
    mainSearch: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    }
  }]),
  baseAdressSuggestions: jest.fn().mockReturnValue([{
    storedResults: {
      'RNA': jest.fn().mockReturnValue([{}]),
      'SIRENE': jest.fn().mockReturnValue([{}])
    },
    singlePageResult: {
      'RNA': jest.fn().mockReturnValue([{}]),
      'SIRENE':  jest.fn().mockReturnValue([{}])
    },
    storedStatus: {
      'RNA': jest.fn().mockReturnValue([{}]),
      'SIRENE': jest.fn().mockReturnValue([{}])
    }
  }]),
  sirenChildren: jest.fn().mockReturnValue([{}]),
  searchEtablissement: jest.fn().mockReturnValue([{
    baseAdressSiret: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    },
    baseAdressRNAId: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    },
    baseAdressSireneSiren: jest.fn().mockReturnValue([{}])
  }]),
  searchFullText: {
    storedFullText: jest.fn().mockReturnValue([{}]),
    storedLastFullText: jest.fn().mockReturnValue([{}]),
    pageNumber: jest.fn().mockReturnValue([{}]),
    baseAdressFullText: {
      'SIRENE': jest.fn().mockReturnValue([{}]),
      'RNA': jest.fn().mockReturnValue([{}])
    }
  },
  suggestions: {
    storedSuggestions: jest.fn().mockReturnValue([{}]),
    baseAdressSuggestions: jest.fn().mockReturnValue([{}]),
    querySuggestions: jest.fn().mockReturnValue([{}]),
    suggestActive: jest.fn().mockReturnValue([{}])
  },
  welcomeText: {
    isWelcomeTextVisible: jest.fn().mockReturnValue([{}])
  }
}

export const getters = {
  RNAAvailable: jest.fn().mockReturnValue([{}]),
  adressToGetFullText: jest.fn().mockReturnValue([{}]),
  allAPIError500: jest.fn().mockReturnValue([{}]),
  allAPINotFound: jest.fn().mockReturnValue([{}]),
  idAssociationFromSirene: jest.fn().mockReturnValue([{}]),
  isEtablissementLoading: jest.fn().mockReturnValue([{}]),
  isWelcomeTextVisible: jest.fn().mockReturnValue([{}]),
  mainSearch: jest.fn().mockReturnValue([{}]),
  numberResultsFullTextRNA: jest.fn().mockReturnValue([{}]),
  numberResultsFullTextSirene: jest.fn().mockReturnValue([{}]),
  optionsToGet:"?per_page=5&page=1",
  pageNumber: jest.fn().mockReturnValue([{}]),
  pageNumberToGet: "?per_page=5&page=1",
  queryToGet: jest.fn().mockReturnValue([{}]),
  singlePageEtablissementRNA: jest.fn().mockReturnValue([{}]),
  singlePageEtablissementSirene: jest.fn().mockReturnValue([{}]),
  singleResult: jest.fn().mockReturnValue([{}]),
  sireneAvailable: jest.fn().mockReturnValue([{}]),
  siretFromRNA: jest.fn().mockReturnValue([{}]),
  storedFullText:"",
  storedResultsAssociations: jest.fn().mockReturnValue([{}]),
  storedResultsEntreprises: jest.fn().mockReturnValue([{}]),
  storedSirenChildren: jest.fn().mockReturnValue([{}]),
  storedSirenSiege: jest.fn().mockReturnValue([{}]),
  storedSirenTotalResults: jest.fn().mockReturnValue([{}]),
  storedSpellcheckRNA: jest.fn().mockReturnValue([{}]),
  storedSpellcheckSirene: jest.fn().mockReturnValue([{}]),
  suggestionAdressToGet:"http://localhost:3000/v1/suggest/",
  totalPageNumberRNA:0,
  totalPageNumberSirene:0
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
  setResponseEtablissement: jest.fn(),
  setResponseSiren: jest.fn(),
  showSearchCategories: jest.fn()
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