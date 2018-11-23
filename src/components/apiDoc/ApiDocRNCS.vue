<template>
  <div>
    <api-doc-rncs-intro />
    <api-doc-rncs-generic />
    <api-doc-rncs-coming-soon/>
  </div>
</template>

<script>
import ApiDocRNCSIntro from '@/components/apiDoc/apiDocRNCS/ApiDocRNCSIntro'
import ApiDocRNCSComingSoon from '@/components/apiDoc/apiDocRNCS/ApiDocRNCSComingSoon'
import ApiDocRNCSGeneric from '@/components/apiDoc/apiDocRNCS/ApiDocRNCSGeneric'

export default {
  name: 'ApiDocRNCS',
  metaInfo: {
    title: 'Doc API RNCS'
  },
  components: {
    'ApiDocRncsComingSoon': ApiDocRNCSComingSoon,
    'ApiDocRncsIntro': ApiDocRNCSIntro,
    'ApiDocRncsGeneric': ApiDocRNCSGeneric
  },
  data () {
    return {
      baseAdress: ""
    }
  }
}

</script>
