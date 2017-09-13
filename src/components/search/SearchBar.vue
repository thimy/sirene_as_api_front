<template>
  <div class="search__wrapper">
    <input type="text" name="search" placeholder="Recherche" v-model="fullText"/>
    <button class="transparent-button">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['searchName'],
  data () {
    return {
      fullText: ''
    }
  },
  watch: {
    // whenever fullText changes, this function will run
    fullText: function (setFullText) {
      if (String(this.fullText).length >= 3) {
        this.$store.commit('setFullText', this.fullText)
        // this.$router.push({ name: 'Search', query: {text: this.fullText} })
        this.$store.dispatch('requestSearch')
      } else {
        this.$store.commit('setFullText', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search__wrapper {
    position: relative;
  }

  input {
    width: 100%;
  }

  .transparent-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .icon-search {
    color: $color-light-gray;
  }
</style>
