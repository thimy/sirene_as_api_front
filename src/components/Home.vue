<template>
  <div>
    <home-apis />
    <home-public-administration />
  </div>
</template>

<script>
import HomeAPIs from '@/components/home/HomeAPIs'
import HomePublicAdministration from '@/components/home/HomePublicAdministration'

export default {
  name: 'Home',
  components: {
    'HomeApis': HomeAPIs,
    'HomePublicAdministration': HomePublicAdministration
  }
}
</script>