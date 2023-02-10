import {
  Link,
  SingleItemContent,
  SingleItemResponse,
  SocialLink,
} from "@/types";

export const useGetImageFieldUrl = (
  singleItemResponse: SingleItemResponse,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.item.elements[fieldName];
  if (!field?.value) return "";
  return field.value[0].url || "";
};

export const useGetContentImageFieldUrl = (
  singleItemResponse: SingleItemContent,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.elements[fieldName];
  if (!field?.value) return "";
  return field.value[0].url || "";
};

export const useGetTextFieldValue = (
  singleItemResponse: SingleItemResponse,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.item.elements[fieldName];
  return field?.value || "";
};

export const useGetContentTextFieldValue = (
  singleItemResponse: SingleItemContent,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.elements[fieldName];
  return field?.value || "";
};

export const useSocialLinkListValue = (
  singleItemResponse: SingleItemResponse,
  fieldName: string
): SocialLink[] =>
  getLinkListValue<SocialLink>(
    singleItemResponse,
    fieldName,
    (linkInfo) =>
      <SocialLink>{
        text: linkInfo.elements._link__link_text.value,
        url: linkInfo.elements._link__url.value,
        icon: linkInfo.elements.icon.value,
      }
  );

export const useGetLinkListValue = (
  singleItemResponse: SingleItemResponse,
  fieldName: string
): Link[] =>
  getLinkListValue<Link>(
    singleItemResponse,
    fieldName,
    (linkInfo) =>
      <Link>{
        text: linkInfo.elements._link__link_text.value,
        url: linkInfo.elements._link__url.value,
      }
  );

export const useGetContentAreaValue = (
  singleItemResponse: SingleItemResponse,
  fieldName: string
): SingleItemContent[] => {
  const contentAreaElements = <any[]>(
    singleItemResponse.item.elements[fieldName]?.value
  );
  if (!contentAreaElements || contentAreaElements.length == 0) return [];
  const elements: SingleItemContent[] = [];
  contentAreaElements.forEach((el) => {
    const contentElement = singleItemResponse.modular_content[el];
    if (!contentElement) return;
    elements.push(contentElement);
  });
  return elements;
};

export const useGetModularContentValue = (
  singleItemResponse: SingleItemResponse,
  singleItemContent: SingleItemContent,
  fieldName: string
): SingleItemContent[] => {
  const contentAreaElements = <any[]>(
    singleItemContent.elements[fieldName]?.value
  );
  if (!contentAreaElements || contentAreaElements.length == 0) return [];
  const elements: SingleItemContent[] = [];
  contentAreaElements.forEach((el) => {
    const contentElement = singleItemResponse.modular_content[el];
    if (!contentElement) return;
    elements.push(contentElement);
  });
  return elements;
};

const getLinkListValue = <T>(
  singleItemResponse: SingleItemResponse,
  fieldName: string,
  valueGetter: (data: any) => T
): T[] => {
  const linkNames = <any[]>singleItemResponse.item.elements[fieldName]?.value;
  if (!linkNames || linkNames.length == 0) return [];
  const links: T[] = [];
  linkNames.forEach((linkName) => {
    const linkInfo = singleItemResponse.modular_content[linkName];
    if (!linkInfo) return;
    links.push(valueGetter(linkInfo));
  });
  return links;
};
