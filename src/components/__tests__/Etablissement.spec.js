import { createLocalVue, shallow, mount, RouterLinkStub, RouterViewStub } from '@vue/test-utils'
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

  test('Computed value isNotFound returns the right getter', () => {
    expect(etablissement.isNotFound).toBe(storeMocks.store.state.application.noResultFound)
  })

  test('Computed value isError returns the right getter', () => {
    expect(etablissement.isError).toBe(storeMocks.store.state.application.isError)
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

describe('Etablissement.vue Snapshot testing', () => {
  localVue.component('router-link', RouterLinkStub);
  localVue.component('router-view', RouterViewStub);

  const storeMocks = createStoreMocks()
  const $route = {
    params: {
      siret: '83305720100018',
      searchId: 'mock-searchId'
    }
  }
  const wrapperEtablissement = mount(Etablissement, {
    localVue,
    store: storeMocks.store,
    mocks: { $route },
    stubs: ['loader', 'router-view']
  })

  test('It match the snapshot', () => {
    expect(wrapperEtablissement.vm.$el).toMatchSnapshot()
  })
})

// describe('Etablissement.vue display', () => {
//   let storeMocks
//   let wrapperEtablissement
//   let etablissement
//   let $route = {
//     params: {
//       siret: '83305720100018',
//       searchId: 'mock-searchId'
//     }
//   }

//   beforeEach(() => {
//     storeMocks = createStoreMocks()

//     wrapperEtablissement = mount(Etablissement, {
//       localVue,
//       store: storeMocks.store,
//       mocks: { $route }
//     })
//     etablissement = wrapperEtablissement.vm
//   })
//   test('Display only the loader if isLoading is true', () => {
//     console.log(wrapperEtablissement.html())
//     expect(wrapperEtablissement.html()).toBe()
//   })
// })
