import welcomeText from '@/store/modules/welcomeText.js'
import store from '@/store/index.js'
import router from '@/router/index.js'

jest.mock('@/store/modules/welcomeText.js')
jest.mock('@/router/index.js', () => ({
  push: jest.fn()
}))
jest.mock('@/store/index.js', () => ({
  state: {
    search: {
      storedFullText: ''
    }
  },
  commit: jest.fn(),
  dispatch: jest.fn()
    .mockImplementation(function () { return Promise.resolve('good-dispatch') })
}))

describe('welcomeText.js', () => {
    const state = {
      isWelcomeTextVisible: 0
    }
  test('Mutation changeWelcomeTextVisibility is working', () => {
    welcomeText.mutations.changeWelcomeTextVisibility(state, 1)
    expect(state.isWelcomeTextVisible).toBe(1)
  })

  test('Action hideWelcomeText call the right mutation', () => {
    welcomeText.actions.hideWelcomeText()
    expect(store.commit).toBeCalledWith('changeWelcomeTextVisibility', false)
  })

  test('Action goToClearedHomePage push the router to /', () => {
    welcomeText.actions.goToClearedHomePage()
    expect(router.push).toBeCalledWith({ path: `/` })
  })

  test('Action goToClearedHomePage hide suggestions', () => {
    welcomeText.actions.goToClearedHomePage()
    expect(store.commit).toBeCalledWith('setStoredSuggestions', '')
  })

  test('Action goToClearedHomePage reset fullText to empty string', () => {
    welcomeText.actions.goToClearedHomePage()
    expect(store.commit).toBeCalledWith('setFullText', '')
  })

  test('Action goToClearedHomePage display welcomeText', () => {
    welcomeText.actions.goToClearedHomePage()
    expect(store.commit).toBeCalledWith('changeWelcomeTextVisibility', true)
  })
})