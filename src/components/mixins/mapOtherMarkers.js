// import mapboxgl from 'mapbox-gl'
import Vue from 'vue'

export default {
  data () {
    return {
      baseAdressNearEtablissement: process.env.BASE_ADRESS_NEAR_ETABLISSEMENT
    }
  },
  methods: {
    addOtherMarkers: async function (map, siret) {
      const response = await this.getMarkersData(siret)
      this.addSourceEtablissements(map, response.body)
      this.addLayerEtablissements(map)
    },
    getMarkersData: async function (siret) {
      const query = this.nearEtablissementQuery(siret)
      return await Vue.http.get(query)
    },
    addSourceEtablissements: function (map, data) {
      map.addSource("etablissements", {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50
      })
    },
    addLayerEtablissements: function (map) {
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "etablissements",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
              "step",
              ["get", "point_count"],
              this.markers.lightBlue.color,
              10, this.markers.blue.color,
              50, this.markers.darkBlue.color
          ],
          "circle-radius": [
              "step",
              ["get", "point_count"],
              7, 10,
              15, 50,
              23
          ]
        }
      })
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "etablissements",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Noto Sans Regular"],
            "text-size": 12
        },
        paint: {
          "text-color": "#FFFFFF"
        }
      })
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "etablissements",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
      })
    },
    // parseEtablissements: function(data) {
    //   const etablissements = data.body.etablissements
    //   return etablissements
    // },
    // addOtherMarker: function(map, etablissement) {
    //   new mapboxgl.Marker(this.markers.blue)
    //     .setLngLat([etablissement.longitude, etablissement.latitude]) 
    //     .addTo(map)
    //},
    nearEtablissementQuery (siret) {
      // a affiner
      return this.baseAdressNearEtablissement + siret + '?only_same_activity=true' + '&per_page=100' + '&radius=5'
    }
  }
}
