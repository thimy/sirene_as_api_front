<template>
  <div>
    <api-doc-rncs-coming-soon/>
  </div>
</template>

<script>
import ApiDocRNCSComingSoon from '@/components/apiDoc/apiDocRNCS/ApiDocRNCSComingSoon'

export default {
  name: 'ApiDocRNCS',
  metaInfo: {
    title: 'Doc API RNCS'
  },
  components: {
    'ApiDocRncsComingSoon': ApiDocRNCSComingSoon
  },
  data () {
    return {
      baseAdress: ""
    }
  }
}

</script>
