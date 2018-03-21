import EtablissementPanelContact from '@/components/etablissement/EtablissementPanelContact.vue'
import { createLocalVue, shallow, mount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('EtablissementPanelContact.vue', () => {
  let storeMocks
  let wrapperEPC

  beforeEach(() => {
    storeMocks = createStoreMocks()
  
    wrapperEPC= shallow(EtablissementPanelContact, {
      localVue,
      store: storeMocks.store
    })
  })

  test('Computed value formattedDate returns null if no date is present', () => {
    wrapperEPC.vm.date_creation = null
    wrapperEPC.update()
    expect(wrapperEPC.vm.formattedDate).toBe(null)
  })

  test('Computed value formattedDate compute the correct date if present', () => {
    wrapperEPC.vm.result.date_creation = '20180201'
    wrapperEPC.update()
    expect(wrapperEPC.vm.formattedDate).toBe('01/02/2018')
  })

  test('it should compute the full name correctly if name and surname are present', () => {
    wrapperEPC.vm.result.nom = 'Forever'
    wrapperEPC.vm.result.prenom = 'Michel'
    wrapperEPC.update()
    expect(wrapperEPC.vm.fullOwnerName).toEqual('Forever Michel')
  })

  test('it should display the name if only the name is present', () => {
    wrapperEPC.vm.result.nom = 'Forever'
    wrapperEPC.vm.result.prenom = null
    wrapperEPC.update()
    expect(wrapperEPC.vm.fullOwnerName).toEqual('Forever')
  })

  test('it shouldnt display the name if only the first name is present', () => {
    wrapperEPC.vm.result.nom = null
    wrapperEPC.vm.result.prenom = 'Michel'
    wrapperEPC.update()
    expect(wrapperEPC.vm.fullOwnerName).toEqual('')
  })
})

describe('EtablissementPanelContact.vue snapshot', () => {

  const localVue = createLocalVue()
  const storeMocks = createStoreMocks()
  const wrapperEPC = mount(EtablissementPanelContact, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperEPC.vm.$el).toMatchSnapshot()
  })
})