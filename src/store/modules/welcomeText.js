import store from '@/store/index.js'

const state = {
  isWelcomeTextVisible: true
}

const mutations = {
  changeWelcomeTextVisibility (state, isVisible) {
    state.isWelcomeTextVisible = isVisible
  }
}

const actions = {
  hideWelcomeText () {
    store.commit('changeWelcomeTextVisibility', false)
  }
}

export default {
  state,
  mutations,
  actions
}
