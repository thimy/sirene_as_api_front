<template>
  <section class="section section-white">
    <div class="container">
      <div class="center">
        <h2>Découvrez l’API Entreprise, toutes les informations sur les sociétés.</h2>
        <div class="column__img">
          <img src="@/assets/img/city.svg" alt="">
        </div>
        <h3>Vous justifiez d’une mission de service public ? L’API Entreprise est pour vous.</h3>
        <p>
          Dans le respect du principe "Dites le nous une seule fois", la DINSIC a mis en place l’API Entreprise,
          l’API qui aggrège les informations sur les entreprises.<br>
          Obtenez les Greffes, Certificats, Liasses fiscales, Attestations sociales, et bien plus encore...
        </p>
        <a class="button" href="https://entreprise.api.gouv.fr/">Demander un accès</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApiDocOutro'
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.column__full {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  p {
    max-width: 100%;
  }
}

.center {
  align-items: center;
  text-align: center;
}

.column__img {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>
