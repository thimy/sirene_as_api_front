<template>
  <div>
    <navbar></navbar>
    <search></search>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import Results from '@/components/Results'
import Entreprise from '@/components/Entreprise'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar,
    'Search': Search,
    'Results': Results,
    'Entreprise': Entreprise
  }
}
</script>
