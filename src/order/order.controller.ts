import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create.order.dtp';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('create')
	async create(@Body() dto: CreateOrderDto) {
		return await this.orderService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.delete(id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateOrderDto) {
		return await
		this.orderService.patch(id, dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return await this.orderService.get(id)
	}

	async find() { ///// подумать над реализацией

	}
}
