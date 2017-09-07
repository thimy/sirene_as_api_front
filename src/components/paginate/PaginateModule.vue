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
      this.$store.dispatch('executeSearch')
    }
  }
}
</script>

<style lang="scss">

.pagination {
	list-style: none;
  display: flex;
  justify-content: flex-end;
}

.pagesButtons {
  background: transparentize($color-light-blue, .8);
  border-radius: 3px;
  padding: 2px 5px;
  margin-left: 8px;

  &.disabled, &:first-child, &:last-child {
    background: none;
  }

  &.active {
    background-color: $color-light-blue;

    a {
      color: $color-white;
    }
  }
}

.pagesButtons a {
  color: $link-color;
  font-weight: 700;
}

</style>
