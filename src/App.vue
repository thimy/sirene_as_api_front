<template>
  <div>
    <navbar></navbar>
    <search></search>
    <home v-if="showWelcomeText"></home>
    <router-view></router-view>
    <footer-etalab></footer-etalab>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import Home from '@/components/Home'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import FooterEtalab from '@/components/FooterEtalab'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar,
    'Search': Search,
    'Home': Home,
    'Results': Results,
    'Etablissement': Etablissement,
    'FooterEtalab': FooterEtalab
  },
  computed: {
    showWelcomeText () {
      return this.$store.getters.isWelcomeTextVisible
    }
  }
}
</script>
