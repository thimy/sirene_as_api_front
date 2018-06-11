import ResultsSiren from '@/store/modules/resultsSiren'

jest.mock('@/store/modules/resultsSiren.js')
jest.mock('@/store/index.js', () => ({
  dispatch: jest.fn(),
  commit: jest.fn()
}))

describe('resultSiren.js getters', () => {
  test('the storedSirenSiege getter return the siege social if there is sirenResults and sirenResults.siege_social', () => {
    const state = {
      sirenResults: {
        siege_social: 'mock-siegeSocial'
      }
    }
    expect(ResultsSiren.getters.storedSirenSiege(state)).toBe('mock-siegeSocial')
  })

  test('the storedSirenSiege getter return null if no sirenResults.siege_social', () => {
    const state = {
      sirenResults: {
        siege_social: null
      }
    }
    expect(ResultsSiren.getters.storedSirenSiege(state)).toBeNull()
  })

  test('the storedSirenSiege getter return null if no sirenResults', () => {
    const state = {
      sirenResults: null
    }
    expect(ResultsSiren.getters.storedSirenSiege(state)).toBeNull()
  })

  test('the storedSirenTotalResults getter return sirenResults.total_results', () => {
    const state = {
      sirenResults: { total_results: 'mock-totalResults' }
    }
    expect(ResultsSiren.getters.storedSirenTotalResults(state)).toBe('mock-totalResults')
  })

  test('the storedSirenChildren getter return sirenResults.other_etablissements_sirets', () => {
    const state = {
      sirenResults: { other_etablissements_sirets: 'mock-otherEtablissementsSirets' }
    }
    expect(ResultsSiren.getters.storedSirenChildren(state)).toBe('mock-otherEtablissementsSirets')
  })
})

describe('resultSiren.js mutations', () => {
  const state = {
    sirenResults: 0
  }
  test('The setSirenResults mutation works', () => {
    ResultsSiren.mutations.setSirenResults(state, 1)
    expect(state.sirenResults).toBe(1)
  })
})