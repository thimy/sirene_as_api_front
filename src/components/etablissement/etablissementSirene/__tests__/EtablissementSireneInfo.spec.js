import EtablissementSireneInfo from '@/components/etablissement/etablissementSirene/EtablissementSireneInfo.vue'
import { createLocalVue, shallow, mount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('EtablissementPanelInfo.vue', () => {
  let storeMocks
  let wrapperEPI
  let etablissementPanelInfo

  beforeEach(() => {
    storeMocks = createStoreMocks()
  
    wrapperEPI = shallow(EtablissementSireneInfo, {
      localVue,
      store: storeMocks.store
    })
    etablissementPanelInfo = wrapperEPI.vm
  })

  test('Computed value Result returns the right store getter', () => {
    expect(etablissementPanelInfo.result).toBe(storeMocks.store.getters.singlePageResultEtablissement)
  })

  test('tvaIntracommunautaire) is correctly computed', () => {
    expect(etablissementPanelInfo.tvaIntracommunautaire).toBe('FR80833057201')
  })
})

describe('EtablissementPanelInfo.vue snapshot', () => {

  const localVue = createLocalVue()
  const storeMocks = createStoreMocks()
  const wrapperEPI = mount(EtablissementSireneInfo, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperEPI.vm.$el).toMatchSnapshot()
  })
})