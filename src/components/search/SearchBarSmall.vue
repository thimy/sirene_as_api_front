<template>
  <div class="row justify-content-center">
    <div class="col-5">
		<label for="search" class="search-title">{{ searchName }}</label>
      <div id="custom-search-input">
        <div class="input-group">
          <input type="text" name="search" class="form-control" v-bind:placeholder='searchName' v-model='filterSearched'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBarSmall',
  props: ['searchName'],
  data () {
    return {
      filterSearched: ''
    }
  },
  computed: {
    /* eslint-disable no-undef */
    filterSearchPayload: function () {
      return {
        name: this.searchName,
        value: this.filterSearched
      }
    }
  },
  watch: {
    /* eslint-disable no-undef */
    filterSearched: function (setFilterSearched) { // TODO: delete the param ?
      this.$store.commit('setSearchFilters', this.filterSearchPayload)
      this.$store.commit('executeSearch')
    }
  }
}
</script>

<style scoped>
  #custom-search-input{
      padding: 3px;
      margin-bottom: 5px;
      border: solid 1px #E4E4E4;
      border-radius: 6px;
      background-color: #fff;
      width: 30%;
      margin: auto;
  }

  #custom-search-input input{
      border: 0;
      box-shadow: none;
  }

  #custom-search-input button{
      margin: 2px 0 0 0;
      background: none;
      box-shadow: none;
      border: 0;
      color: #666666;
      padding: 0 8px 0 10px;
      border-left: solid 1px #ccc;
  }

  #custom-search-input button:hover{
      border: 0;
      box-shadow: none;
      border-left: solid 1px #ccc;
  }

  #custom-search-input {
      font-size: 23px;
  }
</style>
