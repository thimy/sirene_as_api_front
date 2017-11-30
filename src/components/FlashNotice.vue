<template>
  <div class="container">
    <div class="flash-notice" v-show="displayFlashNotice">
      <div class="flash-notice__text fade-enter-active">
        <h4>Avertissement :</h4>
        <p>Ce site est un travail en cours, actuellement en pré-alpha. Vous pouvez le consulter librement.</p>
      </div>
      <div class="flash-notice__close">
        <img class="flash-notice__icon" src="../assets/img/icons/remove.svg" v-on:click="displayFlashNotice = false"></img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlashNotice',
  data () {
    return {
      displayFlashNotice: true
    }
  }
}
</script>

<style lang="scss" scoped>

  $div-Yaxis-move-from: -200px;
  $div-Yaxis-move-to: -15px;

  @keyframes slideDown {
    from {top: $div-Yaxis-move-from;}
    to {top: $div-Yaxis-move-to;}
  }

  .flash-notice {
    position: absolute;
    z-index: 101;
    top: $div-Yaxis-move-to;
    left: 0;
    right: 0;
    margin: 0 auto;

    width: 75%;
    border-radius: 10px;
    opacity: 0.9;
    border: 1px solid white;

    text-align: center;
    color: $color-white;
    background-color: #CC0000;

    animation: slideDown 500ms;
  }

  .flash-notice__text {
    padding: 5px 0px 0px 5px;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .flash-notice__close {
    display: inline-block;
    width: 100px;
    padding-bottom: 3px;
  }

  .flash-notice__icon {
    margin: 0 auto;
    display:block;
    width: 25px;
    cursor: pointer;
  }

</style>
