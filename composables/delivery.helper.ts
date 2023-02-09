import { Link, SocialLink } from "@/types";

export const useGetImageFieldUrl = (
  singleItemResponse: any,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.item.elements[fieldName];
  if (!field?.value) return "";
  return field.value[0].url || "";
};

export const useGetTextFieldValue = (
  singleItemResponse: any,
  fieldName: string
): string => {
  const field = <any>singleItemResponse.item.elements[fieldName];
  return field?.value || "";
};

export const useSocialLinkListValue = (
  singleItemResponse: any,
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
  singleItemResponse: any,
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

const getLinkListValue = <T>(
  singleItemResponse: any,
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
