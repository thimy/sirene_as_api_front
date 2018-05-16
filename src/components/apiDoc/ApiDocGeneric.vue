<template>
  <section class="section-grey">
    <div class="container">
      <div class="column__icon">
        <img src="@/assets/img/icons/computer-user.svg" alt="">
      </div>
      <div class="column__right">
        <h2>Maitrisez l'API Sirene.</h2>
        <h3>Comment interroger l'API ?</h3>
        <p>
          Vous devez faire pour cela une requête GET. L'adresse de notre API est : <a href="https://sirene.entreprise.api.gouv.fr/">https://sirene.entreprise.api.gouv.fr/</a><br>
          Attention, vous devez rajouter votre requête sur l'adresse.
        </p>
        <h3>Format de réponse</h3>
        <p>
          L'API vous renverra les informations demandées au format JSON (code 200).<br>
          Vous recevrez un code 404 si aucun établissement n'est trouvé, ou un 500 si notre serveur n'est pas fonctionnel (par exemple pendant une maintenance).
        </p>
        <h3>Limite de requêtes</h3>
        <p>
          Notre serveur accepte 2000 requêtes / 10 minutes. Au delà, vous risquez un bannissement de votre IP.<br>
          Pour effectuer davantage de requêtes, vous pouvez installer votre propre copie de l'API.
          Un <a href="https://github.com/betagouv/sirene_as_api_ansible">script ansible</a> est à votre disposition pour cela.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApiDocGeneric'
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: $tablet) {
    flex-direction: row;
  }
}

.column__icon {
  display: flex;
  justify-content: center;

  @media screen and (max-width: $tablet) {
    align-items: center;
    width: 100%;
    order: 1;
  }
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
    order: 0;
  }
}

.column__right {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
}

h3 {
  margin-bottom: 0;
}

</style>
