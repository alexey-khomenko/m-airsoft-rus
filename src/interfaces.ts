export interface IBanner {
  title: string;
  link: string;
  img: string;
}

export interface IProduct {
  id: number;
  name: string;
  link: string;
  rating: number;
  sections: ILink[];
}

export interface IProductTile {
  id: number;
  link: string;
  img: string;
  title: string; // TODO name
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

export interface INews {
  name: string;
  link: string;
  date: string;
}

export interface IReview {
  name: string;
  link: string;
  img: string;
}

export interface IBrand {
  name: string;
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

export interface ISearchResult {
  name: string;
  link: string;
  img: string;
  oldPrice: number;
  price: number;
}

export interface IProfileInfo {
  tel: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  amount: number;
  balance: number;
}

export interface IProfileOrder {
  number: number;
  status: string;
}

export interface IFilterCheckbox {
  name: string;
  label: string;
  icon?: string;
}

export interface IFilterGroup {
  title: string;
  checkboxes: IFilterCheckbox[];
}

export interface IFilter {
  minPrice: number;
  maxPrice: number;
  switches: IFilterCheckbox[];
  groups: IFilterGroup[];
}

export interface IPopupFilter {
  action: string;
  filter: IFilter;
}
