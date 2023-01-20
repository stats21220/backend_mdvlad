import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PAGE_PRODUCTS_NOT_FOUND } from './page-products.constants';
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
		const deletePageProducts = await this.pageProductsService.delete(id)
		if (!deletePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deletePageProducts
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreatePageProductsDto) {
		const updatePageProducts = await this.pageProductsService.patch(id, dto)
		if (!updatePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updatePageProducts
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const getPageProducts = await this.pageProductsService.get(id)
		if (!getPageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getPageProducts
	}

	async find() { ///// подумать над реализацией

	}
}
