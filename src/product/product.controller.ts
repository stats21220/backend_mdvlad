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
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateProductDto} from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { IGetProduct } from './dto/get-product';
import { PRODUCT_NOT_FOUND } from './product.constants';
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
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deleteProduct = await this.productService.delete(id)
		if (!deleteProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteProduct
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':productId')
	async patch(@Param('productId') productId: string, @Body() dto: CreateProductDto) {
		const updateProduct = await this.productService.patch(productId, dto)
		if (!updateProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateProduct
	}

	@Post('getProduct')
	async get(@Body() dto: IGetProduct) {
		const getProduct = await this.productService.get(dto)
		if (!getProduct) {
			return {productId: null}
		}
		return getProduct
	}

	@UsePipes(new ValidationPipe())
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return await this.productService.find(dto)
	}
}
