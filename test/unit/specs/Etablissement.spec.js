import { createLocalVue, shallow } from 'vue-test-utils'
import Vuex from 'vuex'
import Etablissement from '@/components/Etablissement'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Etablissement.vue', () => {
  const $store = createMockStore()
  const $route = { params: 'mock_params_on_my_mock_route' }

  const wrapperEtablissement = shallow(Etablissement, {
    localVue,
    mocks: {
      $route,
      $store
    }
  })

  // Start test suite //
  it('should compute the full name correctly', () => {
    expect(wrapperEtablissement.vm.fullOwnerName).to.equal('Michel Forever')
  })
})

// Mocks store values //
function createMockStore () {
  return new Vuex.Store({
    state: {
      search: {
        storedFullText: 'foobar',
        pageNumber: '1'
      },
      filters: {
        filterPostalCode: '',
        filterActivityCode: ''
      }
    },
    mutations: {
      executeSearchBySiret () { return null }
    },
    getters: {
      singlePageResultEtablissement: state => { return {nom: 'Michel', prenom: 'Forever'} }
    }
  })
}
