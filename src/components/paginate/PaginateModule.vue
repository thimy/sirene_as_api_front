<template>
  <paginate
    :container-class="'pagination'"
    :page-count="totalPageNumber"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :click-handler="selectPage">
  </paginate>
</template>

<script>
import store from '@/store/store.js'
import Paginate from 'vuejs-paginate'
import Vue from 'vue'

Vue.component('paginate', Paginate)

export default {
  name: 'Results',
  computed: {
    totalPageNumber: function () {
      return parseInt(store.getters.totalPageNumber)
    }
  },
  methods: {
    selectPage (pageNum) {
      store.state.pageNumber = pageNum
      store.commit('executeSearch')
    }
  }
}
</script>
