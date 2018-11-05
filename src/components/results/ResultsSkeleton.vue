<template>
  <ul>
    <li class="panel">
      <div class="glow"></div>
      <h4 class="loading"></h4>
      <div class="text__long loading"></div>
      <div class="text__medium loading"></div>
    </li>
    <li class="panel">
      <div class="glow"></div>
      <h2 class="loading"></h2>
      <div class="text__long loading"></div>
      <div class="text__medium loading"></div>
    </li>
    <li class="panel">
      <div class="glow"></div>
      <h2 class="loading"></h2>
      <div class="text__long loading"></div>
      <div class="text__medium loading"></div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'resultsSkeleton'
}
</script>

<style lang="scss" scoped>
h4.loading {
  margin: 0;
  width: 300px
}

.text__long {
  margin-top: 1em;
  width: 600px;
}

.text__medium {
  margin-top: 1em;
  width: 400px
}


</style>
