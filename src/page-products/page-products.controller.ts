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
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PAGE_PRODUCTS_NOT_FOUND } from './page-products.constants';
import { PageProductsService } from './page-products.service';

@Controller('page-products')
export class PageProductsController {
	constructor(private readonly pageProductsService: PageProductsService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageProductsDto) {
		
		return await this.pageProductsService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':pageId')
	async delete(@Param('pageId') pageId: string) {
		const deletePageProducts = await this.pageProductsService.delete(pageId)
		if (!deletePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deletePageProducts
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':pageId')
	async patch(@Param('pageId') pageId: string, @Body() dto: CreatePageProductsDto) {
		const updatePageProducts = await this.pageProductsService.patch(pageId, dto)
		if (!updatePageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updatePageProducts
	}

	@Get(':pageId')
	async get(@Param('pageId') pageId: string) {
		const getPageProducts = await this.pageProductsService.get(pageId)
		if (!getPageProducts) {
			throw new HttpException(PAGE_PRODUCTS_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getPageProducts
	}

	@Get()
	async find() { ///// подумать над реализацией
		return await this.pageProductsService.find()
	}
}
