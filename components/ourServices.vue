<script lang="ts" setup>
import { SingleItemResponse, SingleItemContent, OurServiceItem } from "@/types";
const props = defineProps<{
  parentContent: SingleItemResponse;
  fieldName: string;
  content: SingleItemContent;
}>();

const serviceItemContents = useGetModularContentValue(
  props.parentContent,
  props.content,
  "items"
);

const title = useGetContentTextFieldValue(props.content, "title");
const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
const serviceItems = serviceItemContents.map(
  (p) =>
    <OurServiceItem>{
      title: useGetContentTextFieldValue(p, "title"),
      icon: useGetContentTextFieldValue(p, "icon"),
    }
);


</script>

<template>
  <section class="container py-5">
    <div class="row text-center pt-5 pb-3">
      <div class="col-lg-6 m-auto">
        <h1 class="h1"> {{ title }}</h1>
        <p>
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-3 pb-5" v-for="(item,index) in serviceItems">
        <div class="h-100 py-5 services-icon-wap shadow">
          <div class="h1 text-success text-center">
            <i :class="'fa fa-lg '+ item.icon"></i>
          </div>
          <h2 class="h5 mt-4 text-center">{{ item.title }}</h2>
        </div>
      </div>
    </div>
  </section>
</template>
