import mapOtherMarkers from '@/components/mixins/mapOtherMarkers'
import Vue from 'vue'

jest.mock('mapbox-gl', () => ({
  supported: jest.fn()
    .mockImplementation(() => {return true}),
  Popup: jest.fn()
}))

jest.mock('vue', () => ({
  http: { get: jest.fn() }
}))

describe('mapOtherMarkers.js', () => {
  test('Method nearEtablissementQuery compute the right query', () => {
    mapOtherMarkers.methods.baseAdressNearEtablissement = 'https://test/v1/near_etablissement_geojson/'
    expect(mapOtherMarkers.methods.nearEtablissementQuery('sampleSiret')).toEqual(
      'https://test/v1/near_etablissement_geojson/sampleSiret?only_same_activity=true'
  )})

  test('Method getMarkersData gets the right query', () => {
    mapOtherMarkers.methods.getMarkersData('sampleSiret')
    expect(Vue.http.get).toHaveBeenCalledWith(
      'https://test/v1/near_etablissement_geojson/sampleSiret?only_same_activity=true'
  )})
})