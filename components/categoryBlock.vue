<script lang="ts" setup>
import {
  SingleItemResponse,
  SingleItemContent,
  CategoryBlockItem,
} from "@/types";
const props = defineProps<{
  parentContent: SingleItemResponse;
  fieldName: string;
  content: SingleItemContent;
}>();

const categoryItemsContent = useGetModularContentValue(
  props.parentContent,
  props.content,
  "category_items"
);

const categoryItems = categoryItemsContent.map(
  (c) =>
    <CategoryBlockItem>{
      imageSrc: useGetContentImageFieldUrl(c, "thumbnail"),
      link: useGetContentTextFieldValue(c, "link"),
      title: useGetContentTextFieldValue(c, "title"),
    }
);

const title = useGetContentTextFieldValue(props.content, "title");
const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
</script>

<template>
  <section class="container py-5">
    <div class="row text-center pt-3">
      <div class="col-lg-6 m-auto">
        <h1 class="h1">{{ title }}</h1>
        <p>
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-4 p-5 mt-3"
        v-for="(item, index) in categoryItems"
      >
        <a href="#"
          ><img :src="item.imageSrc" class="rounded-circle img-fluid border category-img"
        /></a>
        <h5 class="text-center mt-3 mb-3">{{ item.title }}</h5>
        <p class="text-center">
          <a :href="item.link" class="btn btn-success">Go Shop</a>
        </p>
      </div>
    </div>
  </section>
</template>
