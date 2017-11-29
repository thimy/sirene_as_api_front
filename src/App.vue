<template>
  <div>
    <navbar></navbar>
    <flash-notice></flash-notice>
    <search></search>
    <router-view></router-view>
    <footer-etalab></footer-etalab>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import FooterEtalab from '@/components/FooterEtalab'
import FlashNotice from '@/components/FlashNotice'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar,
    'Search': Search,
    'Results': Results,
    'Etablissement': Etablissement,
    'FooterEtalab': FooterEtalab,
    'FlashNotice': FlashNotice
  }
}
</script>

<style lang="scss" scoped>

</style>
