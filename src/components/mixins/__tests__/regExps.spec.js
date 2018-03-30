import RegExps from '@/components/mixins/regExps'

describe('regExps.js', () => {
  const areSiret = [
    '83305720100018',
    '833057201.000 18',
    '833 057 201 000 18',
    '833 057 201 00018',
    '833-057-201-000-18',
    '833 057 201-00018',
    '833.057 201_00018',
    '833.057.201.00018',
    '833.057.201.000.18',
    '833_057_201_00018',
    '833_057_201_000_18'
  ]
  const areNotSiret = [
    '833057201000',
    '8',
    '833 057 201 00 018',
    '8330572010001A',
    '833057201000A',
    '8330572010001/A8',
    '833_057_201_000/18'
  ]
  test('it validates correct sirets', () => {
    areSiret.forEach((siret) => {
      expect(RegExps.methods.isSiret(siret)).toBeTruthy()
    })
  })
  test('it doesnt validate incorrect sirets', () => {
    areNotSiret.forEach((siret) => {
      expect(RegExps.methods.isSiret(siret)).toBeFalsy()
    })
  })

  const areSiren = [
    '833057201',
    '833 057 201',
    '833 057-201',
    '833-057-201',
    '833.057.201',
    '833.057_201',
    '833.057.201',
    '833.057201',
    '833_057_201'
  ]
  const areNotSiren = [
    '8330572010',
    '833.0572 01',
    '8',
    '83305720',
    '833 057 201 00018',
    '83305720A',
    '83305720 1',
    '83305720/A',
    '833_057/201'
  ]
  test('it validates correct sirens', () => {
    areSiren.forEach((siren) => {
      expect(RegExps.methods.isSiren(siren)).toBeTruthy()
    })
  })
  test('it doesnt validate incorrect sirens', () => {
    areNotSiren.forEach((siren) => {
      expect(RegExps.methods.isSiren(siren)).toBeFalsy()
    })
  })

  const validWithSeparators = [
    '83305720100018',
    '833057201.000 18',
    '833 057 201 000 18',
    '833 057 201 00018',
    '833-057-201-000-18',
    '833 057 201-00018',
    '833.057 201_00018',
    '833.057.201.00018',
    '833.057.201.000.18',
    '833_057_201_00018',
    '833_057_201_000_18',
    '833057201',
    '833 057 201',
    '833 057-201',
    '833-057-201',
    '833.057.201',
    '833.057_201',
    '833.057.201',
    '833.057201',
    '833_057_201'
  ]

  const validWithoutSeparators = [
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '83305720100018',
    '833057201',
    '833057201',
    '833057201',
    '833057201',
    '833057201',
    '833057201',
    '833057201',
    '833057201',
    '833057201'
  ]

  test('it correctly remove separators from sirets and sirens', () => {
    const processedValidWithSeparator = validWithSeparators.map(input => RegExps.methods.removeSeparators(input))
    expect(processedValidWithSeparator).toEqual(validWithoutSeparators)
  })

  const fullTextWithDiacritics = [
    'établissement',
    'rançon',
    'Monétisation',
    'énergumène',
    'Start-up',
    'ÉRIC ZÄTIER',
    'Gérard SPROÜT',
    'Ôh My Güt'
  ]

  const fullTextExpected = [
    'etablissement',
    'rancon',
    'Monetisation',
    'energumene',
    'Start-up',
    'ERIC ZATIER',
    'Gerard SPROUT',
    'Oh My Gut'
  ]

  test('removeDiacritics correctly remove diacritics from fullText', () => {
    const fullTextWithoutDiacritics = fullTextWithDiacritics.map(input => RegExps.methods.removeDiacritics(input))
    expect(fullTextWithoutDiacritics).toEqual(fullTextExpected)
  })
})