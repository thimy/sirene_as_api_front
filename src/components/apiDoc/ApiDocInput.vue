<template>
  <div class="apidoc__input">
    <input :value=request v-on:keyup.enter=activateLink>
    <a ref="goToButton" class="button" v-bind:href="request">GET</a>
  </div>
</template>

<script>
export default {
  name: 'ApiDocInput',
  props: ['request'],
  methods: {
    activateLink () { this.$refs.goToButton.click() }
  }
}
</script>

<style lang="scss" scoped>
.apidoc__input {
  display: flex;
  flex-direction: row;
}


</style>
