import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto, ProductCategoryLevelDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.productService.delete(id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {
		return await this.productService.patch(id, dto)
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		return await this.productService.get(id)
	}

	@Post()
	async find(@Body() dto: ProductCategoryLevelDto) {
		return await this.productService.find(dto)
	}
}
