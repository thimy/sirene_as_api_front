import store from '@/store/index.js'
import router from '@/router/index.js'

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
  },
  goToClearedHomePage () {
    router.push({ path: `/` })
    store.commit('setStoredSuggestions', '')
    store.commit('setFullText', '')
    store.commit('changeWelcomeTextVisibility', true)
  }
}

const getters = {
  isWelcomeTextVisible: state => {
    return state.isWelcomeTextVisible
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
