import EtablissementPanelChildren from '@/components/etablissement/EtablissementPanelChildren.vue'
import { createLocalVue, shallow, mount, RouterLinkStub } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')
jest.mock('@/router/index.js')
localVue.component('router-link', RouterLinkStub)

describe('EtablissementPanelChildren.vue', () => {
  let storeMocks
  let wrapperEPC
  let etablissementPanelChildren

  beforeEach(() => {
    storeMocks = createStoreMocks()
  
    wrapperEPC = shallow(EtablissementPanelChildren, {
      localVue,
      store: storeMocks.store
    })
    etablissementPanelChildren = wrapperEPC.vm
  })

  test('Computed value Result returns the right store getter', () => {
    expect(etablissementPanelChildren.result).toBe(storeMocks.store.getters.singlePageResultEtablissement)
  })

  test('If company is social siege, the page display this information', () => {
    storeMocks.store.getters.storedSirenSiege.siret = 'mock-siegeSocialSiret'
    wrapperEPC.vm.result.siret = 'mock-siegeSocialSiret'
    wrapperEPC.update()
    expect(wrapperEPC.vm.isSiegeSocial).toBeTruthy()
    expect(wrapperEPC.find(".company__item-key").text()).toBe('Cet établissement est le siège social')
  })

  test('If company is not social siege, the page dont display this information', () => {
    storeMocks.store.getters.storedSirenSiege.siret = 'mock-siegeSocialSiret'
    wrapperEPC.vm.result.siret = 'mock-otherSiegeSocialSiret'
    wrapperEPC.update()
    expect(wrapperEPC.vm.isSiegeSocial).toBeFalsy()
  })

  // TODO: Theses tests when router-link will be testable
  test('If company is not social siege, the page display a link to the social siege')
  test('clicking the link to social siege goes to the social siege page')
  test('If there are children etablissement, the page display them')
  test('Clicking on a children etablissement goes to its page')
  test('if less than Max Children etablissement, the page display all children')
  test('if more than Max Children etablissement, the page display only MaxChildren')
  test('clicking on showAllChidren displays all children')
  test('clicking on hideAllChidren goes back to Max Children etablissement displayed')
})

describe('EtablissementPanelChildren.vue snapshot', () => {
  localVue.component('router-link', RouterLinkStub)

  const storeMocks = createStoreMocks()
  const wrapperEPC = mount(EtablissementPanelChildren, {
    localVue,
    store: storeMocks.store
  })

  test('It match the snapshot', () => {
    expect(wrapperEPC.vm.$el).toMatchSnapshot()
  })
})