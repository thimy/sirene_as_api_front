import { createLocalVue, shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')
jest.mock('mapbox-gl', () => ({
  supported: jest.fn(),
  Popup: jest.fn()
}))

describe('EtablissementHeader.vue Snapshot testing', () => {
  const storeMocks = createStoreMocks()

  const wrapperEH = shallowMount(EtablissementHeader, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperEH.vm.$el).toMatchSnapshot()
  })
})