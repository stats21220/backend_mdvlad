
// export type priceOrderKey = 'упак.' | 'шт.' | 'м2' | 'м3' 

export class PriceOrderDto {

	// name: priceOrderKey;
	name: string;

	value: number;

	count: number;
}

export class IAddressDto {

	city: string;

	street: string;

	home: string;

	Apartment?: string;
}

export class DeliveryDto {

	title: string;

	address: IAddressDto;
}

export class OrderProduct {

	productId: number;

	title: string;

	price: PriceOrderDto;

	count: number;
}

export class CreateOrderDto {

	orderId: string;

	date: Date;

	totalSum: string;

	product: OrderProduct[];

	delivery: DeliveryDto;

	pay: string;

	comment?: string;

	userId?: number;
}
