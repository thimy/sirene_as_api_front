import Application from '@/store/modules/application.js'
import store from '@/store/index.js'

jest.mock('@/store/modules/application.js')
jest.mock('@/store/index.js', () => ({
  commit: jest.fn(),
  dispatch: jest.fn()
    .mockImplementation(function () { return Promise.resolve('good-dispatch') })
}))

describe('application.js mutations', () => {
  const state = {
    resultsAreLoading: 0,
    sirenIsLoading: 0,
    siretIsLoading: 0,
    error500: 0,
    noResultFound: 0
  }

  test('Mutation setResultsAreLoading is working', () => {
    Application.mutations.setResultsAreLoading(state, 1)
    expect(state.resultsAreLoading).toBe(1)
  })

  test('Mutation setSirenLoading is working', () => {
    Application.mutations.setSirenLoading(state, 1)
    expect(state.sirenIsLoading).toBe(1)
  })

  test('Mutation setSiretLoading is working', () => {
    Application.mutations.setSiretLoading(state, 1)
    expect(state.siretIsLoading).toBe(1)
  })

  test('Mutation setError500 is working', () => {
    Application.mutations.setError500(state, 1)
    expect(state.error500).toBe(1)
  })

  test('Mutation setNoResultFound is working', () => {
    Application.mutations.setNoResultFound(state, 1)
    expect(state.noResultFound).toBe(1)
  })
})

describe('application.js actions', () => {
  test('resetApplicationState correctly reset the application state', () => {
    Application.actions.resetApplicationState()
    expect(store.dispatch).toBeCalledWith('hideWelcomeText')
    expect(store.commit).toBeCalledWith('setStoredSuggestions', '')
    expect(store.commit).toBeCalledWith('setError500', false)
    expect(store.commit).toBeCalledWith('setNoResultFound', false)
  })
})

describe('application.js getters', () => {
  test('isEtablissementLoading is true if sirenIsLoading or siretIsLoading is true', () => {
    let state = {
      sirenIsLoading: true,
      siretIsLoading: true
    }
    expect(Application.getters.isEtablissementLoading(state)).toBeTruthy()
    state = {
      sirenIsLoading: true,
      siretIsLoading: false
    }
    expect(Application.getters.isEtablissementLoading(state)).toBeTruthy()
    state = {
      sirenIsLoading: false,
      siretIsLoading: true
    }
    expect(Application.getters.isEtablissementLoading(state)).toBeTruthy()
    state = {
      sirenIsLoading: false,
      siretIsLoading: false
    }
    expect(Application.getters.isEtablissementLoading(state)).toBeFalsy()
  })
})
