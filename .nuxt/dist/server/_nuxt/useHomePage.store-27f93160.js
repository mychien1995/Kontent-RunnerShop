import { ref, getCurrentInstance, onServerPrefetch, unref, computed, reactive } from "vue";
import { u as useNuxtApp, c as createError, a as useRuntimeConfig, d as defineStore } from "../server.mjs";
import { hash } from "ohash";
import "destr";
const getDefault = () => null;
function useAsyncData(...args) {
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? ((_a = options.default) == null ? void 0 : _a.call(options)) ?? null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(((_a2 = options.default) == null ? void 0 : _a2.call(options)) ?? null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const useGetImageFieldUrl = (singleItemResponse, fieldName) => {
  const field = singleItemResponse.item.elements[fieldName];
  if (!(field == null ? void 0 : field.value))
    return "";
  return field.value[0].url || "";
};
const useGetContentImageFieldUrl = (singleItemResponse, fieldName) => {
  const field = singleItemResponse.elements[fieldName];
  if (!(field == null ? void 0 : field.value))
    return "";
  return field.value[0].url || "";
};
const useGetTextFieldValue = (singleItemResponse, fieldName) => {
  const field = singleItemResponse.item.elements[fieldName];
  return (field == null ? void 0 : field.value) || "";
};
const useGetContentTextFieldValue = (singleItemResponse, fieldName) => {
  const field = singleItemResponse.elements[fieldName];
  return (field == null ? void 0 : field.value) || "";
};
const useSocialLinkListValue = (singleItemResponse, fieldName) => getLinkListValue(
  singleItemResponse,
  fieldName,
  (linkInfo) => ({
    text: linkInfo.elements._link__link_text.value,
    url: linkInfo.elements._link__url.value,
    icon: linkInfo.elements.icon.value
  })
);
const useGetLinkListValue = (singleItemResponse, fieldName) => getLinkListValue(
  singleItemResponse,
  fieldName,
  (linkInfo) => ({
    text: linkInfo.elements._link__link_text.value,
    url: linkInfo.elements._link__url.value
  })
);
const useGetContentAreaValue = (singleItemResponse, fieldName) => {
  var _a;
  const contentAreaElements = (_a = singleItemResponse.item.elements[fieldName]) == null ? void 0 : _a.value;
  if (!contentAreaElements || contentAreaElements.length == 0)
    return [];
  const elements = [];
  contentAreaElements.forEach((el) => {
    const contentElement = singleItemResponse.modular_content[el];
    if (!contentElement)
      return;
    elements.push(contentElement);
  });
  return elements;
};
const useGetModularContentValue = (singleItemResponse, singleItemContent, fieldName) => {
  var _a;
  const contentAreaElements = (_a = singleItemContent.elements[fieldName]) == null ? void 0 : _a.value;
  if (!contentAreaElements || contentAreaElements.length == 0)
    return [];
  const elements = [];
  contentAreaElements.forEach((el) => {
    const contentElement = singleItemResponse.modular_content[el];
    if (!contentElement)
      return;
    elements.push(contentElement);
  });
  return elements;
};
const getLinkListValue = (singleItemResponse, fieldName, valueGetter) => {
  var _a;
  const linkNames = (_a = singleItemResponse.item.elements[fieldName]) == null ? void 0 : _a.value;
  if (!linkNames || linkNames.length == 0)
    return [];
  const links = [];
  linkNames.forEach((linkName) => {
    const linkInfo = singleItemResponse.modular_content[linkName];
    if (!linkInfo)
      return;
    links.push(valueGetter(linkInfo));
  });
  return links;
};
const useFetchContentByKey = (key, parameters) => {
  const baseUrl = getDeliveryApiBaseUrl();
  let getItemUrl = `${baseUrl}/items/${key}`;
  if (parameters.length > 0)
    getItemUrl += "?";
  parameters.forEach((element) => {
    getItemUrl += `${element.key}=${element.value}`;
  });
  return useFetch(getItemUrl, "$JdZK3qWIcS");
};
function getDeliveryApiBaseUrl() {
  const runtimeConfig = useRuntimeConfig();
  const deliveryApiBaseUrl = runtimeConfig.kontent.baseDeliveryApiUrl;
  const projectId = runtimeConfig.kontent.projectId;
  const url = `${deliveryApiBaseUrl}/${projectId}`;
  return url;
}
const createContentStore = (contentId) => {
  return defineStore(contentId, () => {
    const getContentPromoise = ref(Promise.resolve({}));
    let fetched = false;
    function getContent() {
      if (fetched)
        return getContentPromoise.value;
      getContentPromoise.value = useFetchContentByKey(contentId, [
        { key: "depth", value: 20 }
      ]).then((p) => p.data.value);
      fetched = true;
      return getContentPromoise.value;
    }
    return { getContent };
  });
};
const useHomePageStore = createContentStore("home_page");
const useSiteSettingsStore = createContentStore("site_settings");
export {
  useGetContentImageFieldUrl as a,
  useGetContentTextFieldValue as b,
  useGetContentAreaValue as c,
  useHomePageStore as d,
  useSiteSettingsStore as e,
  useGetImageFieldUrl as f,
  useGetLinkListValue as g,
  useGetTextFieldValue as h,
  useSocialLinkListValue as i,
  useGetModularContentValue as u
};
//# sourceMappingURL=useHomePage.store-27f93160.js.map