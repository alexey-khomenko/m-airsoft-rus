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
  banner: { title: string; link: string; img: string };
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
