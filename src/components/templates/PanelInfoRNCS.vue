<template>
  <div>
    <template v-for="(key, name) in elements">
      <div :key="key" v-if="parent[key]" :class="[inlineLabels ? 'company__item-inline' : 'company__item']">
        <div class="company__item-key">{{ name }}</div>
        <div class="company__item-value">{{ parent[key] }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PanelInfoRNCS',
  props: ['parent', 'elements', 'inlineLabels']
}
</script>
