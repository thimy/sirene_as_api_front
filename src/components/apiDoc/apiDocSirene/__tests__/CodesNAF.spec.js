import { createLocalVue, shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'
import CodesNAF from '@/components/apiDoc/apiDocSirene/CodesNAF'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('router-link', RouterLinkStub)
jest.mock('@/store/index.js')

describe('CodesNAF.vue', () => {
  let storeMocks
  let wrapperCodesNAF

  test('It dispatches hideWelcomeText when created', () => {
    storeMocks = createStoreMocks()
    wrapperCodesNAF = shallowMount(CodesNAF, {
      localVue,
      store: storeMocks.store
    })
    wrapperCodesNAF
    expect(storeMocks.actions.hideWelcomeText).toHaveBeenCalled()
  })
})

describe('CodesNAF.vue snapshot testing', () => {
  const storeMocks = createStoreMocks()
  const wrapperCodesNAF = mount(CodesNAF, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperCodesNAF.vm.$el).toMatchSnapshot()
  })
})
