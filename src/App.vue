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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
