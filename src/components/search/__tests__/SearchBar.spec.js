import { createLocalVue, shallow, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import SearchBar from '@/components/search/SearchBar'
import { __createMocks as createStoreMocks } from '@/store/index.js'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('SearchBar.vue', () => {
  let storeMocks
  let wrapperSearchBar
  const $router = {
    push: jest.fn()
  }

  beforeEach(() => {
    storeMocks = createStoreMocks()
    
    wrapperSearchBar = shallow(SearchBar, {
      localVue,
      store: storeMocks.store,
      mocks: { $router }
    })
  })

  // Tests for Suggestions
  test('When searching under 3 chars, a request for suggestions should NOT be made', () => {
    wrapperSearchBar.setData({ fullText: 'ma' })
    expect(storeMocks.actions.executeSearchSuggestions.mock.calls).toHaveLength(0)
  }),

  test('When searching over/equal 3 chars, a request for suggestions should be made', () => {
    wrapperSearchBar.setData({ fullText: 'maRequete' })
    expect(storeMocks.actions.executeSearchSuggestions).toHaveBeenCalled()
  }),

  test('If the request for suggestions return >= 5 results, 5 suggestions should be displayed', () => {
    wrapperSearchBar.vm.$store.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3', 'Suggest4', 'Suggest5', 'Suggest6']
    // Need to update twice before suggestions are rendered
    wrapperSearchBar.update()
    wrapperSearchBar.update()
    expect(wrapperSearchBar.findAll('li' + '.suggestion__box')).toHaveLength(5)
    expect(wrapperSearchBar.findAll('li' + '.suggestion__box' + '.hidden')).toHaveLength(0)
  }),

  test('If the request for suggestions return 3 results, 3 suggestions should be displayed + 2 hidden', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    wrapperSearchBar.update()
    expect(wrapperSearchBar.findAll('li' + '.suggestion__box')).toHaveLength(5)
    expect(wrapperSearchBar.findAll('li' + '.suggestion__box' + '.hidden')).toHaveLength(2)
  }),

  test('Pressing escape key reset storedSuggestions', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    wrapperSearchBar.update()
    wrapperSearchBar.find('input').trigger('keydown.esc')
    expect(storeMocks.mutations.setStoredSuggestions).toHaveBeenCalledWith(storeMocks.state, '')
  }),

  test("When storedSuggestion is '', no suggestions are displayed" , () => {
    storeMocks.state.suggestions.storedSuggestions = ''
    wrapperSearchBar.update()
    const suggestionsWrappers = wrapperSearchBar.findAll('li' + '.suggestion__box').wrappers
    // Suggestions are rendered in virtual DOM but not attached to document (displayed)
    Array.prototype.forEach.call(suggestionsWrappers, (element) =>
      expect(element.options.attachedToDocument).toBeFalsy())
  }),

  test('I can highlight a suggestion by using keydown', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    wrapperSearchBar.update()
    // We go down 3 times to get Suggest3
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    expect(wrapperSearchBar.findAll('.active')).toHaveLength(1)
    expect(wrapperSearchBar.find('.active').text()).toBe('Suggest3')
  }),

  test('When highlighting suggestions down, I dont exceed the last suggestion', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    // We go down 3 times to get Suggest3
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    expect(wrapperSearchBar.findAll('.active')).toHaveLength(1)
    expect(wrapperSearchBar.find('.active').text()).toBe('Suggest3')
  }),

  test('I can highlight suggestions up too', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    // We go down 3 times to get Suggest3
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.up')
    wrapperSearchBar.find('input').trigger('keydown.down')
    expect(wrapperSearchBar.findAll('.active')).toHaveLength(1)
    expect(wrapperSearchBar.find('.active').text()).toBe('Suggest1')
  }),

  test('When highlighting suggestions up, I dont go too far up', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    // We go down 3 times to get Suggest3
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.up')
    wrapperSearchBar.find('input').trigger('keydown.up')
    wrapperSearchBar.find('input').trigger('keydown.up')
    wrapperSearchBar.find('input').trigger('keydown.down')
    expect(wrapperSearchBar.findAll('.active')).toHaveLength(1)
    expect(wrapperSearchBar.find('.active').text()).toBe('Suggest1')
  }),

  test('I can press enter to launch a search on the highlighted suggestion', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    wrapperSearchBar.vm.requestSearch = jest.fn()
    // wrapperSearchBar.vm.$store._mutations.setFullText = jest.fn()
    // We go down 3 times to get Suggest3
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.down')
    wrapperSearchBar.find('input').trigger('keydown.enter')
    // requestSearch use currentSuggestion as fullText
    expect(wrapperSearchBar.vm.currentSuggestion()).toBe('Suggest3')
    expect(wrapperSearchBar.vm.requestSearch.mock.calls).toHaveLength(1)
  }),

  test('I can click on a suggestion to launch a search', () => {
    storeMocks.state.suggestions.storedSuggestions = ['Suggest1', 'Suggest2', 'Suggest3']
    wrapperSearchBar.vm.requestSearch = jest.fn()  
    wrapperSearchBar.find('li:nth-child(2)').trigger('click')
    expect(wrapperSearchBar.vm.currentSuggestion()).toBe('Suggest2')
    expect(wrapperSearchBar.vm.requestSearch.mock.calls).toHaveLength(1)
  })
  // End Tests for Suggestions

  // Start Tests for Methods

  test('Method requestSirenSearch dispatch executeSearchBySiren with fullText', () => {
    wrapperSearchBar.vm.requestSirenSearch()
    expect(storeMocks.actions.executeSearchBySiren.mock.calls[0][1]).toBe('mock-storedFullText')
  })

  test('Method requestSirenSearch push router to siegeSiret (if requestSirenSearch was successful)', () => {
    wrapperSearchBar.vm.requestSirenSearch()
    expect(wrapperSearchBar.vm.$router.push).toHaveBeenCalledWith({ path: `/entreprise/mock-storedSirenSiegeSiret` })
  })

  // TODO
  test('Method requestSirenSearch set response at notFound (if requestSirenSearch was not successful)')

  test('Method requestSiretSearch set siret as fullText then push router to fullText', () => {
    wrapperSearchBar.vm.requestSiretSearch()
    expect(storeMocks.mutations.setSiret).toHaveBeenCalledWith(storeMocks.state, 'mock-storedFullText')
    expect(wrapperSearchBar.vm.$router.push).toHaveBeenCalledWith({ path: `/entreprise/mock-storedFullText` })
  })

  test('Method requestFullTextSearch search suggestion if it is set', () => {
    wrapperSearchBar.vm.currentSuggestion = jest.fn().mockImplementation(() => { return 'mock-suggest' })
    wrapperSearchBar.vm.requestFullTextSearch()
    expect(wrapperSearchBar.vm.currentSuggestion).toHaveBeenCalled()
    expect(storeMocks.mutations.setFullText).toHaveBeenCalledWith(storeMocks.state, 'mock-suggest')
  })

  test('Method requestFullTextSearch search fullText if suggestion not set', () => {
    wrapperSearchBar.vm.currentSuggestion = jest.fn().mockImplementation(() => { return null })
    wrapperSearchBar.vm.requestFullTextSearch()
    expect(storeMocks.mutations.setFullText).toHaveBeenCalledWith(storeMocks.state, 'mock-storedFullText')
  })

  test('Method requestFullTextSearch remove diacritics', () => {
    wrapperSearchBar.vm.removeDiacritics = jest.fn().mockImplementation(() => { return 'removed-diacritics' })
    wrapperSearchBar.vm.requestFullTextSearch()
    expect(storeMocks.mutations.setFullText).toHaveBeenCalledWith(storeMocks.state, 'removed-diacritics')
  })

  test('Method requestFullTextSearch request a search', () => {
    wrapperSearchBar.vm.requestFullTextSearch()
    expect(storeMocks.actions.requestSearch).toHaveBeenCalled()
  })

  test('Method requestFullTextSearch sets suggestCount at -1', () => {
    wrapperSearchBar.vm.requestFullTextSearch()
    expect(wrapperSearchBar.vm.suggestCount).toBe(-1)
  })

  test('Method requestSearch remove separators and requestSiretSearch if fullText is siret', () => {
    wrapperSearchBar.vm.removeSeparators = jest.fn()
    wrapperSearchBar.vm.requestSiretSearch = jest.fn()
    wrapperSearchBar.vm.isSiret = jest.fn().mockReturnValue(true)
    wrapperSearchBar.vm.isSiren = jest.fn().mockReturnValue(false)
    wrapperSearchBar.vm.requestSearch()
    expect(wrapperSearchBar.vm.removeSeparators).toHaveBeenCalledWith('mock-storedFullText')
    expect(wrapperSearchBar.vm.requestSiretSearch).toHaveBeenCalled()
  })

  test('Method requestSearch remove separators if fullText is siren', () => {
    wrapperSearchBar.vm.removeSeparators = jest.fn()
    wrapperSearchBar.vm.requestSirenSearch = jest.fn()
    wrapperSearchBar.vm.isSiret = jest.fn().mockReturnValue(false)
    wrapperSearchBar.vm.isSiren = jest.fn().mockReturnValue(true)
    wrapperSearchBar.vm.requestSearch()
    expect(wrapperSearchBar.vm.removeSeparators).toHaveBeenCalledWith('mock-storedFullText')
    expect(wrapperSearchBar.vm.requestSirenSearch).toHaveBeenCalled()
  })

  test('Method requestSearch launch requestFullTextSearch if fullText not siret nor siren', () => {
    wrapperSearchBar.vm.requestFullTextSearch = jest.fn()
    wrapperSearchBar.vm.isSiret = jest.fn().mockReturnValue(false)
    wrapperSearchBar.vm.isSiren = jest.fn().mockReturnValue(false)
    wrapperSearchBar.vm.requestSearch()
    expect(wrapperSearchBar.vm.requestFullTextSearch).toHaveBeenCalled()
  })

  test('Method requestSearchIfNotEmpty doesnt search if search is empty', () => {
    storeMocks.store.state.search.storedFullText = ''
    wrapperSearchBar.vm.requestSearch = jest.fn()
    wrapperSearchBar.vm.requestSearchIfNotEmpty()
    expect(wrapperSearchBar.vm.requestSearch).toHaveBeenCalledTimes(0)
  })

  // Computed values
  
  test('Computed value isSearchNotEmpty check if search is empty', () =>{
    storeMocks.store.state.search.storedFullText = ''
    expect(wrapperSearchBar.vm.isSearchNotEmpty).toBeFalsy()
    storeMocks.store.state.search.storedFullText = 'placeholder'
    expect(wrapperSearchBar.vm.isSearchNotEmpty).toBeTruthy()
  })

})


describe('SearchBar.vue snapshot', () => {
  const storeMocks = createStoreMocks()

  const wrapperSearchBar = mount(SearchBar, {
    localVue,
    store: storeMocks.store
  })

  test('Snapshot test', () => {
    expect(wrapperSearchBar.vm.$el).toMatchSnapshot()
  })
})
