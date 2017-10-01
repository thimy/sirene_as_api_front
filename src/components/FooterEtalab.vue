<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__logo">
        <img src="../assets/img/etalab.png">
        <ul class="footer__social">
          <li><a href="https://www.twitter.com/etalab"><img src="../assets/img/icons/twitter.svg" alt="Twitter" /></a></li>
          <li><a href="https://www.github.com/etalab"><img src="../assets/img/icons/github.svg" alt="Github" /></a></li>
          <li><a href="https://www.facebook.com/etalab"><img src="../assets/img/icons/facebook.svg" alt="Facebook" /></a></li>
          <li><a href="https://plus.google.com/117902389749487955734"><img src="../assets/img/icons/googleplus.svg" alt="Google Plus" /></a></li>
          <li><a href="mailto:info@data.gouv.fr"><img src="../assets/img/icons/envelop.svg" alt="Facebook" /></a></li>
        </ul>
      </div>
      <ul class="footer__links">
        <li><h2>entreprise.data.gouv.fr</h2></li>
        <li>Données de référence</li>
        <li>Conditions générales d'utilisation</li>
        <li>API</li>
      </ul>
      <ul class="footer__links"></ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>

.footer {
  background: #0F1C40;
  color: $color-white;
  padding: 2em 0;
  line-height: 2em;
}

.footer .container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.footer ul {
  list-style-type: none;
}

.footer__social {
  margin-top: 1em;
}

.footer__social li {
  display: inline;
  margin-right: 1em;
}

.footer__social img {
  width: 25px;
}

.footer__links h2 {
  margin-bottom: .5em;
}
</style>
