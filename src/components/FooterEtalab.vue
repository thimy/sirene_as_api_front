<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__logo">
        <img src="../assets/img/etalab.svg">
        <ul class="footer__social">
          <li><a href="https://www.twitter.com/etalab"><svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg></a></li>
          <li><a href="https://www.github.com/etalab"><svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg></a></li>
          <li><a href="https://www.facebook.com/etalab"><svg class="icon icon-fb"><use xlink:href="#icon-fb"></use></svg></a></li>
          <li><a href="mailto:info@data.gouv.fr"><svg class="icon icon-mail"><use xlink:href="#icon-mail"></use></svg></a></li>
        </ul>
      </div>
      <ul class="footer__links">
        <li><h2><a href="https://entreprise.api.gouv.fr/">entreprise.data.gouv.fr</a></h2></li>
        <li><a href="https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/">Données de référence</a></li>
        <li><router-link :to="{ name: 'LegalNotes'}">Mentions légales</router-link></li>
        <li><a href="https://github.com/etalab/sirene_as_api">API</a></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>