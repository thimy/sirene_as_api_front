<template>
  <footer class='footer-etalab'>
    <div class='links'>
      <div class='block-of-links'>
        <a>Données de référence</a>
        <a>Licences</a>
        <a>API</a>
        <a>Crédits</a>
        <a>Conditions générales d'utilisation</a>
      </div>
      <div class='block-of-links'>
        <a>Gouvernement.fr</a>
        <a>France.fr</a>
        <a>Legifrance.gouv.fr</a>
        <a>Service-public.fr</a>
        <a>Opendata France</a>
        <a>Cada.fr</a>
        <a>Etalab.gouv.fr</a>
      </div>
    </div>
    <div class='contacts'>
      <h2>Contactez-nous</h2>
    </div>
    <div class='etalab-infos'>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterEtalab'
}
</script>

<style lang="scss" scoped>

.footer-etalab {
  // position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  div {
    min-height: 0.5rem;
  }
}

.links {
  background-color: $color-footer-light-blue;
  text-align: center;
}

.contacts {
  background-color: $color-footer-medium-blue;
  color: $color-lighter-gray;
  text-align: center;
}

.etalab-infos {
  background-color: $color-footer-dark-blue;
}

.block-of-links {
  color: $color-lighter-gray;
  font-size: $fs-small;
  display: inline-block;
  margin-right: 4rem;
  vertical-align: top;
  a {
    // width: 100%;
    text-align: left;
    display: block;
    margin: 0.2em 0em 0.2em 0em;
  }
}

</style>
