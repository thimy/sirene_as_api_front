module.exports = {
  NODE_ENV: '"production"',

  // WARNING: this will make 'non IP failover website' use the 'IP failover API' !
  BASE_ADRESS_SIRENE_FULLTEXT: '"https://entreprise.data.gouv.fr.data.sirene/v1/full_text/"',
  BASE_ADRESS_SIRENE_SIRET: '"https://entreprise.data.gouv.fr.data.sirene/v1/siret/"',
  BASE_ADRESS_SIRENE_SIREN: '"https://entreprise.data.gouv.fr.data.sirene/v1/siren/"',
  BASE_ADRESS_SIRENE_SUGGESTIONS: '"https://entreprise.data.gouv.fr.data.sirene/v1/suggest/"',
  BASE_ADRESS_SIRENE_NEAR_ETABLISSEMENT: '"https://entreprise.data.gouv.fr.data.sirene/v1/near_etablissement_geojson/"',
  BASE_ADRESS_SIRENE_ID_ASSOCIATION: '"https://entreprise.data.gouv.fr.data.sirene/v1/rna/"',

  BASE_ADRESS_RNA_FULLTEXT: '"https://entreprise.data.gouv.fr.data.rna/v1/full_text/"',
  BASE_ADRESS_RNA_ID: '"https://entreprise.data.gouv.fr.data.rna/v1/id/"'
}
