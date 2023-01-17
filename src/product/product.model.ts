import { IPrice } from "src/interfaces/Price.interface";


export interface ProductCategoryItem {
	level: string;
	route?: string
}

export interface ProductCategoryLevel {
	first: ProductCategoryItem;
	second?: ProductCategoryItem;
	third?: ProductCategoryItem;
	fifth?:  ProductCategoryItem;
}

export class ProductModel {
	productId: number;
	image: string;
	calculatedRating: number;
	title: number;
	route?: string;
	categories: ProductCategoryLevel;
	price: IPrice[];
	oldPrice?: IPrice[];
	tags: string[];
	characteeristics: {[key:string]: string | number};
	count: number;
	weight: number;
	popular?: 0 | 1;
	special?: 0 | 1;
}
