import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	HttpException, 
	HttpStatus, 
	Param, 
	Patch, 
	Post, 
	UseGuards, 
	UsePipes, 
	ValidationPipe 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto} from './dto/create-product.dto';
import { FindProductCategoryDto } from './dto/find-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteProduct = await this.productService.delete(id)
		if (!deleteProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteProduct
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {
		const updateProduct = await this.productService.patch(id, dto)
		if (!updateProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateProduct
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		const getProduct = await this.productService.get(id)
		if (!getProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getProduct
	}

	@Post('find')
	async find(@Body() dto: FindProductCategoryDto) {
		return await this.productService.find(dto)
	}
}
