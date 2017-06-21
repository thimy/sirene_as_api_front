<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
		<h2 class="search-title">{{ searchName}}</h2>
      <div id="custom-search-input">
        <div class="input-group col-md-12">
          <input type="text" class="form-control input-lg" placeholder="Recherche" />
          <span class="input-group-btn">
            <button class="btn btn-info btn-lg" type="button">
              <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['searchName']
}
</script>

<style scoped>
  #custom-search-input{
      padding: 3px;
      border: solid 1px #E4E4E4;
      border-radius: 6px;
      background-color: #fff;
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

  #custom-search-input .glyphicon-search{
      font-size: 23px;
  }
</style>
