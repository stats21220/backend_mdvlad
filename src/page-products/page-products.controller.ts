import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PAGE_PRODUCTS_NOT_FOUND } from './page-products.constants';
import { PageProductsService } from './page-products.service';

@Controller('page-products')
export class PageProductsController {
	constructor(private readonly pageProductsService: PageProductsService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageProductsDto) {
		console.log(dto);
		
		return await this.pageProductsService.create(dto)
	}

	@Delete(':pageId')
	async delete(@Param('pageId') pageId: number) {
		const deletePageProducts = await this.pageProductsService.delete(pageId)
		if (!deletePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deletePageProducts
	}

	@Patch(':pageId')
	async patch(@Param('pageId') pageId: number, @Body() dto: CreatePageProductsDto) {
		const updatePageProducts = await this.pageProductsService.patch(pageId, dto)
		if (!updatePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updatePageProducts
	}

	@Get(':pageId')
	async get(@Param('pageId') pageId: number) {
		const getPageProducts = await this.pageProductsService.get(pageId)
		if (!getPageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getPageProducts
	}

	async find() { ///// подумать над реализацией

	}
}
