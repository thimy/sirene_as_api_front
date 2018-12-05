<template>
  <section class="section section-white">
    <div class="container text-center">
      <h1>Les APIs Open Data</h1>
      <p class="text-center lead-text">
        Entreprise.data.gouv.fr est en phase intensive de développement.<br/>
        De nombreuses APIs sont en cours d’ajout !
      </p>
      <p class="text-center lead-text">
        Vous pouvez vous inscrire à notre mailing-list pour vous tenir au courant
        des nouveautés et changements à venir.<br/>
        Vos informations ne seront jamais utilisées à des fins commerciales.
      </p>
      <api-doc-mail />
    </div>
  </section>
</template>

<script>
import ApiDocMail from '@/components/apiDoc/ApiDocMail'
export default {
  name: 'ApiDocIntro',
  components: { 'ApiDocMail': ApiDocMail}
}
</script>

<style lang="scss" scoped>
  .section {
    padding-bottom: 2em;
  }
</style>

