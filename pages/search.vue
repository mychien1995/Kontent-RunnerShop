<script lang="ts" setup>
import { useFetchContentItems } from "@/composables/delivery.api";
import { MultipleItemsResponse, ProductListingItem } from "@/types";

const route = useRoute();

const categories = <MultipleItemsResponse>(
  (await useFetchContentItems([{ key: "system.type", value: "category" }])).data
    .value
);

categories.items.sort((a, b) =>
  (<string>a.elements.category_name.value).localeCompare(
    <string>b.elements.category_name.value
  )
);

const productItems = useState('productList', () => <ProductListingItem[]>[]);

const loadProducts = async (category: string) => {
  productItems.value = [];
  const productQuery = [
    { key: "system.type", value: "product" },
    { key: "limit", value: "40" },
  ];

  if (category)
    productQuery.push({
      key: "elements.categories[contains]",
      value: category.toLowerCase(),
    });

  const productContents = <MultipleItemsResponse>(
    (await useFetchContentItems(productQuery)).data.value
  );

  productContents.items.forEach((element) => {
    productItems.value.push(<ProductListingItem>{
      imageSrc: useGetContentImageFieldUrl(element, "thumbnail"),
      name: useGetContentTextFieldValue(element, "product_name"),
      price: useGetContentTextFieldValue(element, "price"),
      sizes: useGetContentTextFieldValue(element, "sizes"),
    });
  });
};

await loadProducts(<string>route.query.category);

</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="h2 pb-4">Categories</h1>
        <ul class="list-unstyled templatemo-accordion">
          <li class="pb-3" v-for="(item, index) in categories.items">
            <a
              class="collapsed d-flex justify-content-between h3 text-decoration-none"
              href="#"
              @click="loadProducts(item.system.codename)"
            >
              {{ item.elements.category_name.value }}
            </a>
          </li>
        </ul>
      </div>

      <div class="col-lg-9">
        <div class="row">
          <div class="col-md-4" v-for="(item, index) in productItems">
            <div class="card mb-4 product-wap rounded-0">
              <div class="card rounded-0">
                <div
                  class="card-img rounded-0 img-fluid"
                  :style="{ backgroundImage: 'url(' + item.imageSrc + ')' }"
                />
                <div
                  class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                >
                  <ul class="list-unstyled">
                    <li>
                      <a class="btn btn-success text-white" href="#"
                        ><i class="far fa-heart"></i
                      ></a>
                    </li>
                    <li>
                      <a class="btn btn-success text-white mt-2" href="#"
                        ><i class="far fa-eye"></i
                      ></a>
                    </li>
                    <li>
                      <a class="btn btn-success text-white mt-2" href="#"
                        ><i class="fas fa-cart-plus"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card-body">
                <a
                  href="#"
                  class="h3 text-decoration-none"
                  :style="{ height: '20px', display: 'block' }"
                  >{{ item.name }}</a
                >
                <br />
                <ul
                  class="w-100 list-unstyled d-flex justify-content-between mb-0"
                >
                  <li>{{ item.sizes }}</li>
                </ul>
                <br />
                <p class="text-center mb-0">$ {{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Content -->
</template>
