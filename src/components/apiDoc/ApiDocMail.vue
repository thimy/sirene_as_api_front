<template>
  <form>
    <h4>Inscription Mailing-List</h4>
    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://app.mailjet.com/widget/iframe/zR1/ack" width="340" height="95"></iframe>
  </form>
</template>

<script>
export default {
  name: 'ApiDocMail'
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
iframe {
  margin: auto;
  @media screen and (max-width: $mobile) {
    width: 290px;
  }
}
</style>

