import { createLocalVue, shallow } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene.vue'

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

    wrapperEtablissement = shallow(EtablissementSirene, {
      localVue,
      store: storeMocks.store
    })
    etablissement = wrapperEtablissement.vm
  })

  test('Computed value Result returns the right store getter', () => {
    expect(etablissement.result).toBe(storeMocks.store.getters.singlePageResultEtablissement)
  })

  test('Computed value coordinates returns the coordinates if both longitude and latitude exists', () => {
    etablissement.result.longitude = -30
    etablissement.result.latitude = -42
    wrapperEtablissement.update()
    expect(etablissement.coordinates).toEqual([-30, -42])

    etablissement.result.longitude = -30
    etablissement.result.latitude = null
    wrapperEtablissement.update()
    expect(etablissement.coordinates).toBeNull()

    etablissement.result.longitude = null
    etablissement.result.latitude = -42
    wrapperEtablissement.update()
    expect(etablissement.coordinates).toBeNull()
  })
})

describe('EtablissementSirene.vue Snapshot testing', () => {
  const storeMocks = createStoreMocks()

  const wrapperES = shallow(EtablissementSirene, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperES.vm.$el).toMatchSnapshot()
  })
})