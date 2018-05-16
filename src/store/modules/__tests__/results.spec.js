import Results from '@/store/modules/results'
import store from '@/store/index.js'
// import router from '@/router/index.js'
// import Vue from 'vue'

jest.mock('@/store/modules/results.js')
// jest.mock('@/store/index.js')

jest.mock('@/store/index.js', () => ({
  getters: {
    numberResults: 1
  },
  dispatch: jest.fn(),
  commit: jest.fn()
}))


describe('result.js getters', () => {
  test('The storedSpellCheck getter return spellcheck if there is storedStatus and storedResults', () => {
    const state = {
      storedResults: { spellcheck: 'mock-spellcheck' },
      storedStatus: 200
    }
    expect(Results.getters.storedSpellcheck(state)).toBe('mock-spellcheck')
  })

  test('The storedSpellCheck getter return null if there is not storedStatus', () => {
    const state = {
      storedResults: { spellcheck: 'mock-spellcheck' },
      storedStatus: null
    }
    expect(Results.getters.storedSpellcheck(state)).toBeNull()
  })

  test('The storedSpellCheck getter return null if there is not storedResults', () => {
    const state = {
      storedResults: null,
      storedStatus: 200
    }
    expect(Results.getters.storedSpellcheck(state)).toBeNull()
  })

  test('The storedResultsEtablissements getter return storedResult etablissement if there is storedResults', () => {
    const state = {
      storedResults: { etablissement: 'mock-etablissement' }
    }
    expect(Results.getters.storedResultsEtablissements(state)).toBe('mock-etablissement')
  })

  test('The storedResultsEtablissements getter return null if there is no storedResults', () => {
    const state = {
      storedResults: null
    }
    expect(Results.getters.storedResultsEtablissements(state)).toBeNull()
  })

  test('The singlePageResultsEtablissements getter return singlePageResult etablissement if there is singlePageResults', () => {
    const state = {
      singlePageResult: { etablissement: 'mock-etablissement' }
    }
    expect(Results.getters.singlePageResultEtablissement(state)).toBe('mock-etablissement')
  })

  test('The singlePageResultsEtablissements getter return null if there is no singlePageResults', () => {
    const state = {
      singlePageResults: null
    }
    expect(Results.getters.singlePageResultEtablissement(state)).toBeNull()
  })

  test('The numberResults getter return storedResults total_results if there is storedResults and storedStatus isnt 404', () => {
    const state = {
      storedResults: { total_results: 'mock-totalResults' },
      storedStatus: 200
    }
    expect(Results.getters.numberResults(state)).toBe('mock-totalResults')
  })

  test('The numberResults getter return 0 if storedStatus is 404', () => {
    const state = {
      storedResults: { total_results: 'mock-totalResults' },
      storedStatus: 404
    }
    expect(Results.getters.numberResults(state)).toBe(0)
  })

  test('The numberResults getter return 0 if no storedResults', () => {
    const state = {
      storedResults: null,
      storedStatus: 200
    }
    expect(Results.getters.numberResults(state)).toBe(0)
  })

  test('The totalPageNumber getter returns storedResults total_pages if storedResults exist', () => {
    const state = {
      storedResults: { total_pages: 'mock-totalPages' }
    }
    expect(Results.getters.totalPageNumber(state)).toBe('mock-totalPages')
  })

  test('The onlyOneResult getter returns true if only one result', () => {
    expect(Results.getters.onlyOneResult()).toBeTruthy()
  })
})

describe('results.js mutations', () => {
  const state = {
    storedResults: 0,
    storedStatus: 0,
    storedStatusSiret: 0,
    storedStatusSiren: 0,
    singlePageResult: 0
  }
  test('The setResults mutation works', () => {
    Results.mutations.setResults(state, 1)
    expect(state.storedResults).toBe(1)
  })

  test('The clearFullText mutation works', () => {
    Results.mutations.clearResults(state)
    expect(state.storedResults).toBeNull()
  })

  test('The setStatus mutation works', () => {
    Results.mutations.setStatus(state, 1)
    expect(state.storedStatus).toBe(1)
  })

  test('The setStatusSiret mutation works', () => {
    Results.mutations.setStatusSiret(state, 1)
    expect(state.storedStatusSiret).toBe(1)
  })

  test('The setStatusSiren mutation works', () => {
    Results.mutations.setStatusSiren(state, 1)
    expect(state.storedStatusSiren).toBe(1)
  })

  test('The setSinglePageResult mutation works', () => {
    Results.mutations.setSinglePageResults(state, 1)
    expect(state.singlePageResult).toBe(1)
  })
})

describe('results.js actions', () => {
  test('Action setResponse set results, set status, launch redirectWhenNoresult, unset the loader', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      body: 'mock-body',
      status: 'mock-status'
    }
    Results.actions.setResponse(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setResults', 'mock-body')
    expect(store.commit).toHaveBeenCalledWith('setStatus', 'mock-status')
    expect(store.dispatch).toHaveBeenCalledWith('redirectWhenNoResult', response)
    expect(store.commit).toHaveBeenCalledWith('setResultsAreLoading', false)
  })

  test('Action setResponseSinglePage commit setSinglePageStatus, setStatusSiret and launch redirectWhenNoResults', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      body: 'mock-body',
      status: 'mock-status'
    }
    Results.actions.setResponseSinglePage(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setSinglePageResults', 'mock-body')
    expect(store.commit).toHaveBeenCalledWith('setStatusSiret', 'mock-status')
    expect(store.dispatch).toHaveBeenCalledWith('redirectWhenNoResult', response)
  })

  test('Action setResponseSiren commit setSirenResults, setStatusSiren and launch redirectWhenNoResults', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      body: 'mock-body',
      status: 'mock-status'
    }
    Results.actions.setResponseSiren(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setSirenResults', 'mock-body')
    expect(store.commit).toHaveBeenCalledWith('setStatusSiren', 'mock-status')
    expect(store.dispatch).toHaveBeenCalledWith('redirectWhenNoResult', response)
  })

  test('Action redirectWhenNoResult set error500 to true if status is 500', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      status: 500
    }
    Results.actions.redirectWhenNoResult(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setError500', true)
  })

  test('Action redirectWhenNoResult doesnt set error500 to true if status is 0', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      status: 0
    }
    Results.actions.redirectWhenNoResult(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setError500', true)
  })

  test('Action redirectWhenNoResult set noResultsFound to true if status is 404', () => {
    const dispatch = 'mock-dispatch'
    const response = {
      status: 404
    }
    Results.actions.redirectWhenNoResult(dispatch, response)
    expect(store.commit).toHaveBeenCalledWith('setNoResultFound', true)
  })
})
