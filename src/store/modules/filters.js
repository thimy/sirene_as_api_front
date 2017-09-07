const state = {
  filterPostalCode: '',
  filterActivityCode: ''
}

const mutations = {
  clearFilters (state) {
    state.filterPostalCode = ''
    state.filterActivityCode = ''
  },
  setSearchFilters (state, filterSearch) {
    console.log('WOOOOOH')
    if (filterSearch.name === 'Code Postal') {
      state.filterPostalCode = filterSearch.value
    }
    if (filterSearch.name === 'Activite Principale') {
      state.filterActivityCode = filterSearch.value
    }
  }
}

export default {
  state,
  mutations
}
