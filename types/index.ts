export interface Link {
  text: string;
  url: string;
}

export interface SocialLink {
  text: string;
  url: string;
  icon: string;
}

export interface SingleItemResponse {
  item: SingleItemContent;
  modular_content: any;
}
export interface MultipleItemsResponse {
  items: SingleItemContent[];
}

export interface SingleItemContent {
  system: ItemSystemInfo;
  elements: any;
}

export interface ContentAreaComponent {
  component: any;
  content: SingleItemContent;
}

export interface ItemSystemInfo {
  id: string;
  name: string;
  codename: string;
  type: string;
  language: string;
}

export interface BannerImage {
  imageSrc: string;
  title: string;
  subTitle: string;
  description: string;
}

export interface CategoryBlock {
  title: string;
  subtitle: string;
  items: CategoryBlockItem[];
}

export interface CategoryBlockItem {
  imageSrc: string;
  link: string;
  title: string;
}

export interface FeaturedProductItem {
  imageSrc: string;
  link: string;
  rating: number;
  price: number;
  name: string;
  description: string;
}

export interface OurServiceItem {
  title: string;
  icon: string;
}

export interface OurBrandItem {
  link: string;
  imageSrc: string;
}

export interface QueryParam {
  key: string;
  value: string;
}

export interface ProductListingItem{
  imageSrc : string;
  name : string;
  price : string;
  sizes : string;
}

declare global {
  interface Window {
    L: any;
  }
}
