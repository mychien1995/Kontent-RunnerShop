import { SingleItemResponse } from "@/types";
import { defineStore } from "pinia";
const createContentStore = (contentId: string) => {
  return defineStore(contentId, () => {
    const getContentPromoise = ref(Promise.resolve(<SingleItemResponse>{}));
    let fetched = false;

    function getContent(): Promise<SingleItemResponse> {
      if (fetched) return getContentPromoise.value;
      getContentPromoise.value = useFetchContentByKey(contentId, [
        { key: "depth", value: 20 },
      ]).then((p) => <any>p.data.value);
      fetched = true;
      return getContentPromoise.value;
    }

    return { getContent };
  });
};

export default createContentStore;
