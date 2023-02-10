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
