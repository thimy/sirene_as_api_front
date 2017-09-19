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
  computed: {
    fullText: {
      get () {
        return this.$store.state.search.storedFullText
      },
      set (fullText) {
        if (!fullText) {
          this.$store.dispatch('goToClearedHomePage')
        }
        if (fullText.match(/^\d{3}/)) {
          this.$store.commit('setSiret', fullText)
        }
        if (fullText.match(/^\d{14}/)) {
          this.$router.push({ path: `/entreprise/${fullText}` })
          return
        }
        if (String(fullText).length >= 3) {
          this.$store.commit('setFullText', fullText)
          this.$store.dispatch('requestSearch')
        }
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
