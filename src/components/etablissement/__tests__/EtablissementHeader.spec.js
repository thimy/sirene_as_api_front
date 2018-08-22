import { createLocalVue, shallow } from '@vue/test-utils'
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
describe('Etablissement.vue', () => {
  let storeMocks
  let wrapperEtablissement
  let etablissement

  beforeEach(() => {
    storeMocks = createStoreMocks()

    wrapperEtablissement = shallow(EtablissementHeader, {
      localVue,
      store: storeMocks.store
    })
    etablissement = wrapperEtablissement.vm
  })

  test('Computed value Result returns the right store getter', () => {
    expect(etablissement.resultSirene).toBe(storeMocks.store.getters.singlePageEtablissementSirene)
  })
})

describe('EtablissementHeader.vue Snapshot testing', () => {
  const storeMocks = createStoreMocks()

  const wrapperEH = shallow(EtablissementHeader, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperEH.vm.$el).toMatchSnapshot()
  })
})