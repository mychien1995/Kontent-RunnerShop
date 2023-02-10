<script lang="ts" setup>
import { SingleItemResponse, SingleItemContent, BannerImage } from "@/types";

const props = defineProps<{
  parentContent: SingleItemResponse;
  fieldName: string;
  content: SingleItemContent;
}>();


const bannersContent = useGetModularContentValue(
  props.parentContent,
  props.content,
  "images"
);

const banners = bannersContent.map(
  (content) =>
    <BannerImage>{
      imageSrc: useGetContentImageFieldUrl(content, "banner_image"),
      description: useGetContentTextFieldValue(content, "description"),
      title: useGetContentTextFieldValue(content, "title"),
      subTitle: useGetContentTextFieldValue(content, "subtitle"),
    }
);
</script>
<template>
  <div
    id="template-mo-zay-hero-carousel"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        data-bs-target="#template-mo-zay-hero-carousel"
        :data-bs-slide-to="index"
        :class="index == 0 ? 'active' : ''"
        v-for="(item, index) in banners"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in banners"
        :class="'carousel-item ' + (index == 0 ? 'active' : '')"
      >
        <div class="container">
          <div class="row p-5">
            <div class="mx-auto col-md-8 col-lg-6 order-lg-last banner-img-wrapper">
              <img class="img-fluid" :src="item.imageSrc" alt="" />
            </div>
            <div class="col-lg-6 mb-0 d-flex align-items-center">
              <div class="text-align-left align-self-center">
                <h1 class="h1 text-success">{{ item.title }}</h1>
                <h3 class="h2">{{ item.subTitle }}</h3>
                <div v-html="item.description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev text-decoration-none w-auto ps-3"
      href="#template-mo-zay-hero-carousel"
      role="button"
      data-bs-slide="prev"
    >
      <i class="fas fa-chevron-left"></i>
    </a>
    <a
      class="carousel-control-next text-decoration-none w-auto pe-3"
      href="#template-mo-zay-hero-carousel"
      role="button"
      data-bs-slide="next"
    >
      <i class="fas fa-chevron-right"></i>
    </a>
  </div>
</template>
