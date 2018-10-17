import Greffes from '@/assets/fixtures/codesGreffes.json'

function frenchNumberFormat(input) {
  return new Intl.NumberFormat('fr-FR').format(input)
}

function nameFromCodeGreffe(code) {
  return Greffes.listeGreffes[code]
}

function concatIfExist(base, addition) {
  if (addition) {
    return base.concat(' ', addition)
  }
  return base
}

function RNCSConcatName (person) {
  return concatIfExist(person.nom_patronyme, person.prenoms)
}

function RNCSConcatAddressLine1 (person) {
  let address = ''
  address = concatIfExist(address, person.adresse_ligne_1)
  address = concatIfExist(address, person.adresse_ligne_2)
  address = concatIfExist(address, person.adresse_ligne_3)
  return address
}

function RNCSConcatAddressLine2 (person) {
  let address = ''
  address = concatIfExist(address, person.adresse_code_postal)
  address = concatIfExist(address, person.adresse_ville)
  address = concatIfExist(address, person.adresse_pays)
  return address
}

export default {
  methods: {
    frenchNumberFormat,
    nameFromCodeGreffe,
    concatIfExist,
    RNCSConcatAddressLine1,
    RNCSConcatAddressLine2,
    RNCSConcatName
  }
}
