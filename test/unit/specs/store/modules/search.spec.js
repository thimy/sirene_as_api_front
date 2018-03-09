import Search from '@/store/modules/search'

jest.mock('@/store/index.js', () =>({
  getters: {
    queryToGet: 'barfoo'
  }
}))

jest.mock('@/store/modules/search.js')

describe('search.js', () => {
  test('The adress getter gets the right adress', () => {
    const state = {
      baseAdress: 'http://foobar.com/'
    }
    expect(Search.getters.adressToGet(state)).toBe('http://foobar.com/barfoo')
  })
})
