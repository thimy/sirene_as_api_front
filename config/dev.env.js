var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // comment out this value to test RNCS / not RNCS
  // DISPLAY_RNCS: true,

  ENDPOINTS: require('./endpoints.js'),

  BASE_ADDRESS_SIRENE_FULLTEXT: '"https://sandbox.entreprise.data.gouv.fr/api/sirene/v1/full_text/"',
  BASE_ADDRESS_SIRENE_SIRET: '"https://sandbox.entreprise.data.gouv.fr/api/sirene/v1/siret/"',
  BASE_ADDRESS_SIRENE_SIREN: '"https://sandbox.entreprise.data.gouv.fr/api/sirene/v2/siren/"',
  BASE_ADDRESS_SIRENE_SUGGESTIONS: '"https://sandbox.entreprise.data.gouv.fr/api/sirene/v1/suggest/"',
  BASE_ADDRESS_SIRENE_ID_ASSOCIATION: '"https://sandbox.entreprise.data.gouv.fr/api/sirene/v1/rna/"',

  BASE_ADDRESS_RNA_FULLTEXT: '"https://sandbox.entreprise.data.gouv.fr/api/rna/v1/full_text/"',
  BASE_ADDRESS_RNA_SIRET: '"https://sandbox.entreprise.data.gouv.fr/api/rna/v1/siret/"',
  BASE_ADDRESS_RNA_ID_ASSOCIATION: '"https://sandbox.entreprise.data.gouv.fr/api/rna/v1/id/"',

  BASE_ADDRESS_RNCS: '"https://sandbox2.entreprise.data.gouv.fr/api/rncs/infos_identite_entreprise/"',
BASE_ADDRESS_RNM: '"https://api-rnm.artisanat.fr/api/entreprise/"'
})