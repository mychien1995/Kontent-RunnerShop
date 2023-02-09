export const useFetchContentByKey = (key: String, parameters: any[]) => {
  const baseUrl = getDeliveryApiBaseUrl();
  let getItemUrl = `${baseUrl}/items/${key}`;
  if (parameters.length > 0) getItemUrl += "?";
  parameters.forEach((element) => {
    getItemUrl += `${element.key}=${element.value}`;
  });
  return useFetch(getItemUrl);
};

function getDeliveryApiBaseUrl(): String {
  const runtimeConfig = useRuntimeConfig();
  const deliveryApiBaseUrl = runtimeConfig.kontent.baseDeliveryApiUrl;
  const projectId = runtimeConfig.kontent.projectId;
  const url = `${deliveryApiBaseUrl}/${projectId}`;
  return url;
}
