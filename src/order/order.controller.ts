import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderModel } from './order.model';

@Controller('order')
export class OrderController {

	@Post('create')
	async create(@Body() dto: OrderModel) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: OrderModel) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	async find() { ///// подумать над реализацией

	}
}
