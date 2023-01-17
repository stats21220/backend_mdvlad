import { IPrice } from "src/interfaces/Price.interface";


export interface ProductCategoryItemDto {
	level: string;
	route?: string
}

export interface ProductCategoryLevelDto {
	first: ProductCategoryItemDto;
	second?: ProductCategoryItemDto;
	third?: ProductCategoryItemDto;
	fifth?:  ProductCategoryItemDto;
}

export class CreateProductDto {
	productId: number;
	image: string;
	calculatedRating: number;
	title: number;
	route?: string;
	categories: ProductCategoryLevelDto;
	price: IPrice[];
	oldPrice?: IPrice[];
	tags: string[];
	characteeristics: {[key:string]: string | number};
	count: number;
	weight: number;
	popular?: 0 | 1;
	special?: 0 | 1;
}