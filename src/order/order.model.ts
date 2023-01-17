import { IDelivery } from "src/interfaces/Delivery.interface";
import { IPrice } from "src/interfaces/Price.interface";

export interface IOrderProduct  {
	productId: number;
	title: string;
	price: IPrice;
	count: number;
}



export class OrderModel {
	orderId: string;
	date: Date;
	totalSum: string;
	product: IOrderProduct[];
	delivery: IDelivery;
	pay: string;
	comment?: string;
	userId?: number;
}
