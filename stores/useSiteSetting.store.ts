// import { SingleItemResponse } from "@/types";
// import { defineStore } from "pinia";
// const useSiteSettingsStore = defineStore("siteSettings", () => {
//   const getSiteSettingsPromise = ref(Promise.resolve(<SingleItemResponse>{}));
//   let fetched = false;

//   function getSiteSettings(): Promise<SingleItemResponse> {
//     if (fetched) return getSiteSettingsPromise.value;
//     getSiteSettingsPromise.value = useFetchContentByKey("site_settings", [
//       { key: "depth", value: 20 },
//     ]).then((p) => <any>p.data.value);
//     fetched = true;
//     return getSiteSettingsPromise.value;
//   }

//   return { getSiteSettings };
// });

// export default useSiteSettingsStore;
