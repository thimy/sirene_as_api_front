<template>
  <router-view></router-view>
</template>

<script>
import Search from './components/Search.vue'
import Entreprise from './components/Entreprise.vue'

export default {
  name: 'app',
  components: {
    'Search': Search,
    'Entreprise': Entreprise
  }
}
</script>
