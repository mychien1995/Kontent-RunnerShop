<script lang="ts" setup>
const siteSettings = await useSiteSettingsStore().getContent();
const shopName = useGetTextFieldValue(siteSettings, "footer_shop_name");
const email = useGetTextFieldValue(siteSettings, "email");
const phone = useGetTextFieldValue(siteSettings, "phone");
const address = useGetTextFieldValue(siteSettings, "address");
const footerColumn1Text = useGetTextFieldValue(
  siteSettings,
  "footer_column_1_title"
);
const footerColumn1LinkLists = useGetLinkListValue(
  siteSettings,
  "footer_column_1_links"
);
const footerColumn2Text = useGetTextFieldValue(
  siteSettings,
  "footer_column_2_title"
);
const footerColumn2LinkLists = useGetLinkListValue(
  siteSettings,
  "footer_column_2_links"
);
const socialLinks = useSocialLinkListValue(siteSettings, "social_links");
</script>

<template>
  <footer class="bg-dark" id="tempaltemo_footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4 pt-5">
          <h2 class="h2 text-success border-bottom pb-3 border-light logo">
            {{ shopName }}
          </h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li>
              <i class="fas fa-map-marker-alt fa-fw"></i>
              {{ address }}
            </li>
            <li>
              <i class="fa fa-phone fa-fw"></i>&nbsp;
              <a class="text-decoration-none" :href="'tel:' + phone">
                {{ phone }}</a
              >
            </li>
            <li>
              <i class="fa fa-envelope fa-fw"></i>&nbsp;
              <a class="text-decoration-none" :href="'mailto:' + email">
                {{ email }}</a
              >
            </li>
          </ul>
        </div>

        <div class="col-md-4 pt-5">
          <h2 class="h2 text-light border-bottom pb-3 border-light">
            {{ footerColumn1Text }}
          </h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li v-for="(item, index) in footerColumn1LinkLists">
              <a class="text-decoration-none" :href="item.url">{{
                item.text
              }}</a>
            </li>
          </ul>
        </div>

        <div class="col-md-4 pt-5">
          <h2 class="h2 text-light border-bottom pb-3 border-light">
            {{ footerColumn2Text }}
          </h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li v-for="(item, index) in footerColumn2LinkLists">
              <a class="text-decoration-none" :href="item.url">{{
                item.text
              }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row text-light mb-4">
        <div class="col-12 mb-3">
          <div class="w-100 my-3 border-top border-light"></div>
        </div>
        <div class="col-auto me-auto">
          <ul class="list-inline text-left footer-icons">
            <li
              class="list-inline-item border border-light rounded-circle text-center"
              v-for="(item, index) in socialLinks"
            >
              <a
                class="text-light text-decoration-none"
                target="_blank"
                href="http://facebook.com/"
                ><i :class="'fab fa-lg fa-fw ' + item.icon"></i
              ></a>
            </li>
          </ul>
        </div>
        <div class="col-auto">
          <label class="sr-only" for="subscribeEmail">Email address</label>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control bg-dark border-light"
              id="subscribeEmail"
              placeholder="Email address"
            />
            <div class="input-group-text btn-success text-light">Subscribe</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
