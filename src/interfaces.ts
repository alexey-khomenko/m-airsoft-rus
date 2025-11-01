export interface IBanner {
  title: string;
  link: string;
  img: string;
}

export interface IOption {
  alias: string;
  title: string;
}

export interface ILink {
  link: string;
  name: string;
}

export interface INewsSlide {
  name: string;
  link: string;
  img: string;
}

export interface IProductGroup {
  title: string;
  link: string;
  products: IProductTile[];
  banner: IBanner;
}

export interface IIndexNews {
  name: string;
  link: string;
  date: string;
}

export interface IIndexBrand {
  name: string;
  link: string;
  img: string;
  width: number;
  height: number;
}

export interface IIndex {
  largeBanners: IBanner[];
  smallBanners: IBanner[];
  productGroups: IProductGroup[];
  news: IIndexNews[];
  reviews: INewsSlide[];
  brands: IIndexBrand[];
}

export interface IUser {
  tel: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  amount: number;
  balance: number;
}

export interface ICatalog {
  id: number;
  name: string;
  link: string;
  sections: ILink[];
  info: string;
}

export interface IProduct {
  id: number;
  name: string;
  link: string;
  rating: number;
  sections: ILink[];
  inCart: boolean;
}

export interface INews {
  id: number;
  name: string;
  link: string;
  info: string;
}

export interface IPageNews {
  news: INewsTile[];
  lastPage: number;
}

export interface INewsComment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface INewsDetail {
  news: INews;
  items: INewsSlide[];
  comments: INewsComment[];
}

export interface IOrderPayment {
  type: string;
  amount: number;
}

export interface IOrderDelivery {
  type: string;
  info: string;
  price: number;
}

export interface IOrderPosition {
  title: string;
  price: number;
}

export interface IOrder {
  number: number;
  date: string;
  payment: IOrderPayment;
  delivery: IOrderDelivery;
  positions: IOrderPosition[];
}

export interface ICartPosition {
  cartId: number;
  productId: number;
  productName: string;
  quantity: number;
  quantityMax: number;
  price: number;
  priceOld: number;
  img: string;
}

export interface ISearchResult {
  name: string;
  link: string;
  img: string;
  priceOld: number;
  price: number;
}

export interface IProductTile {
  id: number;
  link: string;
  img: string;
  name: string;
  rating: number;
  oldPrice: number;
  price: number;
  inCart: boolean;
}

export interface INewsTile {
  link: string;
  img: string;
  name: string;
  date: string;
}

export interface IOrderTile {
  number: number;
  status: string;
}

export interface IFilterCheckbox {
  name: string;
  label: string;
  img?: string;
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
