import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	NotFoundException, 
	Param, 
	Patch, 
	Post, 
	UseGuards, 
	UsePipes, 
	ValidationPipe 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
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
	async delete(@Param('pageId', IdValidationPipe) pageId: string) {
		const deletePageProducts = await this.pageProductsService.delete(pageId)
		if (!deletePageProducts) {
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return deletePageProducts
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':alias')
	async patch(@Param('alias') alias: string, @Body() dto: CreatePageProductsDto) {
		const updatePageProducts = await this.pageProductsService.patch(alias, dto)
		if (!updatePageProducts) {
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return updatePageProducts
	}

	@Get(':byAlias')
	async get(@Param('byAlias') byAlias: string) {
		const getPageProducts = await this.pageProductsService.get(byAlias)
		if (!getPageProducts) {
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return getPageProducts
	}

	@Post('find')
	async find() { ///// подумать над реализацией
		return await this.pageProductsService.find()
	}
}
