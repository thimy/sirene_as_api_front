<template>
  <paginate
    :container-class="'pagination'"
    :page-class = "'pagesButtons'"
    :prev-class="'pagesButtons'"
    :next-class="'pagesButtons'"
    :page-count="totalPageNumber"
    :prev-text="'Precédent'"
    :next-text="'Suivant'"
    :click-handler="selectPage">
  </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
import Vue from 'vue'

Vue.component('paginate', Paginate)

export default {
  name: 'Results',
  computed: {
    totalPageNumber: function () {
      return parseInt(this.$store.getters.totalPageNumber)
    }
  },
  methods: {
    selectPage (pageNum) {
      this.$store.state.pageNumber = pageNum
      this.$store.commit('executeSearch')
    }
  }
}
</script>

<style lang="scss">

.pagination {
	list-style: none;
  display: inline;
}

li.pagesButtons {
  display: inline;
}

</style>
