import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create.order.dtp';
import { ORDER_NOT_FOUND } from './order.constants';
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
		const deleteOrder = await this.orderService.delete(id)
		if (!deleteOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteOrder
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateOrderDto) {
		const updateOrder = await this.orderService.patch(id, dto)
		if (!updateOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateOrder
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const getOrder = await this.orderService.get(id)
		if (!getOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getOrder
	}

	// async find() { ///// подумать над реализацией

	// }
}
