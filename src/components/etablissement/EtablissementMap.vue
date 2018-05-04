<template>
  <div class="panel" id="map" ref="map"></div>
</template>

<script>
import Vue from 'vue'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'EtablisssementMap',
  props: ['positionEtablissement'],
  data () {
    return {
      mapTilesEtalab: 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      mapOptions (json) { 
        return {
          container: 'map',
          style: json.body,
          center: this.positionEtablissement,
          zoom: 14
        }
      }
    }
  },
  mounted () {
    Vue.http.get(this.mapTilesEtalab).then((json) => { this.initMap(json) })
  },
  methods: {
    initMap (json) {
      let map = new mapboxgl.Map(this.mapOptions(json))
      this.$refs.map = map
      this.addEtablissementMarker(map)
    },
    addEtablissementMarker (map) {
      new mapboxgl.Marker()
        .setLngLat(this.positionEtablissement) 
        .addTo(map)
    }
  }
}
</script>

<style lang="scss" scoped>
  #map {
    padding: 0;
    height: 400px;
    width: 100%;
  }
</style>
