
import { IsString, IsNumber, IsOptional } from "class-validator";

// export type priceOrderKey = 'упак.' | 'шт.' | 'м2' | 'м3' 

export class PriceOrderDto {

	// name: priceOrderKey;

	@IsString()
	name: string;

	@IsNumber()
	value: number;

	@IsNumber()
	count: number;
}

export class IAddressDto {

	@IsString()
	city: string;

	@IsString()
	street: string;

	@IsString()
	home: string;

	@IsOptional()
	@IsString()
	Apartment?: string;
}

export class DeliveryDto {

	@IsString()
	title: string;

	address: IAddressDto;
}

export class OrderProduct {

	@IsNumber()
	productId: number;

	@IsString()
	title: string;

	price: PriceOrderDto;

	@IsNumber()
	count: number;
}

export class CreateOrderDto {

	@IsString()
	orderId: string;

	date: Date;

	@IsString()
	totalSum: string;

	product: OrderProduct[];

	delivery: DeliveryDto;

	@IsString()
	pay: string;

	@IsOptional()
	@IsString()
	comment?: string;

	@IsOptional()
	@IsString()
	userId?: number;
}
