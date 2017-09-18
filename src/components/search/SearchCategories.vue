<template>
  <div :class="hideObjectIfNoSearch">
    <ul class="results__categories">
      <li v-bind:class="{emphasize_this: emphasizeAll}"
          v-on:click="changeFocus('all')">
        <p>Tous les résultats ({{numberResultsAll}})</p>
        <div class="results__white_div"></div>
      </li>
      <li v-bind:class="{emphasize_this: emphasizeEntreprises}"
          v-on:click="changeFocus('entreprises')">
        <p>Entreprises ({{numberResultsEntreprises}})</p>
        <div class="results__white_div"></div>
      </li>
      <li v-bind:class="{emphasize_this: emphasizeEntreprisesIndividuelles}"
          v-on:click="changeFocus('entreprisesIndividuelles')">
        <p>Entreprises Individuelles ({{numberResultsEntreprisesIndividuelles}})</p>
        <div class="results__white_div"></div>
      </li>
      <li v-bind:class="{emphasize_this: emphasizeAssociations}"
          v-on:click="changeFocus('associations')">
        <p>Associations ({{numberResultsAssociations}})</p>
        <div class="results__white_div"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store/index.js'

export default {
  name: 'SearchCategories',
  data () {
    return {
      emphasizeAll: true,
      emphasizeEntreprises: false,
      emphasizeAssociations: false,
      emphasizeEntreprisesIndividuelles: false
    }
  },
  methods: {
    changeFocus (dataToEmphasize) {
      this.emphasizeAll = false
      this.emphasizeEntreprises = false
      this.emphasizeAssociations = false
      this.emphasizeEntreprisesIndividuelles = false
      switch (dataToEmphasize) {
        case 'all':
          this.emphasizeAll = true
          break
        case 'entreprises':
          this.emphasizeEntreprises = true
          break
        case 'associations':
          this.emphasizeAssociations = true
          break
        case 'entreprisesIndividuelles':
          this.emphasizeEntreprisesIndividuelles = true
          break
      }
      store.dispatch('emphasizeCategory', dataToEmphasize)
    }
  },
  computed: {
    hideObjectIfNoSearch: function () {
      let myClass = ''
      if (this.$store.state.storedFullText === '') {
        myClass = 'hide_this'
      }
      return myClass
    },
    numberResultsAll () {
      return this.$store.state.categories.numberResultsAll
    },
    numberResultsEntreprises () {
      return this.$store.state.categories.numberResultsEntreprises
    },
    numberResultsEntreprisesIndividuelles () {
      return this.$store.state.categories.numberResultsEntreprisesIndividuelles
    },
    numberResultsAssociations () {
      return this.$store.state.categories.numberResultsAssociations
    }
  }
}
</script>

<style lang='scss' scoped>

.results__categories {
  display: flex;
  align-items: flex-end;
  position: relative;
  top: 3em;
  cursor: pointer;
  li {
    list-style: none;
    display: inline;
    font-weight: $fw-regular;
    font-size: $fs-small;
    margin-right: 3.5em;
  }
  .results__white_div {
    background-color: transparent;
    height: 0.3em;
  }
}

.hide_this {
  display: none !important;
}

.emphasize_this {
  font-weight: $fw-bold !important;
  .results__white_div {
    background-color: $color-white !important;
  }
}

</style>
