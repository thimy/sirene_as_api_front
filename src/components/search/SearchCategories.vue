<template>
  <div :class="hideObjectIfNoSearch">
    <ul class="results__categories">
      <li v-bind:class="{emphasize_this: emphasizeAll}"
          v-on:click="changeFocus('all')">
        Tous les résultats
      </li>
      <li v-bind:class="{emphasize_this: emphasizeEntreprises}"
          v-on:click="changeFocus('entreprises')">
        Entreprises
      </li>
      <li v-bind:class="{emphasize_this: emphasizeEntreprisesIndividuelles}"
          v-on:click="changeFocus('entreprisesIndividuelles')">Entreprises individuelles
      </li>
      <li v-bind:class="{emphasize_this: emphasizeAssociations}"
          v-on:click="changeFocus('associations')">Associations
      </li>
    </ul>
  </div>
</template>

<script>
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
      this.$store.dispatch('emphasizeCategory', dataToEmphasize)
    }
  },
  computed: {
    hideObjectIfNoSearch: function () {
      let myClass = ''
      if (this.$store.state.storedFullText === '') {
        myClass = 'hide_this'
      }
      return myClass
    }
  }
}
</script>

<style lang='scss' scoped>

.results__categories {
  display: flex;
  align-items: flex-end;
  position: relative;
  cursor: pointer;
  margin-top: 2em;
  margin-bottom: 0;
  padding: 0;
  list-style-type: none;
}

.results__categories li {
  padding-bottom: 1em;
  border-bottom: 4px solid $color-white;
  margin: 0 1em;
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
