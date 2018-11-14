var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_ADDRESS_SIRENE_FULLTEXT: '"http://localhost:3000/v1/full_text/"',
  BASE_ADDRESS_SIRENE_SIRET: '"http://localhost:3000/v1/siret/"',
  BASE_ADDRESS_SIRENE_SIREN: '"http://localhost:3000/v2/siren/"',
  BASE_ADDRESS_SIRENE_SUGGESTIONS: '"http://localhost:3000/v1/suggest/"',
  BASE_ADDRESS_SIRENE_ID_ASSOCIATION: '"http://localhost:3000/v1/rna/"',

  BASE_ADDRESS_RNA_FULLTEXT: '"http://localhost:3001/v1/full_text/"',
  BASE_ADDRESS_RNA_SIRET: '"http://localhost:3001/v1/siret/"',
  BASE_ADDRESS_RNA_ID_ASSOCIATION: '"http://localhost:3001/v1/id/"',

  BASE_ADDRESS_RNCS: '"https://sandbox2.entreprise.data.gouv.fr/api/rncs/infos_identite_entreprise/"',
  BASE_ADDRESS_RNM: '"https://api-rnm.artisanat.fr/api/entreprise/"',

  LIST_ENDPOINTS: {
    'SIRENE_FULLTEXT': null,
    'SIRENE_SIRET': null,
    'SIRENE_SIREN': null,
    'SIRENE_SUGGESTION': null,
    'SIRENE_ID_ASSOCIATION': null,
    'RNA_FULLTEXT': null,
    'RNA_SIRET': null,
    'RNA_ID': null,
    'RNCS_SIREN': null,
    'RNM_SIREN': null
  }
})
