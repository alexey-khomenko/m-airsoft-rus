export interface IBanner {
  title: string;
  link: string;
  img: string;
}

export interface IProductTile {
  id: number;
  link: string;
  img: string;
  title: string;
  rating: number;
  oldPrice: number;
  price: number;
}

export interface IProductGroup {
  title: string;
  link: string;
  products: IProductTile[];
  banner: IBanner;
}

export interface INewsItem {
  title: string;
  link: string;
  date: string;
}

export interface IReview {
  title: string;
  link: string;
  img: string;
}

export interface IBrand {
  title: string;
  link: string;
  img: string;
  width: number;
  height: number;
}

export interface ICatalog {
  id: number;
  name: string;
  link: string;
  sections: ILink[];
  info: string;
}

export interface IOption {
  alias: string;
  title: string;
}

export interface ILink {
  link: string;
  name: string;
}

export interface IFilterCheckbox {
  name: string;
  label: string;
  icon?: string;
  checked?: boolean;
}

export interface IFilterGroups {
  title: string;
  checkboxes: IFilterCheckbox[];
}

export interface IFilter {
  minPrice: number;
  maxPrice: number;
  switches: IFilterCheckbox[];
  groups: IFilterGroups[];
}

export interface IPopupFilter {
  action: string;
  filter: IFilter;
  minPriceValue?: number;
  maxPriceValue?: number;
}
