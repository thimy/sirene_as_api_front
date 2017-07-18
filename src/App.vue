<template>
  <div>
    <search></search>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Results from '@/components/Results'
import Entreprise from '@/components/Entreprise'

export default {
  name: 'app',
  components: {
    'Search': Search,
    'Results': Results,
    'Entreprise': Entreprise
  }
}
</script>
