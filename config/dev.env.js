var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_ADRESS_SIRENE_FULLTEXT: '"http://localhost:3000/v1/full_text/"',
  BASE_ADRESS_SIRENE_SIRET: '"http://localhost:3000/v1/siret/"',
  BASE_ADRESS_SIRENE_SIREN: '"http://localhost:3000/v1/siren/"',
  BASE_ADRESS_SIRENE_SUGGESTIONS: '"http://localhost:3000/v1/suggest/"',
  BASE_ADRESS_SIRENE_NEAR_ETABLISSEMENT: '"http://localhost:3000/v1/near_etablissement_geojson/"',

  BASE_ADRESS_RNA_FULLTEXT: '"http://localhost:3001/v1/full_text/"',
  BASE_ADRESS_RNA_ID: '"http://localhost:3001/v1/id/"'
})
