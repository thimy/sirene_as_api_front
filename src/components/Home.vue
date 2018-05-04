<template>
  <div>
    <Api />
    <PublicAdministration />
  </div>
</template>

<script>
import Api from '@/components/home/Api.vue'
import PublicAdministration from '@/components/home/PublicAdministration.vue'

export default {
  name: 'Home',
  components: {
    'Api': Api,
    'PublicAdministration': PublicAdministration
  }
}
</script>