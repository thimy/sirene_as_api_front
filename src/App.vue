<template>
  <div>
    <search></search>
    <results></results>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Results from './components/Results.vue'

export default {
  name: 'app',
  components: {
    'Search': Search,
    'Results': Results
  }
}
</script>
