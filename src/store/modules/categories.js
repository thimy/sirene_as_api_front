const state = {
  focusedCategory: 'all',
  numberResultsAll: 0,
  numberResultsEntreprises: 0,
  numberResultsEntreprisesIndividuelles: 0,
  numberResultsAssociations: 0
}

const mutations = {
  focusCategory (state, category) {
    state.focusedCategory = category
  },
  setNumberCategory (state, category) {
    switch (category.name) {
      case 'all':
        state.numberResultsAll = category.value
        break
      case 'entreprises':
        state.numberResultsEntreprises = category.value
        break
      case 'entreprisesIndividuelles':
        state.numberResultsEntreprisesIndividuelles = category.value
        break
      case 'associations':
        state.numberResultsAssociations = category.value
        break
    }
  }
}

const actions = {
  emphasizeCategory (state, category) {
    this.$store.commit('focusCategory', category)
    this.$store.dispatch('requestSearch')
  }
}

export default {
  state,
  mutations,
  actions
}
