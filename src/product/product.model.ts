import { ICategoryLevel } from "src/interfaces/Catgory.interface";
import { IPrice } from "src/interfaces/Price.interface";

export class ProductModel {
	productId: number;
	image: string;
	calculatedRating: number;
	title: number;
	route?: string;
	categories: ICategoryLevel;
	price: IPrice[];
	oldPrice?: IPrice[];
	tags: string[];
	characteeristics: {[key:string]: string | number};
	available: 0 | 1;
	weight: number;
	popular?: 0 | 1;
	special?: 0 | 1;
}
