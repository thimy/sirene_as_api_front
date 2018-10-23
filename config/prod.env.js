module.exports = {
  NODE_ENV: '"production"',

  // WARNING: this will make 'non IP failover website' use the 'IP failover API' !
  BASE_ADDRESS_SIRENE_FULLTEXT: '"https://entreprise.data.gouv.fr/api/sirene/v1/full_text/"',
  BASE_ADDRESS_SIRENE_SIRET: '"https://entreprise.data.gouv.fr/api/sirene/v1/siret/"',
  BASE_ADDRESS_SIRENE_SIREN: '"https://entreprise.data.gouv.fr/api/sirene/v2/siren/"',
  BASE_ADDRESS_SIRENE_SUGGESTIONS: '"https://entreprise.data.gouv.fr/api/sirene/v1/suggest/"',
  BASE_ADDRESS_SIRENE_NEAR_ETABLISSEMENT: '"https://entreprise.data.gouv.fr/api/sirene/v1/near_etablissement_geojson/"',
  BASE_ADDRESS_SIRENE_ID_ASSOCIATION: '"https://entreprise.data.gouv.fr/api/sirene/v1/rna/"',

  BASE_ADDRESS_RNA_FULLTEXT: '"https://entreprise.data.gouv.fr/api/rna/v1/full_text/"',
  BASE_ADDRESS_RNA_ID_ASSOCIATION: '"https://entreprise.data.gouv.fr/api/rna/v1/id/"',

  BASE_ADDRESS_RNCS: '""',
  BASE_ADDRESS_RNM: '"https://api-rnm.artisanat.fr/api/entreprise/"'
}
