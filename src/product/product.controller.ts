import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto, ProductCategoryLevelDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {

	@Post('create')
	async create(@Body() dto: CreateProductDto) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {

	}

	@Get(':id')
	async getId(@Param('id') id: string) {

	}

	@Post()
	async find(@Body() dto: ProductCategoryLevelDto) {

	}
}
