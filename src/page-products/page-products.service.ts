import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PageProductsModel } from './page-products.model';
import {translitForUrl} from 'translit-npm';

@Injectable()
export class PageProductsService {
	constructor(@InjectModel(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
	
	async create(dto: CreatePageProductsDto) {
		return await this.pageProductsModel.create(createLevel(dto));
	};

	async delete(pageId: string) {
		return await this.pageProductsModel.findOneAndDelete({alias: pageId}).exec();
	};

	async patch(pageId: string, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findOneAndUpdate({pageId}, createLevel(dto), {new:true}).exec();
	};

	async getPage(dto: {route: string}) {
		return await this.pageProductsModel.findOne({route: dto.route})
	};

	async find() {
		const pages = await this.pageProductsModel.aggregate()
			.match({})
			.group({_id: '$parentRoute',
				pages: {$push: {
					_id: '$_id',
					title: '$title', 
					sortId: '$sortId', 
					route: '$route', 
					alias: '$alias',
					firstLevelAlias: '$categories.first.alias',
					secondlLevelAlias: '$categories.second.alias',
					thirdLevelAlias: '$categories.third.alias',
					fifthLevelAlias: '$categories.fifth.alias',
				}}})
		return pages;
	};

	async findLevelPage(dto: {level: string}) {
		return this.pageProductsModel.aggregate()
			.match({parentRoute: dto.level})
			.project({
					_id: '$_id',
					title: '$title', 
					sortId: '$sortId', 
					route: '$route', 
					alias: '$alias',
					firstLevelAlias: '$categories.first.alias',
					secondlLevelAlias: '$categories.second.alias',
					thirdLevelAlias: '$categories.third.alias',
					fifthLevelAlias: '$categories.fifth.alias',
			})
	}
};

const createLevel = (dto: CreatePageProductsDto) => {
		dto.alias = translitForUrl(dto.title);
		dto.categoriesRoute = [];
		/// 1 level
		const alias = translitForUrl(dto.categories.first.level);
		dto.categoriesRoute.push(alias)
		dto.categories.first.route = '/' + alias;
		dto.categories.first.alias = alias
		dto.route = '/' + alias;
		dto.parentRoute = '/';
		dto.parentTitle = 'Главная';
		

		/// 2 Level
		//// обработка оcategoriesшибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second) {
			const alias = translitForUrl(dto.categories.second?.level);
			dto.categoriesRoute.push(alias);
			const level = dto.categories.first.route + '/' + alias;
			const parentLevel = dto.categories.first.route;
			const parentTitle = dto.categories.first.level
			dto.parentTitle = parentTitle;
			dto.categories.second.route = level;
			dto.categories.second.alias = alias;
			dto.parentRoute = parentLevel;
			dto.route = level;
		} else {
			dto.categoriessecond = undefined;
		};

		/// 3 Level
		//// обработка 3 уровня
		if (!dto.categories.third && dto.categories.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}
		//// если все хорошо на 3 уровне
		else if (dto.categories.second && dto.categories.third) {
				const alias = translitForUrl(dto.categories.third.level);
				const level = dto.categories.second.route + '/' + alias;
				dto.categoriesRoute.push(alias)
				const parentLevel = dto.categories.second.route;
				const parentTitle = dto.categories.second.level;
				dto.parentTitle = parentTitle;
				dto.categories.third.route = level;
				dto.categories.third.alias = alias;
				dto.parentRoute = parentLevel;
				dto.route = level;
		} else {
			dto.categories.third = undefined;
		};

		/// 4 level
		if (dto.categories.second && dto.categories.third && dto.categories.fifth) {
				const alias = translitForUrl(dto.categories.fifth.level);
				const level = dto.categories.third.level + '/' + alias;
				dto.categoriesRoute.push(alias)
				const parentLevel = dto.categories.third.route;
				const parentTitle = dto.categories.third.level;
				dto.parentRoute = parentLevel;
				dto.parentTitle = parentTitle;
				dto.categories.fifth.route = level;
				dto.categories.fifth.alias = alias;
				dto.route = level;
		} else {
			dto.categories.fifth = undefined;
		};
		return dto
}