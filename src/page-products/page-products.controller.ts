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
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return deletePageProducts
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':pageId')
	async patch(@Param('pageId') pageId: string, @Body() dto: CreatePageProductsDto) {
		const updatePageProducts = await this.pageProductsService.patch(pageId, dto)
		if (!updatePageProducts) {
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return updatePageProducts
	}

	@Get(':pageId')
	async getPageAlias(@Param('pageId') pageId: string) {
		
		const getPageProducts = await this.pageProductsService.get(+pageId)
		if (!getPageProducts) {
			return {_id: '0'}
		}
		return getPageProducts
	}

	@Post('find')
	async find() { ///// подумать над реализацией
		return await this.pageProductsService.find()
	}

	@Get('find/:alias')
	async findAlias(@Param('alias') alias: string) {
		return await this.pageProductsService.findAlias(alias)
	}

	@Get('paths/pages')
	async getAliases() {
		return await this.pageProductsService.getPaths()
	}
}
