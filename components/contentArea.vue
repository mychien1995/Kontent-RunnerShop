<script lang="ts" setup>
import {
  SingleItemResponse,
  SingleItemContent,
  ContentAreaComponent,
} from "@/types";
import Carousel from "./carousel.vue";
import CategoryBlock from "./categoryBlock.vue";
import FeaturedProduct from "./featuredProduct.vue";
import OurBrands from "./ourBrands.vue";
import OurServices from "./ourServices.vue";

const componentMap = <any>{
  carousel: Carousel,
  category_block: CategoryBlock,
  featured_product_block: FeaturedProduct,
  our_services_block: OurServices,
  our_brand_block: OurBrands,
};

const props = defineProps<{
  content: SingleItemResponse;
  contentAreaFieldName: string;
}>();

const contentAreaValues = useGetContentAreaValue(
  props.content,
  props.contentAreaFieldName
);

const contentAreaElements = contentAreaValues
  .map(
    (v) =>
      <ContentAreaComponent>{
        content: v,
        component: componentMap[v.system.type],
      }
  )
  .filter((v) => v.component);

const getChildProps = (element: SingleItemContent) => ({
  parentContent: props.content,
  fieldName: element.system.codename,
  content: element,
});
</script>

<template>
  <div v-for="(element, index) in contentAreaElements">
    <component
      v-bind:is="element.component"
      v-bind="getChildProps(element.content)"
    />
  </div>
</template>
