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

	@Post('getPage')
	async getPage(@Body() dto: {route: string} ) {
		
		const getPageProducts = await this.pageProductsService.getPage(dto)
		if (!getPageProducts) {
			throw new NotFoundException(PAGE_PRODUCTS_NOT_FOUND)
		}
		return getPageProducts
	}

	@Post('find')
	async find() { ///// подумать над реализацией
		return await this.pageProductsService.find()
	}

	@Post('findLevelPage')
	async findMenuLevel(@Body() dto: {level: string}) { ///// подумать над реализацией
		return await this.pageProductsService.findLevelPage(dto)
	}
}
