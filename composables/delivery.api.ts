import { QueryParam } from "@/types";

export const useFetchContentByKey = (key: String, parameters: any[]) => {
  const baseUrl = getDeliveryApiBaseUrl();
  let getItemUrl = `${baseUrl}/items/${key}`;
  if (parameters.length > 0) getItemUrl += "?";
  parameters.forEach((element) => {
    getItemUrl += `${element.key}=${element.value}`;
  });
  return useFetch(getItemUrl);
};

export const useFetchContentItems = (params: QueryParam[]) => {
  const baseUrl = getDeliveryApiBaseUrl();
  let getItemsUrl = `${baseUrl}/items/`;
  if (params.length > 0) getItemsUrl += "?";
  params.forEach((element) => {
    getItemsUrl += `${element.key}=${element.value}&`;
  });
  return useFetch(getItemsUrl);
};

function getDeliveryApiBaseUrl(): String {
  const runtimeConfig = useRuntimeConfig();
  const deliveryApiBaseUrl = runtimeConfig.kontent.baseDeliveryApiUrl;
  const projectId = runtimeConfig.kontent.projectId;
  const url = `${deliveryApiBaseUrl}/${projectId}`;
  return url;
}
