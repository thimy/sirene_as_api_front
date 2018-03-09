import { createLocalVue, shallow } from '@vue/test-utils'
import Vuex from 'vuex'
import  NavBar from '@/components/Navbar.vue'
import { __createMocks as createStoreMocks } from '@/store/index.js';

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('Navbar.vue', () => {
  let storeMocks
  let wrapperNavBar

  // Create a fresh store and wrapper instance for every test case.
  beforeEach(() => {
    storeMocks = createStoreMocks()

    wrapperNavBar = shallow(NavBar, {
      localVue,
      store: storeMocks.store
    })
  })

  test('It calls goToClearedHomePage when clicking on the logo', () => {
    wrapperNavBar.find('.nav__link').trigger('click')
    expect(storeMocks.actions.goToClearedHomePage.mock.calls).toHaveLength(1)
  })
})
