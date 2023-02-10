<script lang="ts" setup>
import {
  SingleItemResponse,
  SingleItemContent,
  FeaturedProductItem,
} from "@/types";
const props = defineProps<{
  parentContent: SingleItemResponse;
  fieldName: string;
  content: SingleItemContent;
}>();

const productsContent = useGetModularContentValue(
  props.parentContent,
  props.content,
  "products"
);

const title = useGetContentTextFieldValue(props.content, "title");
const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
const products = productsContent.map(
  (p) =>
    <FeaturedProductItem>{
      imageSrc: useGetContentImageFieldUrl(p, "thumbnail"),
      name: useGetContentTextFieldValue(p, "product_name"),
      price: parseFloat(useGetContentTextFieldValue(p, "price")),
      rating: parseFloat(useGetContentTextFieldValue(p, "rating")),
      description: useGetContentTextFieldValue(
        p,
        "_pagebase__page_description"
      ),
    }
);
</script>

<template>
  <section class="bg-light">
    <div class="container py-5">
      <div class="row text-center py-3">
        <div class="col-lg-6 m-auto">
          <h1 class="h1">{{ title }}</h1>
          <p>
           {{ subtitle }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mb-4" v-for="(item, index) in products">
          <div class="card h-100">
            <a href="/">
              <img
                :src="item.imageSrc"
                class="card-img-top"
              />
            </a>
            <div class="card-body">
              <ul class="list-unstyled d-flex justify-content-between">
                <li>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-muted fa fa-star"></i>
                  <i class="text-muted fa fa-star"></i>
                </li>
                <li class="text-muted text-right">${{ item.price }}</li>
              </ul>
              <a
                href="shop-single.html"
                class="h2 text-decoration-none text-dark"
                >{{ item.name }}</a
              >
              <p class="card-text">
                {{  item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
