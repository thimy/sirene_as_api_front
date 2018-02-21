var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_ADRESS: '"http://localhost:3000/v1/full_text/"',
  BASE_ADRESS_SIRET: '"http://localhost:3000/v1/siret/"',
  BASE_ADRESS_SIREN: '"http://localhost:3000/v1/siren/"',
  BASE_ADRESS_SUGGESTIONS: '"http://localhost:3000/v1/suggest/"'
})
