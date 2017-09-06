const state = {
  isWelcomeTextVisible: true
}

const mutations = {
  changeWelcomeTextVisibility (state, isVisible) {
    state.isWelcomeTextVisible = isVisible
  }
}

export default {
  state,
  mutations
}
