import { createLocalVue, shallow } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from '@/store/index.js'
import Vuex from 'vuex'
import Etablissement from '@/components/Etablissement'

const localVue = createLocalVue()
localVue.use(Vuex)
jest.mock('@/store/index.js')

describe('Etablissement.vue', () => {
  let storeMocks
  let wrapperEtablissement
  let etablissement
  let $route = { 
    params: {
      siret: '83305720100018',
      searchId: 'mock-searchId'
    }
  }
  
  // Create a fresh store and wrapper instance for every test case.
  beforeEach(() => {
    storeMocks = createStoreMocks()
    
    wrapperEtablissement = shallow(Etablissement, {
      localVue,
      store: storeMocks.store,
      mocks: { $route }
    })
    etablissement = wrapperEtablissement.vm
  })

  test('Computed value Result returns the right store getter', () => {
    expect(etablissement.result).toBe(storeMocks.store.getters.singlePageResultEtablissement)
  })
  
  test('it should compute the full name correctly if name and surname are present', () => {
    etablissement.result.nom = 'Forever'
    etablissement.result.prenom = 'Michel'
    expect(etablissement.fullOwnerName).toEqual('Forever Michel')
  })

  test('it should display the name if only the name is present', () => {
    etablissement.result.nom = 'Forever'
    etablissement.result.prenom = null
    expect(etablissement.fullOwnerName).toEqual('Forever')
  })

  test('it shouldnt display the name if only the first name is present', () => {
    etablissement.result.nom = null
    etablissement.result.prenom = 'Michel'
    expect(etablissement.fullOwnerName).toEqual(null)
  })

  test('it should compute the TVA number correctly', () => {
    etablissement.result.siren = '833057201'
    expect(etablissement.tvaIntracommunautaire).toEqual('FR80833057201')
  })

  test('Computed value isNotFound returns the right getter', () => {
    expect(etablissement.isNotFound).toBe(storeMocks.store.state.application.noResultFound)
  })

  test('Computed value isError returns the right getter', () => {
    expect(etablissement.isError).toBe(storeMocks.store.state.application.isError)
  })

  test('Computed value formattedDate returns null if no date is present', () => {
    etablissement.result.date_creation = null
    expect(etablissement.formattedDate).toBe(null)
  })

  test('Computed value formattedDate compute the correct date if present', () => {
    etablissement.result.date_creation = '20180201'
    expect(etablissement.formattedDate).toBe('01/02/2018')
  })

  test('Before creation, methods, suggestions are reset and executeSearchEtablissement were called', () => {
    expect(storeMocks.mutations.setStoredSuggestions)
      .toHaveBeenCalledWith(etablissement.$store.state, '')
    expect(storeMocks.actions.executeSearchEtablissement.mock.calls[0][1]).toBe('mock-searchId')
  })

  test('$route is watched correctly and change router if changed', () => {
    $route = {
      params: {
        searchId: 'mock-searchId2'
      }
    }
    wrapperEtablissement = shallow(Etablissement, {
      localVue,
      store: storeMocks.store,
      mocks: { $route }
    })
    wrapperEtablissement.update(() => {
      expect(storeMocks.actions.executeSearchEtablissement.mock.calls[0][1]).toBe('mock-searchId2')
    })
  })

  test('$route is watched correctly and doesnt change router if not changed', () => {
    $route = {
      params: {
        searchId: 'mock-searchId2'
      }
    }
    wrapperEtablissement = shallow(Etablissement, {
      localVue,
      store: storeMocks.store,
      mocks: { $route }
    })
    wrapperEtablissement.update(() => {
      expect(storeMocks.actions.executeSearchEtablissement.mock.calls).toHaveLength(0)
    })
  })
})
