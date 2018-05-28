import mapboxgl from 'mapbox-gl'
import Vue from 'vue'

export default {
  data () {
    return {
      baseAdressNearEtablissement: process.env.BASE_ADRESS_NEAR_ETABLISSEMENT
    }
  },
  methods: {
    addOtherMarkers: async function (map, siret) {
      const vm = this
      const data = await vm.getMarkersData(siret)
      const etablissements = vm.parseEtablissements(data)

      etablissements.forEach(function(etablissement) {
        vm.addOtherMarker(map, etablissement)
      })
    },
    getMarkersData: async function (siret) {
      const query = this.nearEtablissementQuery(siret)
      return await Vue.http.get(query)
    },
    parseEtablissements: function(data) {
      const etablissements = data.body.etablissements
      return etablissements
    },
    addOtherMarker: function(map, etablissement) {
      new mapboxgl.Marker(this.markers.blue)
        .setLngLat([etablissement.longitude, etablissement.latitude]) 
        .addTo(map)
    },
    nearEtablissementQuery (siret) {
      // a affiner
      return this.baseAdressNearEtablissement + siret + '?only_same_activity=true' + '&per_page=20' + '&radius=1'
    }
  }
}
