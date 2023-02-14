<script lang="ts" setup>
import { SingleItemResponse, SingleItemContent, OurBrandItem } from "@/types";
const props = defineProps<{
  parentContent: SingleItemResponse;
  fieldName: string;
  content: SingleItemContent;
}>();

const brandItemContents = useGetModularContentValue(
  props.parentContent,
  props.content,
  "items"
);

const title = useGetContentTextFieldValue(props.content, "title");
const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
const brandItems = brandItemContents.map(
  (p) =>
    <OurBrandItem>{
      link: useGetContentTextFieldValue(p, "link"),
      imageSrc: useGetContentImageFieldUrl(p, "image"),
    }
);
</script>

<template>
  <section class="bg-light py-5">
    <div class="container my-4">
      <div class="row text-center py-3">
        <div class="col-lg-6 m-auto">
          <h1 class="h1">{{ title }}</h1>
          <p>
            {{ subtitle }}
          </p>
        </div>
        <div class="col-lg-9 m-auto tempaltemo-carousel">
          <div class="row d-flex flex-row">
            <!--Carousel Wrapper-->
            <div class="col">
              <div
                class="carousel slide carousel-multi-item pt-2 pt-md-0"
                id="templatemo-slide-brand"
                data-bs-ride="carousel"
              >
                <!--Slides-->
                <div class="carousel-inner product-links-wap" role="listbox">
                  <!--First slide-->
                  <div class="carousel-item active">
                    <div class="row">
                      <div
                        class="col-3 p-md-5"
                        v-for="(item, index) in brandItems"
                      >
                        <a :href="item.link"
                          ><img
                            class="img-fluid brand-img"
                            :src="item.imageSrc"
                            alt="Brand Logo"
                        /></a>
                      </div>
                    </div>
                  </div>
                  <!--End First slide-->
                </div>
                <!--End Slides-->
              </div>
            </div>
            <!--End Carousel Wrapper-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
