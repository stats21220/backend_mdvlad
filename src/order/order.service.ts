import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
	constructor(@Inject(OrderModel) private readonly orderModel: ModelType<OrderModel>) {}
}
