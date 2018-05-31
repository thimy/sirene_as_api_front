<template>
  <div v-if="mapboxglSupported" class="panel" id="map" ref="map"></div>
  <div v-else class="panel">
    <p class="panel__message">Votre navigateur ne supporte pas WebGL et ne peut pas afficher la carte de l'établissement.</p>
  </div>
</template>

<script>
import Vue from 'vue'
import mapboxgl from 'mapbox-gl'
import mapOtherMarkers from '@/components/mixins/mapOtherMarkers'

export default {
  name: 'EtablisssementMap',
  props: ['positionEtablissement', 'siret'],
  data () {
    return {
      mapboxglSupported: mapboxgl.supported(),
      mapTilesEtalab: 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      mapOptions (json) { 
        return {
          container: 'map',
          style: json.body,
          center: this.positionEtablissement,
          zoom: 13
        }
      },
      markers:  {
        red: { color: '#C0392B' },
        darkBlue: { color: '#274492' },
        blue: { color: '#0081d5' },
        lightBlue: { color: '#1e90da' }
      }
    }
  },
  mounted () {
    Vue.http.get(this.mapTilesEtalab).then((json) => { this.initMap(json) })
  },
  methods: {
    initMap: async function (json) {
      let map = await new mapboxgl.Map(this.mapOptions(json))
      // addOtherMarkets first so the etablissement marker will be on top
      this.addOtherMarkers(map, this.siret)
      this.addEtablissementMarker(map)
    },
    addEtablissementMarker (map) {
      new mapboxgl.Marker(this.markers.red)
        .setLngLat(this.positionEtablissement) 
        .addTo(map)
    }
  },
  mixins: [mapOtherMarkers]
}
</script>

<style lang="scss" scoped>
  #map {
    padding: 0;
    height: 400px;
  }

  .panel {
    width: 100%
  }

  .panel__message {
    color: $color-dark-grey
  }
</style>
