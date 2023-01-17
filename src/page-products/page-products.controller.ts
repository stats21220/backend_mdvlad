import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PageProductsModel } from './page-products.model';

@Controller('page-products')
export class PageProductsController {

	@Post('create')
	async create(@Body() dto: PageProductsModel) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: PageProductsModel) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	async find() { ///// подумать над реализацией

	}
}
