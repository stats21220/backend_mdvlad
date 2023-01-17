import { IPrice } from "src/interfaces/Price.interface";

export class ProductModel {
	productId: number;
	title: number;
	route?: string;
	price: IPrice[];
	oldPrice?: IPrice[];
	features: {[key:string]: string | number};
	available: 0 | 1;
	weight: number;
}
