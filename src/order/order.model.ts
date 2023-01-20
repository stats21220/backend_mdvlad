import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

// export type priceOrderKey = 'упак.' | 'шт.' | 'м2' | 'м3' 

export class PriceOrder {

	@prop()
	name: string;

	@prop()
	value: number;

	@prop()
	count: number;
}

export class IAddress {

	@prop()
	city: string;

	@prop()
	street: string;

	@prop()
	home: string;

	@prop()
	Apartment?: string;
}

export class Delivery {

	@prop()
	title: string;

	@prop({type: () => IAddress})
	address: IAddress;
}

export class OrderProduct {

	@prop()
	productId: number;

	@prop()
	title: string;

	@prop({type: () => PriceOrder})
	price: PriceOrder;

	@prop()
	count: number;
}


export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {

	@prop({unique:true})
	orderId: string;

	@prop()
	date: Date;

	@prop()
	totalSum: string;

	@prop({type: () => [OrderProduct]})
	product: OrderProduct[];

	@prop({type: () => Delivery})
	delivery: Delivery;

	@prop()
	pay: string;

	@prop()
	comment?: string;

	@prop()
	userId?: number;
}
