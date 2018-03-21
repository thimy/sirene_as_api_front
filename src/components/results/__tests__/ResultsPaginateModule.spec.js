import ResultsPaginateModule from '@/components/results/ResultsPaginateModule.vue'
import Vuex from 'vuex'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import { createLocalVue, shallow, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')
jest.mock('@/components/results/ResultsPaginateModule.vue')

describe('ResultsPaginateModule.vue', () => {
  let storeMocks
  let wrapperRPM

  beforeEach(() => {
    storeMocks = createStoreMocks()

    wrapperRPM = shallow(ResultsPaginateModule, {
      localVue,
      store: storeMocks.store
    })
  })

  test('Data function returns the correct parsed int', () => {
  // Page is '5' in the store __mocks__, this should return 4
    expect(wrapperRPM.vm.initialPage).toBe(4)
  })

  test('Computed value totalPageNumber returns the right number', () => {
    expect(wrapperRPM.vm.totalPageNumber).toBe(10)
  })

  test('Method selectPage commit a new page number and request search if fullText present', () => {
    wrapperRPM.vm.selectPage(3)
    expect(storeMocks.mutations.setPage).toHaveBeenCalledWith(storeMocks.state, 3)
    expect(storeMocks.actions.requestSearch).toHaveBeenCalled()
  })

  test('Method selectPage activates goToClearedHomePage if fullText not present', () => {
    wrapperRPM.vm.$store.state.route.query.fullText = ''
    wrapperRPM.vm.selectPage(3)
    expect(storeMocks.actions.goToClearedHomePage).toHaveBeenCalled()
  })
})

describe('ResultsPaginateModule.vue Snapshot test', () => {
  const storeMocks = createStoreMocks()

  const wrapperRPM = mount(ResultsPaginateModule, {
      localVue,
      store: storeMocks.store
    })

  test('Snapshot test', () => {
    expect(wrapperRPM.vm.$el).toMatchSnapshot()
  })
}) 