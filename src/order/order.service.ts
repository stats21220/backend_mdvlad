import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateOrderDto } from './dto/create.order.dtp';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
	constructor(@Inject(OrderModel) private readonly orderModel: ModelType<OrderModel>) {}

	async create(dto: CreateOrderDto) {
		return await this.orderModel.create(dto)
	}

	async delete(id: string) {
		return await this.orderModel.findByIdAndDelete(id)
	}

	async patch(id: string, dto: CreateOrderDto) {
		return await this.orderModel.findByIdAndUpdate(id, dto)
	}

	async get(id: string) {
		return await this.orderModel.findById(id)
	}

	async find() {

	}
}
