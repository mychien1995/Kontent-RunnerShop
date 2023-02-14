// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "~~": "/",
    "@@": "/",
    "~": "/",
    "@": "",
    assets: "/assets",
    public: "/public",
  },
  components: {
    dirs: [
      {
        watch: true,
        path: "components",
        enabled: true,
      },
    ],
  },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700;900&display=swap",
        },
      ],
      style: [],
      script: [
        {
          src: "/js/jquery-1.11.0.min.js",
          tagPosition : "bodyClose",
          type : "text/javascript"
        },
        {
          src: "/js/jquery-migrate-1.2.1.min.js",
          tagPosition : "bodyClose",
          type : "text/javascript"
        },
        {
          src: "/js/bootstrap.bundle.min.js",
          tagPosition : "bodyClose",
          type : "text/javascript"
        },
        {
          src: "/js/templatemo.min.js",
          tagPosition : "bodyClose",
          type : "text/javascript"
        },
        {
          src: "/js/custom.js",
          tagPosition : "bodyClose",
          type : "text/javascript"
        },
      ],
      noscript: [],
    },
  },
  css: [
    "/assets/css/bootstrap.min.css",
    "/assets/css/templatemo.css",
    "/assets/css/custom.css",
    "/assets/css/fontawesome.min.css",
  ],
  nitro: {
    dev: true,
    devServer: {
      watch: [
        "*.ts",
        "*.vue",
        "/components/*.vue",
        "/components/appHeader.vue",
      ],
    },
  },
  runtimeConfig: {
    public: {
      kontent: {
        baseDeliveryApiUrl: "https://deliver.kontent.ai",
        projectId: "b1df6711-4e2a-023d-c7ae-c75d64d8321a",
      },
    },
  },
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: ["stores"],
  },
});
