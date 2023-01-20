import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PageProductsModel } from './page-products.model';
import { PageProductsService } from './page-products.service';

@Controller('page-products')
export class PageProductsController {
	constructor(private readonly pageProductsService: PageProductsService) {}

	@Post('create')
	async create(@Body() dto: CreatePageProductsDto) {
		return await this.pageProductsService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.pageProductsService.delete(id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreatePageProductsDto) {
		return await this.pageProductsService.patch(id, dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return await this.pageProductsService.get(id)
	}

	async find() { ///// подумать над реализацией

	}
}
