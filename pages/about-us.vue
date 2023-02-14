<script lang="ts" setup>
const about = await useAboutUsPageStore().getContent();
const title = useGetTextFieldValue(about, 'banner_title');
const subtitle = useGetTextFieldValue(about, 'banner_subtitle');
const imageSrc = useGetImageFieldUrl(about, 'banner_image');
</script>

<template>
  <section class="bg-success py-5">
    <div class="container">
      <div class="row align-items-center py-5">
        <div class="col-md-8 text-white">
          <h1>{{ title }}</h1>
          <p>
            {{ subtitle }}
          </p>
        </div>
        <div class="col-md-4">
          <img :src="imageSrc" alt="About Hero" />
        </div>
      </div>
    </div>
  </section>
  <contentArea v-bind="{ content: about, contentAreaFieldName: 'components' }">
  </contentArea>
</template>
