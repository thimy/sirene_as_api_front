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
    store.dispatch('hideSuggestions')
    store.commit('setFullText', '')
    store.commit('changeWelcomeTextVisibility', true)
  },
  showSearchCategories () {
    return this.$route.path === '/search' && store.state.search.storedFullText !== ''
  }
}

export default {
  state,
  mutations,
  actions
}
