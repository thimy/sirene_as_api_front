import colors from '@/components/mixins/colors'
import Vue from 'vue'
import mapboxgl from 'mapbox-gl'
import Filters from '@/components/mixins/filters'

export default {
  data () {
    return {
      baseAdressNearEtablissement: process.env.BASE_ADRESS_SIRENE_NEAR_ETABLISSEMENT
    }
  },
  methods: {
    addOtherMarkers: async function (map, siret) {
      const response = await this.getMarkersData(siret)
      this.addSourceEtablissements(map, response.body)
      this.addLayerEtablissements(map)
      this.addPopupsEtablissements(map)
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
      this.addLayerClusters(map)
      this.addLayerClustersText(map)
      this.addLayerPoints(map)
    },
    addLayerClusters (map) {
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "etablissements",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
              "step",
              ["get", "point_count"],
              colors.lightBlue,
              10, colors.blue,
              50, colors.darkBlue
          ],
          "circle-radius": [
              "step",
              ["get", "point_count"],
              9, 10,
              15, 50,
              23
          ]
        }
      })
    },
    addLayerClustersText (map) {
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
          "text-color": colors.white
        }
      })
    },
    addLayerPoints (map) {
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "etablissements",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": colors.lighterBlue,
            "circle-radius": 5,
            "circle-stroke-width": 1,
            "circle-stroke-color": colors.white
        }
      })
    },
    addPopupsEtablissements (map) {
      const vm = this
      map.on('click', function(click) {
        const renderedFeatures = map.queryRenderedFeatures(click.point, {
          layers: ['unclustered-point']
        })
        if (!renderedFeatures.length) {
          return
        }
        const etablissementsPoints = renderedFeatures[0];
        const etablissementPopup = new mapboxgl.Popup()
          .setLngLat(etablissementsPoints.geometry.coordinates)
          .setLngLat(etablissementsPoints.geometry.coordinates)
          .addTo(map)
        vm.addPopupContent(etablissementPopup, etablissementsPoints.properties)
      })
    },
    nearEtablissementQuery (siret) {
      return this.baseAdressNearEtablissement + siret + '?only_same_activity=true'
    },
    addPopupContent (popup, etablissement) {
      popup.setHTML(
        "<p><strong>Raison Sociale</strong> :  " + (Filters.filters.removeExtraChars(etablissement.nom_raison_sociale)) + "</p>"
        + "<p><strong>Siret</strong> :  " + etablissement.siret+ "</p>"
        + "<p><strong>Activité</strong> :  " + etablissement.libelle_activite_principale + "</p>"
      )
    }
  },
  mixins: [Filters]
}
