import createContentStore from "./useContent.store";
const useHomePageStore = createContentStore("home_page");
const useSiteSettingsStore = createContentStore("site_settings");
const useAboutUsPageStore = createContentStore("about_us_page");
const useContactUsPageStore = createContentStore("contact_us_page");
export { useHomePageStore, useSiteSettingsStore, useAboutUsPageStore, useContactUsPageStore };
