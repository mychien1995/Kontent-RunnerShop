<script lang="ts" setup>
const homePageContent = await useHomePageStore().getContent();
</script>

<template>
  <contentArea
    v-bind="{ content: homePageContent, contentAreaFieldName: 'components' }"
  >
  </contentArea>
</template>