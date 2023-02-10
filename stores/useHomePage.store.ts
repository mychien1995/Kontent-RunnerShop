import createContentStore from "./useContent.store";
const useHomePageStore = createContentStore("home_page");
const useSiteSettingsStore = createContentStore("site_settings");
export { useHomePageStore, useSiteSettingsStore };
