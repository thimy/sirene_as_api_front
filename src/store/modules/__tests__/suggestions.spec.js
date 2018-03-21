import Suggestions from '@/store/modules/suggestions'
import Vue from 'vue'
import store from '@/store/index.js'
import debounce from 'lodash/debounce'
import filterMixin from '@/components/mixins/filters'


jest.mock('@/store/modules/suggestions.js')
jest.mock('lodash/debounce')

jest.mock('@/store/index.js', () => ({
  getters: {
    suggestionAdressToGet: 'mock-suggestionAdresstoget'
  },
  dispatch: jest.fn(),
  commit: jest.fn()
}))

jest.mock('vue', () => ({
  http: {
    get: jest.fn().mockImplementation((query) => query + '-was-called')
  }
}))

describe('suggestions.js getters', () => {
  test('Getter suggestionAdressToGet concatenate the right adress', () => {
    const state = {
      baseAdressSuggestions: 'mock-base-',
      querySuggestions: 'mock-query'
    }
    expect(Suggestions.getters.suggestionAdressToGet(state)).toBe('mock-base-mock-query')
  })
})

describe('suggestions.js mutations', () => {
  const state = {
    querySuggestions: 0,
    storedSuggestions: 0
  }
  test('Mutation setQuerySuggestions works', () => {
    Suggestions.mutations.setQuerySuggestions(state, 1)
    expect(state.querySuggestions).toBe(1)
  })
  test('Mutation setStoredSuggestions works', () => {
    Suggestions.mutations.setStoredSuggestions(state, 1)
    expect(state.storedSuggestions).toBe(1)
  })
})

describe('suggestions.js actions', () => {
  // TODO
  test('Action executeSearchSuggestions debounce then request suggestionAdressToGet then dispatch filterAndStoreSuggestions')
  test('Action filterAndStoreSuggestions filters sugestions and commit them', () => {
    const state = {}
    const suggestionsObjects = { suggestions: ['suggest*1', 'suggest*/2', 'suggest 3']}
    Suggestions.actions.filterAndStoreSuggestions(state, suggestionsObjects)
    expect(store.commit).toHaveBeenCalledWith('setStoredSuggestions', ['suggest 1', 'suggest 2', 'suggest 3'])
  })
})