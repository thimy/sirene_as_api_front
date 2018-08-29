<template>
  <div>
    <home-api-sirene />
    <home-api-rna />
    <home-public-administration />
  </div>
</template>

<script>
import HomeAPISirene from '@/components/home/HomeAPISirene'
import HomeAPIRNA from '@/components/home/HomeAPIRNA'
import HomePublicAdministration from '@/components/home/HomePublicAdministration'

export default {
  name: 'Home',
  components: {
    'HomeApiSirene': HomeAPISirene,
    'HomeApiRna': HomeAPIRNA,
    'HomePublicAdministration': HomePublicAdministration
  }
}
</script>