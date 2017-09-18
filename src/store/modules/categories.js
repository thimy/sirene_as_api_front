// import Vue from 'vue'
import store from '@/store/index.js'
// import router from '@/router/index.js'

const state = {
  focusedCategory: 'all',
  numberResultsAll: 0,
  numberResultsEntreprises: 0,
  numberResultsEntreprisesIndividuelles: 0,
  numberResultsAssociations: 0
}
//
// const getters = {
//   numberResultsAll: state => {
//     return 0
//   },
//   numberResultsEntreprises: state => {
//     return -1
//   },
//   numberResultsEntreprisesIndividuelles: state => {
//     return -2
//   },
//   numberResultsAssociations: state => {
//     return -3
//   }
// }

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
    store.commit('focusCategory', category)
    store.dispatch('requestSearch')
  }
}

export default {
  state,
  // getters,
  mutations,
  actions
}
